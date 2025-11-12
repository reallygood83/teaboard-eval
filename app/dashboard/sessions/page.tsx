'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'firebase/auth'
import { auth, database } from '@/lib/firebase/config'
import { ref, onValue } from 'firebase/database'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'

interface Session {
  id: string
  name: string
  question: string
  sessionCode: string
  rubricId: string
  status: 'active' | 'closed'
  createdAt: string
  submissionCount?: number
}

export default function SessionsManagementPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/')
      } else {
        setUser(user)
        loadSessions(user.uid)
      }
    })

    return () => unsubscribe()
  }, [router])

  const loadSessions = (teacherId: string) => {
    const sessionsRef = ref(database, 'sessions')

    onValue(sessionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const sessionsList: Session[] = []

        Object.entries(data).forEach(([id, session]: [string, any]) => {
          if (session.teacherId === teacherId) {
            sessionsList.push({
              id,
              name: session.name,
              question: session.question,
              sessionCode: session.sessionCode,
              rubricId: session.rubricId,
              status: session.status || 'active',
              createdAt: session.createdAt,
              submissionCount: session.submissions ? Object.keys(session.submissions).length : 0
            })
          }
        })

        // 최신순 정렬
        sessionsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setSessions(sessionsList)
      } else {
        setSessions([])
      }
      setLoading(false)
    })
  }

  const copyStudentLink = async (sessionCode: string) => {
    const studentLink = `${window.location.origin}/student/submit/${sessionCode}`

    try {
      await navigator.clipboard.writeText(studentLink)
      setCopiedCode(sessionCode)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      alert(`링크 복사 실패. 수동으로 복사하세요:\n${studentLink}`)
    }
  }

  const toggleSessionStatus = async (sessionId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'closed' : 'active'

    try {
      const response = await fetch('/api/sessions/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          status: newStatus
        })
      })

      if (!response.ok) {
        throw new Error('상태 변경 실패')
      }
    } catch (error) {
      console.error('상태 변경 오류:', error)
      alert('세션 상태 변경에 실패했습니다.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white neo-dots-bg flex items-center justify-center">
        <BrutalCard variant="white" padding="xl">
          <div className="flex items-center gap-4">
            <div className="text-4xl animate-pulse-brutal">⏳</div>
            <div className="text-2xl font-black">로딩 중...</div>
          </div>
        </BrutalCard>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white neo-dots-bg">
      {/* Header */}
      <header className="border-b-4 border-black bg-black">
        <div className="container-neo py-6 flex items-center justify-between">
          <h1 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            평가 세션 관리
          </h1>
          <div className="flex gap-3">
            <BrutalButton variant="black" size="md" onClick={() => router.push('/dashboard/create-session')}>
              + 새 세션
            </BrutalButton>
            <BrutalButton variant="white" size="md" onClick={() => router.push('/dashboard')}>
              대시보드
            </BrutalButton>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container-neo py-12">
        {sessions.length === 0 ? (
          <BrutalCard variant="white" padding="xl">
            <div className="text-center py-12">
              <div className="text-8xl mb-6">📝</div>
              <h2 className="text-3xl font-black uppercase mb-4">세션이 없습니다</h2>
              
              <BrutalButton
                variant="yellow"
                size="xl"
                onClick={() => router.push('/dashboard/create-session')}
                icon={<span className="text-3xl">🚀</span>}
              >
                세션 생성하기
              </BrutalButton>
            </div>
          </BrutalCard>
        ) : (
          <div className="space-y-6">

            {/* 세션 목록 */}
            {sessions.map((session) => (
              <BrutalCard key={session.id} variant="white" padding="lg">
                <div className="space-y-4">
                  {/* 세션 헤더 */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-black uppercase">{session.name}</h3>
                        {session.status === 'active' ? (
                          <span className="px-3 py-1 bg-white border-2 border-black text-xs font-black uppercase">
                            진행중
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-white border-2 border-black text-xs font-black uppercase">
                            종료됨
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-bold text-gray-600 mb-3">
                        생성일: {new Date(session.createdAt).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>

                  {/* 평가 질문 */}
                  <div className="bg-gray-50 border-2 border-black p-4">
                    <p className="text-sm font-black uppercase mb-2 text-gray-600">평가 질문</p>
                    <p className="text-base font-bold">{session.question}</p>
                  </div>

                  {/* 세션 코드 & 링크 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white border-2 border-black p-4">
                      <p className="text-sm font-black uppercase mb-2">세션 코드</p>
                      <p className="text-3xl font-black tracking-wider">{session.sessionCode}</p>
                    </div>
                    <div className="bg-white border-2 border-black p-4">
                      <p className="text-sm font-black uppercase mb-2">제출 현황</p>
                      <p className="text-3xl font-black">
                        {session.submissionCount || 0} <span className="text-lg">명</span>
                      </p>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex flex-wrap gap-3">
                    <BrutalButton
                      variant="black"
                      size="md"
                      onClick={() => copyStudentLink(session.sessionCode)}
                      icon={copiedCode === session.sessionCode ?
                        <span className="text-xl">✅</span> :
                        <span className="text-xl">🔗</span>
                      }
                    >
                      {copiedCode === session.sessionCode ? '복사됨!' : '학생 링크 복사'}
                    </BrutalButton>

                    <BrutalButton
                      variant="black"
                      size="md"
                      onClick={() => router.push(`/dashboard/results?session=${session.id}`)}
                      icon={<span className="text-xl">📊</span>}
                    >
                      결과 보기
                    </BrutalButton>

                    <BrutalButton
                      variant="black"
                      size="md"
                      onClick={() => toggleSessionStatus(session.id, session.status)}
                      icon={<span className="text-xl">{session.status === 'active' ? '🔒' : '🔓'}</span>}
                    >
                      {session.status === 'active' ? '세션 종료' : '세션 재개'}
                    </BrutalButton>
                  </div>
                </div>
              </BrutalCard>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
