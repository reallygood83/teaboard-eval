import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, update } from 'firebase/database'
import { database } from '@/lib/firebase/config'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, status, name, question } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: '세션 ID가 필요합니다.' },
        { status: 400 }
      )
    }

    // Firebase에 업데이트할 데이터 구성
    const updates: any = {}

    if (status !== undefined) {
      updates.status = status
    }

    if (name !== undefined) {
      updates.name = name
    }

    if (question !== undefined) {
      updates.question = question
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: '업데이트할 데이터가 없습니다.' },
        { status: 400 }
      )
    }

    // Firebase Realtime Database 업데이트
    const sessionRef = ref(database, `sessions/${sessionId}`)
    await update(sessionRef, updates)

    return NextResponse.json({
      success: true,
      message: '세션이 성공적으로 업데이트되었습니다.',
      updates
    })
  } catch (error) {
    console.error('세션 업데이트 오류:', error)
    return NextResponse.json(
      { error: '세션 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
