'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'

export default function TemplatesPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState<string | null>(null)

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

  const handleDownload = async (format: 'pdf' | 'docx') => {
    setDownloading(format)

    try {
      // API 호출로 템플릿 생성 및 다운로드
      const response = await fetch('/api/templates/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format })
      })

      if (!response.ok) {
        throw new Error('다운로드 실패')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `평가지_템플릿_AI친화적.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('다운로드 오류:', error)
      alert('템플릿 다운로드에 실패했습니다.')
    } finally {
      setDownloading(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white neo-dots-bg flex items-center justify-center">
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
    <main className="min-h-screen bg-white neo-dots-bg">
      {/* Header */}
      <header className="border-b-4 border-black bg-black">
        <div className="container-neo py-6 flex items-center justify-between">
          <h1 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            평가지 템플릿
          </h1>
          <BrutalButton variant="white" size="md" onClick={() => router.push('/dashboard')}>
            대시보드
          </BrutalButton>
        </div>
      </header>

      {/* Content */}
      <div className="container-neo py-12 max-w-5xl mx-auto">
        {/* 평가지 편집기 안내 카드 */}
        <BrutalCard variant="white" padding="xl" className="mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">✏️</div>
            <h2 className="text-3xl font-black uppercase mb-4">
              사이트에서 바로 평가지 만들기
            </h2>
            <BrutalButton
              variant="black"
              size="xl"
              onClick={() => router.push('/dashboard/templates/editor')}
              icon={<span className="text-2xl">🚀</span>}
            >
              평가지 편집기 열기
            </BrutalButton>
          </div>
        </BrutalCard>

        {/* 안내 카드 */}
        <BrutalCard variant="white" padding="lg" className="mb-8">
          <div className="flex items-start gap-4">
            <div className="text-5xl">💡</div>
            <div className="flex-1">
              <h2 className="text-2xl font-black uppercase mb-3">
                AI 친화적 평가지 템플릿
              </h2>
            </div>
          </div>
        </BrutalCard>

        {/* 템플릿 미리보기 */}
        <BrutalCard variant="white" padding="xl" className="mb-8">
          <h2 className="text-3xl font-black uppercase mb-6 text-center">
            📄 템플릿 미리보기
          </h2>

          <div className="bg-gray-50 border-4 border-black p-8 mb-6">
            <div className="max-w-2xl mx-auto bg-white border-2 border-gray-300 p-8" style={{ aspectRatio: '210/297' }}>
              {/* 학생 정보 */}
              <div className="border-2 border-black mb-6">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b-2 border-black">
                      <td className="border-r-2 border-black p-3 font-black text-center w-24">학년</td>
                      <td className="p-3 w-32"></td>
                      <td className="border-l-2 border-black border-r-2 p-3 font-black text-center w-24">반</td>
                      <td className="p-3 w-32"></td>
                      <td className="border-l-2 border-black border-r-2 p-3 font-black text-center w-24">번호</td>
                      <td className="p-3 w-32"></td>
                    </tr>
                    <tr>
                      <td className="border-r-2 border-black p-3 font-black text-center">이름</td>
                      <td colSpan={5} className="p-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 제목 */}
              <h1 className="text-2xl font-black text-center mb-6 uppercase">
                평가지 제목
              </h1>

              {/* 문제 1 */}
              <div className="border-2 border-black mb-4">
                <div className="bg-gray-100 border-b-2 border-black p-3">
                  <p className="font-black">1. 문제 내용을 입력하세요</p>
                </div>
                <div className="p-4" style={{ minHeight: '120px' }}>
                  <p className="text-gray-400 text-sm">답안 작성 영역</p>
                </div>
              </div>

              {/* 문제 2 */}
              <div className="border-2 border-black mb-4">
                <div className="bg-gray-100 border-b-2 border-black p-3">
                  <p className="font-black">2. 문제 내용을 입력하세요</p>
                </div>
                <div className="p-4" style={{ minHeight: '120px' }}>
                  <p className="text-gray-400 text-sm">답안 작성 영역</p>
                </div>
              </div>

              {/* 문제 3 */}
              <div className="border-2 border-black">
                <div className="bg-gray-100 border-b-2 border-black p-3">
                  <p className="font-black">3. 문제 내용을 입력하세요</p>
                </div>
                <div className="p-4" style={{ minHeight: '120px' }}>
                  <p className="text-gray-400 text-sm">답안 작성 영역</p>
                </div>
              </div>
            </div>
          </div>

          

          {/* 다운로드 버튼 */}
          <div className="flex gap-4 justify-center">
            <BrutalButton
              variant="black"
              size="xl"
              onClick={() => handleDownload('pdf')}
              disabled={downloading !== null}
              icon={downloading === 'pdf' ? <span className="text-2xl animate-pulse-brutal">⏳</span> : <span className="text-2xl">📄</span>}
            >
              {downloading === 'pdf' ? 'PDF 생성 중...' : 'PDF 다운로드'}
            </BrutalButton>

            <BrutalButton
              variant="black"
              size="xl"
              onClick={() => handleDownload('docx')}
              disabled={downloading !== null}
              icon={downloading === 'docx' ? <span className="text-2xl animate-pulse-brutal">⏳</span> : <span className="text-2xl">📝</span>}
            >
              {downloading === 'docx' ? '워드 생성 중...' : '워드 다운로드'}
            </BrutalButton>
          </div>
        </BrutalCard>

        {/* 사용 안내 */}
        <BrutalCard variant="white" padding="lg">
          <div className="flex items-start gap-4">
            <div className="text-4xl">📌</div>
            <div className="flex-1">
              <h3 className="text-xl font-black uppercase mb-3">
                사용 안내
              </h3>
            </div>
          </div>
        </BrutalCard>
      </div>
    </main>
  )
}
