'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'

export default function CreateSessionPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [rubrics, setRubrics] = useState<any[]>([])
  const [selectedRubric, setSelectedRubric] = useState('')
  const [sessionName, setSessionName] = useState('')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/')
      } else {
        setUser(user)
      }
    })

    // Load available rubrics
    fetchRubrics()

    return () => unsubscribe()
  }, [router])

  const fetchRubrics = async () => {
    try {
      const response = await fetch('/api/rubrics/list')
      const data = await response.json()
      setRubrics(data.rubrics || [])
    } catch (error) {
      console.error('Error loading rubrics:', error)
    }
  }

  const handleCreate = async () => {
    if (!sessionName.trim() || !selectedRubric || !question.trim()) {
      alert('모든 필드를 입력해주세요!')
      return
    }

    if (!user) {
      alert('로그인이 필요합니다.')
      router.push('/')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/sessions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: sessionName,
          rubricId: selectedRubric,
          question,
          teacherId: user.uid
        })
      })

      if (!response.ok) {
        throw new Error('세션 생성 실패')
      }

      const data = await response.json()

      // 학생 제출 링크 생성
      const studentLink = `${window.location.origin}/student/submit/${data.sessionCode}`

      // 클립보드에 링크 복사
      try {
        await navigator.clipboard.writeText(studentLink)
        alert(`✅ 세션이 생성되었습니다!\n\n📋 학생 제출 링크가 클립보드에 복사되었습니다!\n\n🔗 ${studentLink}\n\n학생들에게 이 링크를 공유하세요!`)
      } catch (err) {
        alert(`✅ 세션이 생성되었습니다!\n\n🔗 학생 제출 링크:\n${studentLink}\n\n위 링크를 복사하여 학생들에게 공유하세요!`)
      }

      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating session:', error)
      alert('세션 생성 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white neo-dots-bg">
      {/* Header */}
      <header className="border-b-4 border-black bg-black">
        <div className="container-neo py-6 flex items-center justify-between">
          <h1 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            평가 세션 생성
          </h1>
          <BrutalButton variant="white" size="md" onClick={() => router.push('/dashboard')}>
            뒤로가기
          </BrutalButton>
        </div>
      </header>

      {/* Content */}
      <div className="container-neo py-12 max-w-4xl mx-auto">
        <BrutalCard variant="white" padding="xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-3xl font-black uppercase mb-2">새 평가 세션</h2>
          </div>

          <div className="space-y-6">
            {/* 세션 이름 */}
            <div>
              <label className="block text-lg font-black uppercase mb-3">
                세션 이름
              </label>
              <input
                type="text"
                placeholder="예: 5학년 국어 중간평가"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="w-full px-6 py-4 text-lg font-bold border-4 border-black neo-shadow-sm focus:neo-shadow-md transition-all"
              />
            </div>

            {/* 루브릭 선택 */}
            <div>
              <label className="block text-lg font-black uppercase mb-3">
                사용할 루브릭
              </label>
              <select
                value={selectedRubric}
                onChange={(e) => setSelectedRubric(e.target.value)}
                className="w-full px-6 py-4 text-lg font-bold border-4 border-black neo-shadow-sm focus:neo-shadow-md transition-all"
              >
                <option value="">루브릭을 선택하세요</option>
                {rubrics.map((rubric) => (
                  <option key={rubric.id} value={rubric.id}>
                    {rubric.metadata?.subject} - {rubric.metadata?.grade}
                  </option>
                ))}
              </select>
              {rubrics.length === 0 && (
                <p className="mt-2 text-sm font-bold text-gray-700">
                  ⚠️ 먼저 루브릭을 생성해주세요
                </p>
              )}
            </div>

            {/* 평가 질문 */}
            <div>
              <label className="block text-lg font-black uppercase mb-3">
                평가 질문
              </label>
              <textarea
                placeholder="학생들에게 제시할 질문이나 과제를 입력하세요..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={6}
                className="w-full px-6 py-4 text-lg font-bold border-4 border-black neo-shadow-sm focus:neo-shadow-md transition-all resize-none"
              />
            </div>

            

            {/* Create Button */}
            <BrutalButton
              variant="black"
              size="xl"
              fullWidth
              onClick={handleCreate}
              disabled={loading || rubrics.length === 0}
              icon={loading ? <span className="text-3xl animate-pulse-brutal">⏳</span> : <span className="text-3xl">🚀</span>}
            >
              {loading ? '세션 생성 중...' : '세션 생성하기'}
            </BrutalButton>
          </div>
        </BrutalCard>
      </div>
    </main>
  )
}
