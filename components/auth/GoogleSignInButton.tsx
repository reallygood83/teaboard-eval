'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithGoogle } from '@/lib/firebase/auth'
import { BrutalButton } from '@/components/shared/BrutalButton'

export function GoogleSignInButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Google 로그인 오류:', error)
      setError('Google 로그인에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <BrutalButton
        variant="white"
        size="xl"
        onClick={handleGoogleSignIn}
        disabled={loading}
        icon={
          loading ? (
            <span className="text-2xl animate-pulse-brutal">⏳</span>
          ) : (
            <span className="text-2xl">🔍</span>
          )
        }
      >
        {loading ? 'Google 로그인 중...' : 'Google로 시작하기'}
      </BrutalButton>

      {error && (
        <div className="mt-4 bg-orange-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <p className="font-bold text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}
