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
      <div className="min-h-screen bg-blue-400 flex items-center justify-center">
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
    <main className="min-h-screen bg-blue-400">
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
        {/* 안내 카드 */}
        <BrutalCard variant="yellow" padding="lg" className="mb-8">
          <div className="flex items-start gap-4">
            <div className="text-5xl">💡</div>
            <div className="flex-1">
              <h2 className="text-2xl font-black uppercase mb-3">
                AI 친화적 평가지 템플릿
              </h2>
              <p className="text-lg font-bold text-gray-800 mb-4">
                OCR과 AI가 정확하게 인식할 수 있도록 최적화된 A4 평가지 양식입니다.
              </p>
              <ul className="space-y-2 text-base font-semibold text-gray-700">
                <li>✅ <strong>표 형식 구조</strong>: 명확한 구분선으로 답안 영역 분리</li>
                <li>✅ <strong>충분한 답안 공간</strong>: AI가 텍스트를 정확히 추출할 수 있는 여백</li>
                <li>✅ <strong>표준 폰트 크기</strong>: OCR 인식률이 높은 14pt 이상 권장</li>
                <li>✅ <strong>학생 정보 입력란</strong>: 이름, 학년, 반, 번호 필드 포함</li>
                <li>✅ <strong>문제번호 표시</strong>: 각 문제를 명확히 구분</li>
              </ul>
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

          <p className="text-center text-base font-bold text-gray-600 mb-6">
            실제 템플릿은 A4 크기 (210mm × 297mm)로 제공됩니다
          </p>

          {/* 다운로드 버튼 */}
          <div className="flex gap-4 justify-center">
            <BrutalButton
              variant="pink"
              size="xl"
              onClick={() => handleDownload('pdf')}
              disabled={downloading !== null}
              icon={downloading === 'pdf' ? <span className="text-2xl animate-pulse-brutal">⏳</span> : <span className="text-2xl">📄</span>}
            >
              {downloading === 'pdf' ? 'PDF 생성 중...' : 'PDF 다운로드'}
            </BrutalButton>

            <BrutalButton
              variant="cyan"
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
        <BrutalCard variant="lime" padding="lg">
          <div className="flex items-start gap-4">
            <div className="text-4xl">📌</div>
            <div className="flex-1">
              <h3 className="text-xl font-black uppercase mb-3">
                템플릿 사용 방법
              </h3>
              <ol className="space-y-3 text-base font-semibold text-gray-700">
                <li><strong>1단계:</strong> 원하는 형식(PDF 또는 워드)으로 템플릿 다운로드</li>
                <li><strong>2단계:</strong> 워드 파일을 열어 문제 내용 수정 (제목, 문제, 답안 영역 크기 조정 가능)</li>
                <li><strong>3단계:</strong> 수정한 평가지를 인쇄하여 학생들에게 배부</li>
                <li><strong>4단계:</strong> 학생들이 작성한 평가지를 스마트폰으로 촬영</li>
                <li><strong>5단계:</strong> TeaBoard 세션에 사진 업로드하면 AI가 자동 채점</li>
              </ol>
              <div className="mt-4 p-4 bg-white border-2 border-black">
                <p className="font-black text-sm">💡 <strong>TIP:</strong> 촬영 시 조명이 밝은 곳에서 정면으로 찍으면 OCR 인식률이 높아집니다!</p>
              </div>
            </div>
          </div>
        </BrutalCard>
      </div>
    </main>
  )
}
