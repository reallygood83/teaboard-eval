import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, push, set } from 'firebase/database'
import { database } from '@/lib/firebase/config'

export async function POST(request: NextRequest) {
  try {
    const { rubric, achievement, subject, grade } = await request.json()

    if (!rubric) {
      return NextResponse.json(
        { error: '저장할 루브릭이 없습니다.' },
        { status: 400 }
      )
    }

    // Firebase Realtime Database에 저장
    const rubricsRef = ref(database, 'rubrics')
    const newRubricRef = push(rubricsRef)

    await set(newRubricRef, {
      ...rubric,
      metadata: {
        achievement,
        subject,
        grade,
        createdAt: new Date().toISOString()
      }
    })

    return NextResponse.json({
      success: true,
      rubricId: newRubricRef.key
    })
  } catch (error) {
    console.error('Error saving rubric:', error)
    return NextResponse.json(
      { error: '저장 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
