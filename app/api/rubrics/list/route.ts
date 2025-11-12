import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, ref, get } from 'firebase/database'
import { database } from '@/lib/firebase/config'

export async function GET(request: NextRequest) {
  try {
    const rubricsRef = ref(database, 'rubrics')
    const snapshot = await get(rubricsRef)

    if (!snapshot.exists()) {
      return NextResponse.json({ rubrics: [] })
    }

    const rubricsData = snapshot.val()
    const rubrics = Object.keys(rubricsData).map(key => ({
      id: key,
      ...rubricsData[key]
    }))

    return NextResponse.json({ rubrics })
  } catch (error) {
    console.error('Error loading rubrics:', error)
    return NextResponse.json(
      { error: '루브릭 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
