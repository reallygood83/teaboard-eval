'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'

export default function CreateRubricPage() {
  const router = useRouter()
  const [achievement, setAchievement] = useState('')
  const [subject, setSubject] = useState('')
  const [grade, setGrade] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatedRubric, setGeneratedRubric] = useState<any>(null)

  const handleGenerate = async () => {
    if (!achievement.trim() || !subject.trim() || !grade.trim()) {
      alert('모든 필드를 입력해주세요!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/rubrics/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          achievement,
          subject,
          grade
        })
      })

      if (!response.ok) {
        throw new Error('루브릭 생성 실패')
      }

      const data = await response.json()
      setGeneratedRubric(data.rubric)
    } catch (error) {
      console.error('Error generating rubric:', error)
      alert('루브릭 생성 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!generatedRubric) return

    try {
      const response = await fetch('/api/rubrics/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rubric: generatedRubric,
          achievement,
          subject,
          grade
        })
      })

      if (!response.ok) {
        throw new Error('저장 실패')
      }

      alert('루브릭이 저장되었습니다!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving rubric:', error)
      alert('저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <main className="min-h-screen bg-yellow-400">
      {/* Header */}
      <header className="border-b-4 border-black bg-black">
        <div className="container-neo py-6 flex items-center justify-between">
          <h1 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            AI 루브릭 생성
          </h1>
          <BrutalButton variant="white" size="md" onClick={() => router.push('/dashboard')}>
            뒤로가기
          </BrutalButton>
        </div>
      </header>

      {/* Content */}
      <div className="container-neo py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <BrutalCard variant="white" padding="xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-3xl font-black uppercase mb-2">입력 정보</h2>
              <p className="text-lg font-bold text-gray-700">
                AI가 자동으로 평가 기준을 만듭니다
              </p>
            </div>

            <div className="space-y-6">
              {/* 학년 */}
              <div>
                <label className="block text-lg font-black uppercase mb-3">
                  학년
                </label>
                <input
                  type="text"
                  placeholder="예: 초등 5학년"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-6 py-4 text-lg font-bold border-4 border-black neo-shadow-sm focus:neo-shadow-md transition-all"
                />
              </div>

              {/* 과목 */}
              <div>
                <label className="block text-lg font-black uppercase mb-3">
                  과목
                </label>
                <input
                  type="text"
                  placeholder="예: 국어, 수학, 사회"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-6 py-4 text-lg font-bold border-4 border-black neo-shadow-sm focus:neo-shadow-md transition-all"
                />
              </div>

              {/* 성취기준 */}
              <div>
                <label className="block text-lg font-black uppercase mb-3">
                  성취기준
                </label>
                <textarea
                  placeholder="평가하고 싶은 성취기준을 입력하세요..."
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  rows={6}
                  className="w-full px-6 py-4 text-lg font-bold border-4 border-black neo-shadow-sm focus:neo-shadow-md transition-all resize-none"
                />
              </div>

              {/* Generate Button */}
              <BrutalButton
                variant="cyan"
                size="xl"
                fullWidth
                onClick={handleGenerate}
                disabled={loading}
                icon={loading ? <span className="text-3xl animate-pulse-brutal">⏳</span> : <span className="text-3xl">✨</span>}
              >
                {loading ? 'AI가 생성 중...' : 'AI로 루브릭 생성'}
              </BrutalButton>
            </div>
          </BrutalCard>

          {/* Generated Rubric */}
          <BrutalCard variant="lime" padding="xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📋</div>
              <h2 className="text-3xl font-black uppercase mb-2">생성된 루브릭</h2>
              <p className="text-lg font-bold text-gray-700">
                {generatedRubric ? 'AI가 만든 평가 기준입니다' : '왼쪽에서 정보를 입력하세요'}
              </p>
            </div>

            {generatedRubric ? (
              <div className="space-y-4">
                {/* Rubric Content */}
                <div className="bg-white border-4 border-black neo-shadow-md p-6 space-y-4">
                  <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-3">
                    평가 기준
                  </h3>
                  <div className="space-y-3">
                    {generatedRubric.criteria?.map((criterion: any, index: number) => (
                      <div key={index} className="border-l-4 border-black pl-4">
                        <h4 className="text-lg font-black mb-2">{criterion.name}</h4>
                        <p className="text-base font-semibold text-gray-700 mb-2">
                          {criterion.description}
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-sm font-bold">
                          <div className="bg-red-100 border-2 border-black p-2">
                            <span className="block font-black">하</span>
                            {criterion.low}
                          </div>
                          <div className="bg-yellow-100 border-2 border-black p-2">
                            <span className="block font-black">중</span>
                            {criterion.medium}
                          </div>
                          <div className="bg-green-100 border-2 border-black p-2">
                            <span className="block font-black">상</span>
                            {criterion.high}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <BrutalButton
                  variant="pink"
                  size="xl"
                  fullWidth
                  onClick={handleSave}
                  icon={<span className="text-3xl">💾</span>}
                >
                  루브릭 저장하기
                </BrutalButton>
              </div>
            ) : (
              <div className="bg-white border-4 border-black neo-shadow-md p-12 text-center">
                <div className="text-8xl mb-4">📝</div>
                <p className="text-xl font-bold text-gray-500">
                  아직 생성된 루브릭이 없습니다
                </p>
              </div>
            )}
          </BrutalCard>
        </div>
      </div>
    </main>
  )
}
