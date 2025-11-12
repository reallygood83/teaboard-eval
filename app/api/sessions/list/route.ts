import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, get } from 'firebase/database'
import { database } from '@/lib/firebase/config'

export async function GET(request: NextRequest) {
  try {
    const sessionsRef = ref(database, 'sessions')
    const snapshot = await get(sessionsRef)

    if (!snapshot.exists()) {
      return NextResponse.json({
        success: true,
        sessions: []
      })
    }

    const sessionsData = snapshot.val()
    const sessions = Object.keys(sessionsData).map(key => ({
      id: key,
      ...sessionsData[key]
    }))

    return NextResponse.json({
      success: true,
      sessions
    })
  } catch (error) {
    console.error('Error listing sessions:', error)
    return NextResponse.json(
      { error: '세션 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
