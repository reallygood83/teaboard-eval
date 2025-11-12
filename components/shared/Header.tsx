'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BrutalButton } from './BrutalButton'
import { signOut } from '@/lib/firebase/auth'
import { useState, useEffect } from 'react'
import { User } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'

export function Header() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('로그아웃 오류:', error)
    }
  }

  return (
    <header className="neo-border border-t-0 border-l-0 border-r-0 bg-yellow-400 sticky top-0 z-50">
      <div className="container-neo">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href={user ? '/dashboard' : '/'}
            className="flex items-center gap-3 neo-hover transition-all duration-200"
          >
            <div className="text-4xl">📊</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                TeaBoard
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="neo-border neo-shadow-sm bg-white px-4 py-2">
                  <span className="font-bold text-sm">
                    👋 {user.displayName || user.email?.split('@')[0]}
                  </span>
                </div>
                <BrutalButton
                  variant="black"
                  size="sm"
                  onClick={handleLogout}
                >
                  로그아웃
                </BrutalButton>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <BrutalButton variant="outline" size="sm">
                    로그인
                  </BrutalButton>
                </Link>
                <Link href="/auth/signup">
                  <BrutalButton variant="pink" size="sm">
                    회원가입
                  </BrutalButton>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden neo-border neo-shadow-sm bg-white p-2 neo-hover neo-press"
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-in">
            <nav className="flex flex-col gap-3">
              {user ? (
                <>
                  <div className="neo-border neo-shadow-sm bg-white p-3">
                    <span className="font-bold text-sm">
                      👋 {user.displayName || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <BrutalButton
                    variant="black"
                    size="md"
                    onClick={handleLogout}
                    fullWidth
                  >
                    로그아웃
                  </BrutalButton>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <BrutalButton variant="outline" size="md" fullWidth>
                      로그인
                    </BrutalButton>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    <BrutalButton variant="pink" size="md" fullWidth>
                      회원가입
                    </BrutalButton>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
