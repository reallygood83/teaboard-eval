import { NextRequest, NextResponse } from 'next/server'
import { ref, push, set, get } from 'firebase/database'
import { database } from '@/lib/firebase/config'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Firebase 큐 구조
interface SubmissionQueue {
  submissionId: string
  sessionCode: string
  studentName: string
  rubricId: string
  images: string[] // Base64 encoded images
  status: 'pending' | 'processing' | 'completed' | 'error'
  queuePosition: number
  createdAt: number
  processedAt?: number
  result?: any
}

// 사용자 AI 설정 가져오기
async function getUserAISettings(teacherId: string) {
  const settingsRef = ref(database, `users/${teacherId}/settings`)
  const snapshot = await get(settingsRef)

  if (!snapshot.exists()) {
    // 기본값: Gemini with env API key
    return {
      selectedModel: 'gemini-2.5-flash',
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
    }
  }

  const data = snapshot.val()
  const selectedModel = data.selectedModel || 'gemini-2.5-flash'
  const apiKey = selectedModel === 'gemini-2.5-flash'
    ? (data.geminiApiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY)
    : (data.grokApiKey || process.env.NEXT_PUBLIC_GROK_API_KEY)

  return { selectedModel, apiKey }
}

// Gemini Vision으로 OCR 수행
async function extractTextWithGemini(base64Image: string, apiKey: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

  const prompt = `이 이미지에서 모든 텍스트를 추출해주세요.
학생이 작성한 답변이나 내용을 정확하게 읽어주세요.
답변만 텍스트로 변환하여 제공하세요.`

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image.split(',')[1] || base64Image,
      },
    },
  ])

  const response = await result.response
  return response.text()
}

// Grok으로 OCR 수행 (xAI API 호환)
async function extractTextWithGrok(base64Image: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'grok-2-vision-1212',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: '이 이미지에서 모든 텍스트를 추출해주세요. 학생이 작성한 답변이나 내용을 정확하게 읽어주세요. 답변만 텍스트로 변환하여 제공하세요.'
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image
              }
            }
          ]
        }
      ]
    })
  })

  const data = await response.json()
  return data.choices[0].message.content
}

// 설정된 모델로 OCR 수행
async function extractTextFromImage(
  base64Image: string,
  selectedModel: string,
  apiKey: string
): Promise<string> {
  try {
    if (!apiKey) {
      throw new Error('API 키가 설정되지 않았습니다')
    }

    if (selectedModel === 'grok-4-fast') {
      return await extractTextWithGrok(base64Image, apiKey)
    } else {
      return await extractTextWithGemini(base64Image, apiKey)
    }
  } catch (error) {
    console.error('OCR 실패:', error)
    throw new Error('텍스트 추출에 실패했습니다')
  }
}

// 큐 처리 함수
async function processQueue() {
  try {
    const queueRef = ref(database, 'submission_queue')
    const snapshot = await get(queueRef)

    if (!snapshot.exists()) return

    const queue: Record<string, SubmissionQueue> = snapshot.val()
    const pendingSubmissions = Object.entries(queue)
      .filter(([_, sub]) => sub.status === 'pending')
      .sort((a, b) => a[1].createdAt - b[1].createdAt)

    if (pendingSubmissions.length === 0) return

    // 첫 번째 대기 중인 제출 처리
    const [queueId, submission] = pendingSubmissions[0]
    const submissionRef = ref(database, `submission_queue/${queueId}`)

    // 상태를 'processing'으로 변경
    await set(submissionRef, {
      ...submission,
      status: 'processing',
    })

    // 세션에서 교사 ID 가져오기
    const sessionSnapshot = await get(ref(database, `sessions/${submission.sessionCode}`))
    if (!sessionSnapshot.exists()) {
      throw new Error('세션을 찾을 수 없습니다')
    }
    const teacherId = sessionSnapshot.val().teacherId

    // 교사의 AI 모델 설정 가져오기
    const { selectedModel, apiKey } = await getUserAISettings(teacherId)

    // OCR로 모든 이미지에서 텍스트 추출
    const extractedTexts: string[] = []
    for (const image of submission.images) {
      const text = await extractTextFromImage(image, selectedModel, apiKey)
      extractedTexts.push(text)
    }

    // 추출된 텍스트를 하나로 합침
    const combinedText = extractedTexts.join('\n\n---\n\n')

    // AI 평가 수행
    const rubricSnapshot = await get(ref(database, `rubrics/${submission.rubricId}`))
    if (!rubricSnapshot.exists()) {
      throw new Error('루브릭을 찾을 수 없습니다')
    }

    const rubric = rubricSnapshot.val()

    // AI 평가 호출
    const evaluationResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/submissions/submit`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionCode: submission.sessionCode,
          studentName: submission.studentName,
          studentAnswer: combinedText,
          rubricId: submission.rubricId,
        }),
      }
    )

    const evaluationResult = await evaluationResponse.json()

    // 결과 저장
    await set(submissionRef, {
      ...submission,
      status: 'completed',
      processedAt: Date.now(),
      extractedText: combinedText,
      result: evaluationResult,
    })

    // 다음 항목 처리를 위해 재귀 호출
    setTimeout(processQueue, 1000)
  } catch (error) {
    console.error('큐 처리 실패:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const sessionCode = formData.get('sessionCode') as string
    const studentName = formData.get('studentName') as string
    const rubricId = formData.get('rubricId') as string

    // 이미지 파일들 읽기
    const images: string[] = []
    let imageIndex = 0

    while (true) {
      const imageFile = formData.get(`image_${imageIndex}`) as File | null
      if (!imageFile) break

      // 파일을 Base64로 변환
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')
      const mimeType = imageFile.type
      images.push(`data:${mimeType};base64,${base64}`)

      imageIndex++
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: '이미지를 업로드해주세요' },
        { status: 400 }
      )
    }

    // 큐에 제출 추가
    const queueRef = ref(database, 'submission_queue')
    const newSubmissionRef = push(queueRef)

    const queueSnapshot = await get(queueRef)
    const currentQueue = queueSnapshot.exists() ? queueSnapshot.val() : {}
    const queuePosition = Object.keys(currentQueue).length + 1

    const submission: SubmissionQueue = {
      submissionId: newSubmissionRef.key!,
      sessionCode,
      studentName,
      rubricId,
      images,
      status: 'pending',
      queuePosition,
      createdAt: Date.now(),
    }

    await set(newSubmissionRef, submission)

    // 큐 처리 시작 (비동기)
    processQueue()

    return NextResponse.json({
      success: true,
      submissionId: newSubmissionRef.key,
      queuePosition,
      message: '제출이 접수되었습니다. 처리 중입니다.',
    })
  } catch (error: any) {
    console.error('제출 처리 실패:', error)
    return NextResponse.json(
      { error: error.message || '제출에 실패했습니다' },
      { status: 500 }
    )
  }
}
