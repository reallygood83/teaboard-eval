'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'
import { BrutalInput } from '@/components/shared/BrutalInput'
import { signInWithEmail, signInWithGoogle } from '@/lib/firebase/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmail(email, password)
      router.push('/dashboard')
    } catch (error: any) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
      console.error('로그인 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)

    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (error: any) {
      setError('Google 로그인에 실패했습니다.')
      console.error('Google 로그인 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cyan-400 neo-dots-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block neo-hover">
            <div className="text-7xl mb-4">📊</div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              TeaBoard
            </h1>
            <p className="text-lg font-bold">Eval Lab</p>
          </Link>
        </div>

        {/* Login Card */}
        <BrutalCard variant="white" padding="xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black mb-3 uppercase">
              로그인
            </h2>
            <p className="text-lg font-bold text-gray-700">
              교사 계정으로 로그인하세요 🔑
            </p>
          </div>

          {error && (
            <BrutalCard variant="pink" padding="md" className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <p className="font-bold">{error}</p>
              </div>
            </BrutalCard>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <BrutalInput
              type="email"
              label="이메일"
              placeholder="teacher@school.kr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<span className="text-xl">📧</span>}
            />

            <BrutalInput
              type="password"
              label="비밀번호"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={<span className="text-xl">🔒</span>}
            />

            <BrutalButton
              type="submit"
              variant="yellow"
              size="lg"
              fullWidth
              disabled={loading}
              icon={loading ? <span>⏳</span> : <span>🔐</span>}
            >
              {loading ? '로그인 중...' : '이메일로 로그인'}
            </BrutalButton>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 neo-border border-b-0 border-l-0 border-r-0"></div>
            <span className="font-black uppercase text-sm tracking-wide">또는</span>
            <div className="flex-1 neo-border border-b-0 border-l-0 border-r-0"></div>
          </div>

          <BrutalButton
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleGoogleLogin}
            disabled={loading}
            icon={<span className="text-xl">🔍</span>}
          >
            Google로 로그인
          </BrutalButton>

          <div className="mt-8 pt-8 neo-border border-b-0 border-l-0 border-r-0 space-y-4">
            <Link
              href="/auth/reset-password"
              className="block text-center font-bold hover:underline neo-hover"
            >
              <span className="text-lg">🔑 비밀번호를 잊으셨나요?</span>
            </Link>

            <div className="text-center">
              <p className="font-semibold mb-3">계정이 없으신가요?</p>
              <Link href="/auth/signup">
                <BrutalButton variant="pink" size="md" fullWidth>
                  ✨ 회원가입하기
                </BrutalButton>
              </Link>
            </div>
          </div>
        </BrutalCard>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="inline-block neo-hover">
            <BrutalCard variant="yellow" padding="sm">
              <span className="font-bold">← 홈으로 돌아가기</span>
            </BrutalCard>
          </Link>
        </div>
      </div>
    </div>
  )
}
