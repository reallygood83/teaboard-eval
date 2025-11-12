'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'
import { BrutalInput } from '@/components/shared/BrutalInput'
import Image from 'next/image'

interface SessionInfo {
  title: string
  description: string
  rubricId: string
  teacherId: string
  status: 'active' | 'closed'
}

export default function StudentSubmitPage() {
  const params = useParams()
  const router = useRouter()
  const sessionCode = params.sessionCode as string

  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [studentName, setStudentName] = useState('')
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle')
  const [queuePosition, setQueuePosition] = useState<number | null>(null)

  useEffect(() => {
    loadSessionInfo()
  }, [sessionCode])

  const loadSessionInfo = async () => {
    try {
      const response = await fetch(`/api/sessions/get?code=${sessionCode}`)
      if (!response.ok) {
        throw new Error('세션을 찾을 수 없습니다')
      }
      const data = await response.json()
      setSessionInfo(data)
    } catch (error) {
      console.error('세션 로딩 실패:', error)
      alert('유효하지 않은 세션 코드입니다')
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)
    setSelectedImages(prev => [...prev, ...newFiles])

    // 이미지 미리보기 생성
    newFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!studentName.trim()) {
      alert('학생 이름을 입력해주세요')
      return
    }

    if (selectedImages.length === 0) {
      alert('최소 1개 이상의 이미지를 업로드해주세요')
      return
    }

    setSubmitting(true)
    setSubmitStatus('processing')

    try {
      const formData = new FormData()
      formData.append('sessionCode', sessionCode)
      formData.append('studentName', studentName)
      formData.append('rubricId', sessionInfo!.rubricId)

      selectedImages.forEach((image, index) => {
        formData.append(`image_${index}`, image)
      })

      const response = await fetch('/api/submissions/submit-with-ocr', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '제출 실패')
      }

      setSubmitStatus('completed')
      setQueuePosition(result.queuePosition)

      // 3초 후 결과 페이지로 이동
      setTimeout(() => {
        router.push(`/student/result/${result.submissionId}`)
      }, 3000)

    } catch (error) {
      console.error('제출 실패:', error)
      setSubmitStatus('error')
      alert('제출에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cyan-100 flex items-center justify-center">
        <BrutalCard variant="white" padding="xl">
          <div className="text-center">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-xl font-black uppercase">로딩 중...</p>
          </div>
        </BrutalCard>
      </div>
    )
  }

  if (!sessionInfo) {
    return (
      <div className="min-h-screen bg-red-100 flex items-center justify-center">
        <BrutalCard variant="white" padding="xl">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-xl font-black uppercase mb-4">세션을 찾을 수 없습니다</p>
            <BrutalButton onClick={() => router.push('/')}>
              홈으로 돌아가기
            </BrutalButton>
          </div>
        </BrutalCard>
      </div>
    )
  }

  if (sessionInfo.status === 'closed') {
    return (
      <div className="min-h-screen bg-orange-100 flex items-center justify-center">
        <BrutalCard variant="white" padding="xl">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <p className="text-xl font-black uppercase mb-4">마감된 세션입니다</p>
            <p className="text-gray-800 font-bold">선생님께 문의해주세요</p>
          </div>
        </BrutalCard>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white neo-dots-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 세션 정보 */}
        <BrutalCard variant="yellow" padding="lg" className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">{sessionInfo.title}</h1>
            <p className="text-lg font-bold text-gray-800">{sessionInfo.description}</p>
          </div>
        </BrutalCard>

        {/* 제출 상태 표시 */}
        {submitStatus === 'processing' && (
          <BrutalCard variant="lime" padding="lg" className="mb-8">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse-brutal">🔄</div>
              <h2 className="text-2xl font-black uppercase mb-2">처리 중...</h2>
              <p className="text-lg font-bold text-gray-800">
                AI가 이미지를 분석하고 있습니다
              </p>
              {queuePosition && queuePosition > 1 && (
                <p className="text-base font-bold text-gray-700 mt-2">
                  대기 순번: {queuePosition}명
                </p>
              )}
            </div>
          </BrutalCard>
        )}

        {submitStatus === 'completed' && (
          <BrutalCard variant="lime" padding="lg" className="mb-8">
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-black uppercase mb-2">제출 완료!</h2>
              <p className="text-lg font-bold text-gray-800">
                결과 페이지로 이동합니다...
              </p>
            </div>
          </BrutalCard>
        )}

        {submitStatus === 'error' && (
          <BrutalCard variant="pink" padding="lg" className="mb-8">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-black uppercase mb-2">제출 실패</h2>
              <p className="text-lg font-bold text-gray-800">
                다시 시도해주세요
              </p>
            </div>
          </BrutalCard>
        )}

        {/* 제출 폼 */}
        {submitStatus === 'idle' && (
          <form onSubmit={handleSubmit}>
            <BrutalCard variant="white" padding="xl">
              <div className="space-y-8">
                {/* 학생 이름 입력 */}
                <div>
                  <BrutalInput
                    type="text"
                    label="학생 이름"
                    placeholder="홍길동"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    icon={<span className="text-xl">👤</span>}
                  />
                </div>

                {/* 이미지 업로드 */}
                <div>
                  <label className="block mb-4 font-black text-xl uppercase">
                    📸 평가지 사진 업로드
                  </label>

                  <div className="border-4 border-dashed border-black p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="text-6xl mb-4">📷</div>
                      <p className="text-lg font-bold text-gray-800 mb-2">
                        클릭하여 이미지 선택
                      </p>
                      <p className="text-sm font-bold text-gray-600">
                        JPG, PNG 파일 (여러 장 가능)
                      </p>
                    </label>
                  </div>
                </div>

                {/* 이미지 미리보기 */}
                {imagePreviews.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-black text-lg uppercase">선택된 이미지 ({imagePreviews.length}장)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-48 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-400 border-2 border-black text-black font-black text-xl hover:bg-red-500 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 제출 버튼 */}
                <BrutalButton
                  type="submit"
                  variant="yellow"
                  size="xl"
                  fullWidth
                  disabled={submitting || !studentName.trim() || imagePreviews.length === 0}
                  icon={<span className="text-2xl">🚀</span>}
                >
                  {submitting ? '제출 중...' : '평가 제출하기'}
                </BrutalButton>

                {/* 안내 메시지 */}
                <div className="bg-blue-100 border-4 border-black p-4">
                  <p className="text-sm font-bold text-gray-800">
                    💡 <strong>안내:</strong> 업로드된 이미지는 AI가 자동으로 텍스트를 추출하여 평가합니다.
                    글씨가 선명하게 보이도록 촬영해주세요.
                  </p>
                </div>
              </div>
            </BrutalCard>
          </form>
        )}
      </div>
    </main>
  )
}
