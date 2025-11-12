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
    <div className="min-h-screen bg-pink-400 neo-grid-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block neo-hover">
            <div className="text-7xl mb-4">✨</div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              환영합니다!
            </h1>
            <p className="text-lg font-bold">TeaBoard에 가입하세요</p>
          </Link>
        </div>

        {/* Signup Card */}
        <BrutalCard variant="white" padding="xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black mb-3 uppercase">
              회원가입
            </h2>
            <p className="text-lg font-bold text-gray-700">
              교사 계정을 만들어 시작하세요 🚀
            </p>
          </div>

          {error && (
            <BrutalCard variant="orange" padding="md" className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <p className="font-bold">{error}</p>
              </div>
            </BrutalCard>
          )}

          <form onSubmit={handleEmailSignup} className="space-y-5">
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
              size="lg"
              fullWidth
              disabled={loading}
              icon={loading ? <span>⏳</span> : <span>✨</span>}
            >
              {loading ? '가입 중...' : '회원가입'}
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
            onClick={handleGoogleSignup}
            disabled={loading}
            icon={<span className="text-xl">🔍</span>}
          >
            Google로 가입
          </BrutalButton>

          <div className="mt-8 pt-8 neo-border border-b-0 border-l-0 border-r-0">
            <div className="text-center">
              <p className="font-semibold mb-3">이미 계정이 있으신가요?</p>
              <Link href="/auth/login">
                <BrutalButton variant="yellow" size="md" fullWidth>
                  🔐 로그인하기
                </BrutalButton>
              </Link>
            </div>
          </div>
        </BrutalCard>

        {/* Benefits Section */}
        <div className="mt-6 space-y-3">
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
        <div className="mt-6 text-center">
          <Link href="/" className="inline-block neo-hover">
            <BrutalCard variant="white" padding="sm">
              <span className="font-bold">← 홈으로 돌아가기</span>
            </BrutalCard>
          </Link>
        </div>
      </div>
    </div>
  )
}
