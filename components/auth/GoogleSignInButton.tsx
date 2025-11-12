'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithGoogle } from '@/lib/firebase/auth'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

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
      <Button
        className="w-full border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] font-black uppercase"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        {loading ? 'Google 로그인 중...' : 'Google로 시작하기'}
      </Button>

      {error && (
        <Alert className="mt-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <AlertTitle>로그인 오류</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
