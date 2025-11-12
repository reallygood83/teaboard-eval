'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'
import { BrutalInput } from '@/components/shared/BrutalInput'
import { signUpWithEmail, signInWithGoogle } from '@/lib/firebase/auth'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    // 비밀번호 길이 확인
    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }

    setLoading(true)

    try {
      await signUpWithEmail(email, password, displayName)
      router.push('/dashboard')
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('이미 사용 중인 이메일입니다.')
      } else if (error.code === 'auth/invalid-email') {
        setError('유효하지 않은 이메일 형식입니다.')
      } else {
        setError('회원가입에 실패했습니다. 다시 시도해주세요.')
      }
      console.error('회원가입 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError('')
    setLoading(true)

    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (error: any) {
      setError('Google 회원가입에 실패했습니다.')
      console.error('Google 회원가입 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white neo-dots-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand Section */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block neo-hover">
            <div className="text-5xl mb-3">✨</div>
            <h1 className="text-3xl font-black tracking-tight mb-1">
              환영합니다!
            </h1>
            <p className="text-base font-bold">TeaBoard에 가입하세요</p>
          </Link>
        </div>

        {/* Signup Card */}
        <BrutalCard variant="white" padding="lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-black mb-2 uppercase">
              회원가입
            </h2>
            <p className="text-base font-bold text-gray-700">
              교사 계정을 만들어 시작하세요 🚀
            </p>
          </div>

          {error && (
            <BrutalCard variant="orange" padding="sm" className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                <p className="font-bold text-sm">{error}</p>
              </div>
            </BrutalCard>
          )}

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <BrutalInput
              type="text"
              label="이름"
              placeholder="홍길동"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              icon={<span className="text-xl">👤</span>}
            />

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
              error={password.length > 0 && password.length < 6 ? '최소 6자 이상 입력해주세요' : ''}
            />

            <BrutalInput
              type="password"
              label="비밀번호 확인"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              icon={<span className="text-xl">✅</span>}
              error={
                confirmPassword.length > 0 && password !== confirmPassword
                  ? '비밀번호가 일치하지 않습니다'
                  : ''
              }
            />

            <BrutalButton
              type="submit"
              variant="pink"
              size="md"
              fullWidth
              disabled={loading}
              icon={loading ? <span>⏳</span> : <span>✨</span>}
            >
              {loading ? '가입 중...' : '회원가입'}
            </BrutalButton>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 neo-border border-b-0 border-l-0 border-r-0"></div>
            <span className="font-black uppercase text-sm tracking-wide">또는</span>
            <div className="flex-1 neo-border border-b-0 border-l-0 border-r-0"></div>
          </div>

          <BrutalButton
            variant="outline"
            size="md"
            fullWidth
            onClick={handleGoogleSignup}
            disabled={loading}
            icon={<span className="text-xl">🔍</span>}
          >
            Google로 가입
          </BrutalButton>

          <div className="mt-6 pt-6 neo-border border-b-0 border-l-0 border-r-0">
            <div className="text-center">
              <p className="font-semibold mb-3">이미 계정이 있으신가요?</p>
              <Link href="/auth/login">
                <BrutalButton variant="yellow" size="sm" fullWidth>
                  🔐 로그인하기
                </BrutalButton>
              </Link>
            </div>
          </div>
        </BrutalCard>

        {/* Benefits Section */}
        <div className="mt-4 space-y-2">
          <BrutalCard variant="lime" padding="sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <span className="font-bold text-sm">무료 월 100회 평가</span>
            </div>
          </BrutalCard>

          <BrutalCard variant="cyan" padding="sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <span className="font-bold text-sm">100% 데이터 소유권 보장</span>
            </div>
          </BrutalCard>

          <BrutalCard variant="yellow" padding="sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <span className="font-bold text-sm">5분이면 첫 평가 시작</span>
            </div>
          </BrutalCard>
        </div>

        {/* Back to Home Link */}
        <div className="mt-4 text-center">
          <Link href="/" className="font-bold text-gray-800 hover:text-black hover:underline">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
