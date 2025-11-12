'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { signOut } from '@/lib/firebase/auth'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/')
      } else {
        setUser(user)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('로그아웃 오류:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-400 flex items-center justify-center">
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
    <main className="min-h-screen bg-lime-400">
      {/* Header */}
      <header className="border-b-4 border-black bg-black">
        <div className="container-neo py-6 flex items-center justify-between">
          <h1 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            TEABOARD
          </h1>
          <BrutalButton variant="orange" size="md" onClick={handleSignOut}>
            로그아웃
          </BrutalButton>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-neo py-12">
        {/* Welcome Section */}
        <BrutalCard variant="white" padding="xl" className="mb-8">
          <div className="flex items-center gap-6">
            <div className="text-7xl">👋</div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-2 uppercase">
                환영합니다!
              </h2>
              <p className="text-xl font-bold text-gray-700">
                {user?.displayName || user?.email}님, TeaBoard에 오신 것을 환영합니다!
              </p>
            </div>
          </div>
        </BrutalCard>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <BrutalCard variant="yellow" padding="lg" hover>
            <div className="text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-black mb-3 uppercase">
                AI 루브릭 생성
              </h3>
              <p className="text-base font-semibold mb-6">
                성취기준으로 평가 기준 자동 생성
              </p>
              <BrutalButton
                size="md"
                variant="black"
                fullWidth
                onClick={() => router.push('/dashboard/create-rubric')}
              >
                시작하기
              </BrutalButton>
            </div>
          </BrutalCard>

          <BrutalCard variant="cyan" padding="lg" hover>
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-black mb-3 uppercase">
                새 평가 세션
              </h3>
              <p className="text-base font-semibold mb-6">
                학생들이 제출할 평가 세션 만들기
              </p>
              <BrutalButton
                size="md"
                variant="black"
                fullWidth
                onClick={() => router.push('/dashboard/create-session')}
              >
                생성하기
              </BrutalButton>
            </div>
          </BrutalCard>

          <BrutalCard variant="pink" padding="lg" hover>
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-black mb-3 uppercase">
                평가 결과
              </h3>
              <p className="text-base font-semibold mb-6">
                학생별 평가 결과 확인하기
              </p>
              <BrutalButton
                size="md"
                variant="black"
                fullWidth
                onClick={() => router.push('/dashboard/results')}
              >
                보기
              </BrutalButton>
            </div>
          </BrutalCard>

          <BrutalCard variant="purple" padding="lg" hover>
            <div className="text-center">
              <div className="text-6xl mb-4">⚙️</div>
              <h3 className="text-2xl font-black mb-3 uppercase">
                AI 모델 설정
              </h3>
              <p className="text-base font-semibold mb-6">
                Gemini, Grok API 키 및 모델 선택
              </p>
              <BrutalButton
                size="md"
                variant="black"
                fullWidth
                onClick={() => router.push('/dashboard/settings')}
              >
                설정하기
              </BrutalButton>
            </div>
          </BrutalCard>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <BrutalCard variant="orange" padding="lg">
            <div className="text-center">
              <div className="text-5xl mb-3">🎯</div>
              <h3 className="text-sm font-black uppercase mb-2">총 평가</h3>
              <p className="text-5xl font-black">0</p>
            </div>
          </BrutalCard>

          <BrutalCard variant="purple" padding="lg">
            <div className="text-center">
              <div className="text-5xl mb-3">👥</div>
              <h3 className="text-sm font-black uppercase mb-2">총 학생</h3>
              <p className="text-5xl font-black">0</p>
            </div>
          </BrutalCard>

          <BrutalCard variant="blue" padding="lg">
            <div className="text-center">
              <div className="text-5xl mb-3">📤</div>
              <h3 className="text-sm font-black uppercase mb-2">제출</h3>
              <p className="text-5xl font-black">0</p>
            </div>
          </BrutalCard>

          <BrutalCard variant="lime" padding="lg">
            <div className="text-center">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-sm font-black uppercase mb-2">완료</h3>
              <p className="text-5xl font-black">0</p>
            </div>
          </BrutalCard>
        </div>
      </div>
    </main>
  )
}
