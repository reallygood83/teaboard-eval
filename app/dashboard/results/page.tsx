'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'

export default function ResultsPage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSession, setSelectedSession] = useState<any>(null)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    try {
      const response = await fetch('/api/sessions/list')
      const data = await response.json()
      setSessions(data.sessions || [])
    } catch (error) {
      console.error('Error loading sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const viewSessionResults = (session: any) => {
    setSelectedSession(session)
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
            평가 결과
          </h1>
          <BrutalButton variant="white" size="md" onClick={() => router.push('/dashboard')}>
            뒤로가기
          </BrutalButton>
        </div>
      </header>

      {/* Content */}
      <div className="container-neo py-12">
        {!selectedSession ? (
          // Sessions List
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.length === 0 ? (
              <div className="col-span-full">
                <BrutalCard variant="white" padding="xl">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h2 className="text-2xl font-black mb-2">평가 세션이 없습니다</h2>
                    
                    <BrutalButton
                      variant="black"
                      size="lg"
                      onClick={() => router.push('/dashboard/create-session')}
                    >
                      세션 생성하기
                    </BrutalButton>
                  </div>
                </BrutalCard>
              </div>
            ) : (
              sessions.map((session) => (
                <BrutalCard key={session.id} variant="white" padding="lg" hover>
                  <div className="text-center">
                    <div className="text-5xl mb-3">📊</div>
                    <h3 className="text-xl font-black uppercase mb-2">
                      {session.name}
                    </h3>
                    <div className="my-4 space-y-2">
                      <div className="bg-white border-2 border-black p-2">
                        <span className="text-sm font-black">세션 코드</span>
                        <p className="text-2xl font-black">{session.sessionCode}</p>
                      </div>
                      <div className="bg-white border-2 border-black p-2">
                        <span className="text-sm font-black">제출</span>
                        <p className="text-2xl font-black">
                          {session.submissions ? Object.keys(session.submissions).length : 0}명
                        </p>
                      </div>
                    </div>
                    <BrutalButton
                      variant="black"
                      size="md"
                      fullWidth
                      onClick={() => viewSessionResults(session)}
                    >
                      결과 보기
                    </BrutalButton>
                  </div>
                </BrutalCard>
              ))
            )}
          </div>
        ) : (
          // Session Results Detail
          <div className="space-y-6">
            <BrutalCard variant="white" padding="xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-black uppercase mb-2">{selectedSession.name}</h2>
                  <p className="text-lg font-bold text-gray-700">
                    세션 코드: <span className="text-black">{selectedSession.sessionCode}</span>
                  </p>
                </div>
                <BrutalButton
                  variant="black"
                  size="md"
                  onClick={() => setSelectedSession(null)}
                >
                  목록으로
                </BrutalButton>
              </div>

              <BrutalCard variant="white" padding="lg">
                <h3 className="text-xl font-black uppercase mb-3">질문</h3>
                <p className="text-lg font-bold text-gray-800">
                  {selectedSession.question}
                </p>
              </BrutalCard>
            </BrutalCard>

            {/* Student Submissions */}
            {selectedSession.submissions && Object.keys(selectedSession.submissions).length > 0 ? (
              <div className="grid gap-6">
                {Object.entries(selectedSession.submissions).map(([id, submission]: [string, any]) => (
                  <BrutalCard key={id} variant="white" padding="lg">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Student Answer */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-3xl">👤</div>
                          <h3 className="text-2xl font-black">{submission.studentName}</h3>
                        </div>
                        <BrutalCard variant="white" padding="md">
                          <h4 className="text-sm font-black uppercase mb-2">답변</h4>
                          <p className="text-base font-semibold text-gray-800">
                            {submission.answer}
                          </p>
                        </BrutalCard>
                      </div>

                      {/* Evaluation */}
                      <div>
                        <h3 className="text-xl font-black uppercase mb-3 flex items-center gap-2">
                          <span>🤖</span> AI 평가 결과
                        </h3>
                        <div className="space-y-2">
                          {submission.evaluation?.scores?.map((score: any, index: number) => (
                            <div
                              key={index}
                              className="bg-white border-4 border-black neo-shadow-sm p-3"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-black">{score.criterion}</span>
                                <div className="text-lg font-black">
                                  {score.level === 'high' && '🟢 상'}
                                  {score.level === 'medium' && '🟡 중'}
                                  {score.level === 'low' && '🔴 하'}
                                </div>
                              </div>
                              <p className="text-xs font-semibold text-gray-600">
                                {score.feedback}
                              </p>
                            </div>
                          ))}
                        </div>
                        <BrutalCard variant="white" padding="sm" className="mt-3">
                          <p className="text-xs font-bold text-gray-800">
                            💡 {submission.evaluation?.overallFeedback}
                          </p>
                        </BrutalCard>
                      </div>
                    </div>
                  </BrutalCard>
                ))}
              </div>
            ) : (
              <BrutalCard variant="white" padding="xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-2xl font-black mb-2">제출된 답변이 없습니다</h3>
                </div>
              </BrutalCard>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
