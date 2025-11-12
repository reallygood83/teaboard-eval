import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, get, query, orderByChild, equalTo } from 'firebase/database'
import { database } from '@/lib/firebase/config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.json(
        { error: '세션 코드가 필요합니다.' },
        { status: 400 }
      )
    }

    // Find session by code
    const sessionsRef = ref(database, 'sessions')
    const snapshot = await get(sessionsRef)

    if (!snapshot.exists()) {
      return NextResponse.json({ session: null })
    }

    const sessionsData = snapshot.val()
    const sessionEntry = Object.entries(sessionsData).find(
      ([_, session]: [string, any]) => session.sessionCode === code
    )

    if (!sessionEntry) {
      return NextResponse.json(
        { error: '세션을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const [sessionId, sessionData] = sessionEntry as [string, Record<string, any>]
    return NextResponse.json({
      id: sessionId,
      title: sessionData.name,
      description: sessionData.question,
      rubricId: sessionData.rubricId,
      teacherId: sessionData.teacherId,
      status: sessionData.status
    })
  } catch (error) {
    console.error('Error loading session:', error)
    return NextResponse.json(
      { error: '세션을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
