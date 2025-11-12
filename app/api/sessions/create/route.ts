import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, push, set } from 'firebase/database'
import { database } from '@/lib/firebase/config'

// Generate a random 6-character session code
function generateSessionCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const { name, rubricId, question, teacherId } = await request.json()

    if (!name || !rubricId || !question || !teacherId) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      )
    }

    const sessionCode = generateSessionCode()
    const sessionsRef = ref(database, 'sessions')
    const newSessionRef = push(sessionsRef)

    await set(newSessionRef, {
      name,
      rubricId,
      question,
      teacherId,
      sessionCode,
      createdAt: new Date().toISOString(),
      status: 'active',
      submissions: {}
    })

    return NextResponse.json({
      success: true,
      sessionId: newSessionRef.key,
      sessionCode
    })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { error: '세션 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
