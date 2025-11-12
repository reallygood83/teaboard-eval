'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'

export default function StudentEvalPage() {
  const params = useParams()
  const router = useRouter()
  const sessionCode = params.sessionCode as string
  const [session, setSession] = useState<any>(null)
  const [studentName, setStudentName] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [evaluation, setEvaluation] = useState<any>(null)

  useEffect(() => {
    loadSession()
  }, [sessionCode])

  const loadSession = async () => {
    try {
      const response = await fetch(`/api/sessions/get?code=${sessionCode}`)
      const data = await response.json()

      if (!data.session) {
        alert('유효하지 않은 세션 코드입니다.')
        return
      }

      setSession(data.session)
    } catch (error) {
      console.error('Error loading session:', error)
      alert('세션을 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!studentName.trim() || !answer.trim()) {
      alert('이름과 답변을 모두 입력해주세요!')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/submissions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionCode,
          studentName,
          answer
        })
      })

      if (!response.ok) {
        throw new Error('제출 실패')
      }

      const data = await response.json()
      setEvaluation(data.evaluation)
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting answer:', error)
      alert('제출 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-400 flex items-center justify-center">
        <BrutalCard variant="white" padding="xl">
          <div className="flex items-center gap-4">
            <div className="text-4xl animate-pulse-brutal">⏳</div>
            <div className="text-2xl font-black">로딩 중...</div>
          </div>
        </BrutalCard>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-purple-400 flex items-center justify-center">
        <BrutalCard variant="white" padding="xl">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-3xl font-black mb-2">유효하지 않은 코드</h2>
            <p className="text-lg font-bold text-gray-700">
              세션 코드를 확인해주세요.
            </p>
          </div>
        </BrutalCard>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-purple-400">
      {/* Header */}
      <header className="border-b-4 border-black bg-black">
        <div className="container-neo py-6">
          <h1 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tight text-center">
            {session.name}
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="container-neo py-12 max-w-4xl mx-auto">
        {!submitted ? (
          <BrutalCard variant="white" padding="xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-3xl font-black uppercase mb-2">평가 참여</h2>
              <p className="text-lg font-bold text-gray-700">
                답변을 작성하고 제출하세요
              </p>
            </div>

            <div className="space-y-6">
              {/* Student Name */}
              <div>
                <label className="block text-lg font-black uppercase mb-3">
                  이름
                </label>
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-6 py-4 text-lg font-bold border-4 border-black neo-shadow-sm focus:neo-shadow-md transition-all"
                />
              </div>

              {/* Question */}
              <div>
                <label className="block text-lg font-black uppercase mb-3">
                  질문
                </label>
                <BrutalCard variant="yellow" padding="lg">
                  <p className="text-xl font-bold text-gray-800">
                    {session.question}
                  </p>
                </BrutalCard>
              </div>

              {/* Answer */}
              <div>
                <label className="block text-lg font-black uppercase mb-3">
                  답변
                </label>
                <textarea
                  placeholder="답변을 작성하세요..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={10}
                  className="w-full px-6 py-4 text-lg font-bold border-4 border-black neo-shadow-sm focus:neo-shadow-md transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <BrutalButton
                variant="lime"
                size="xl"
                fullWidth
                onClick={handleSubmit}
                disabled={submitting}
                icon={submitting ? <span className="text-3xl animate-pulse-brutal">⏳</span> : <span className="text-3xl">🚀</span>}
              >
                {submitting ? 'AI가 평가 중...' : '답변 제출하기'}
              </BrutalButton>
            </div>
          </BrutalCard>
        ) : (
          <BrutalCard variant="white" padding="xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-black uppercase mb-2">평가 완료</h2>
              <p className="text-lg font-bold text-gray-700">
                AI가 당신의 답변을 평가했습니다
              </p>
            </div>

            {/* Evaluation Results */}
            <div className="space-y-4">
              <BrutalCard variant="cyan" padding="lg">
                <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-3">
                  평가 결과
                </h3>
                <div className="grid gap-4">
                  {evaluation?.scores?.map((score: any, index: number) => (
                    <div key={index} className="bg-white border-4 border-black neo-shadow-sm p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-black">{score.criterion}</h4>
                        <div className="text-2xl font-black">
                          {score.level === 'high' && '🟢 상'}
                          {score.level === 'medium' && '🟡 중'}
                          {score.level === 'low' && '🔴 하'}
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">
                        {score.feedback}
                      </p>
                    </div>
                  ))}
                </div>
              </BrutalCard>

              <BrutalCard variant="yellow" padding="lg">
                <h3 className="text-xl font-black uppercase mb-3">
                  💡 종합 피드백
                </h3>
                <p className="text-base font-bold text-gray-800">
                  {evaluation?.overallFeedback || '좋은 답변입니다!'}
                </p>
              </BrutalCard>
            </div>
          </BrutalCard>
        )}
      </div>
    </main>
  )
}
