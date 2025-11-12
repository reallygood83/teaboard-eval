import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, get, push, set, update } from 'firebase/database'
import { database } from '@/lib/firebase/config'
import { evaluateWithGemini } from '@/lib/ai/gemini'
import { evaluateWithGrok } from '@/lib/ai/grok'

export async function POST(request: NextRequest) {
  try {
    const { sessionCode, studentName, answer } = await request.json()

    if (!sessionCode || !studentName || !answer) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      )
    }

    // Find session
    const sessionsRef = ref(database, 'sessions')
    const snapshot = await get(sessionsRef)

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: '세션을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const sessionsData = snapshot.val()
    const sessionEntry = Object.entries(sessionsData).find(
      ([_, session]: [string, any]) => session.sessionCode === sessionCode
    )

    if (!sessionEntry) {
      return NextResponse.json(
        { error: '세션을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const [sessionId, sessionData]: [string, any] = sessionEntry

    // Get rubric for evaluation
    const rubricRef = ref(database, `rubrics/${sessionData.rubricId}`)
    const rubricSnapshot = await get(rubricRef)

    if (!rubricSnapshot.exists()) {
      return NextResponse.json(
        { error: '루브릭을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const rubric = rubricSnapshot.val()

    // Get teacher's AI settings
    let evaluation: any
    let aiModel = 'mock' // Default to mock if no settings found

    try {
      const teacherId = sessionData.teacherId

      if (teacherId) {
        const settingsRef = ref(database, `users/${teacherId}/settings`)
        const settingsSnapshot = await get(settingsRef)

        if (settingsSnapshot.exists()) {
          const settings = settingsSnapshot.val()
          const { selectedModel, geminiApiKey, grokApiKey } = settings

          // Perform AI evaluation based on selected model
          if (selectedModel === 'gemini-2.5-flash' && geminiApiKey) {
            aiModel = 'gemini-2.5-flash'
            evaluation = await evaluateWithGemini(geminiApiKey, {
              question: sessionData.question,
              answer,
              rubric,
              studentName
            })
          } else if (selectedModel === 'grok-4-fast' && grokApiKey) {
            aiModel = 'grok-4-fast'
            evaluation = await evaluateWithGrok(grokApiKey, {
              question: sessionData.question,
              answer,
              rubric,
              studentName
            })
          }
        }
      }
    } catch (aiError) {
      console.error('AI evaluation error, falling back to mock:', aiError)
    }

    // Fallback to mock evaluation if AI fails or not configured
    if (!evaluation) {
      aiModel = 'mock'
      evaluation = {
        scores: rubric.criteria.map((criterion: any) => ({
          criterion: criterion.name,
          level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          feedback: `${criterion.name}에 대한 AI 피드백입니다.`
        })),
        overallFeedback: '전반적으로 좋은 답변입니다. 핵심 개념을 잘 이해하고 있습니다.',
        evaluatedAt: new Date().toISOString()
      }
    }

    // Save submission
    const submissionRef = ref(database, `sessions/${sessionId}/submissions`)
    const newSubmissionRef = push(submissionRef)

    await set(newSubmissionRef, {
      studentName,
      answer,
      evaluation,
      aiModel, // Track which AI model was used
      submittedAt: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      evaluation,
      aiModel
    })
  } catch (error) {
    console.error('Error submitting answer:', error)
    return NextResponse.json(
      { error: '제출 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
