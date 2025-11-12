'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'firebase/auth'
import { auth, database } from '@/lib/firebase/config'
import { ref, push, set } from 'firebase/database'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'
import { BrutalInput } from '@/components/shared/BrutalInput'

interface Question {
  id: string
  content: string
}

interface TemplateData {
  title: string
  questions: Question[]
  createdAt: string
}

export default function TemplateEditorPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // 템플릿 데이터
  const [title, setTitle] = useState('평가지 제목을 입력하세요')
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', content: '문제 1을 입력하세요' },
    { id: '2', content: '문제 2를 입력하세요' },
    { id: '3', content: '문제 3을 입력하세요' },
  ])

  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/')
      } else {
        setUser(user)
        loadFromLocalStorage()
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  // 로컬스토리지에서 불러오기
  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('template_draft')
    if (saved) {
      try {
        const data: TemplateData = JSON.parse(saved)
        setTitle(data.title)
        setQuestions(data.questions)
      } catch (error) {
        console.error('로컬스토리지 로드 실패:', error)
      }
    }
  }

  // 로컬스토리지에 저장
  const saveToLocalStorage = () => {
    const data: TemplateData = {
      title,
      questions,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem('template_draft', JSON.stringify(data))
  }

  // Firebase에 저장
  const saveToFirebase = async () => {
    if (!user) return

    setSaving(true)
    setSaveStatus('saving')

    try {
      const templatesRef = ref(database, `templates/${user.uid}`)
      const newTemplateRef = push(templatesRef)

      const data: TemplateData = {
        title,
        questions,
        createdAt: new Date().toISOString()
      }

      await set(newTemplateRef, data)

      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      console.error('Firebase 저장 실패:', error)
      setSaveStatus('error')
    } finally {
      setSaving(false)
    }
  }

  // 문제 추가
  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      content: `문제 ${questions.length + 1}을 입력하세요`
    }
    setQuestions([...questions, newQuestion])
  }

  // 문제 삭제
  const removeQuestion = (id: string) => {
    if (questions.length <= 1) {
      alert('최소 1개의 문제는 필요합니다')
      return
    }
    setQuestions(questions.filter(q => q.id !== id))
  }

  // 문제 내용 변경
  const updateQuestion = (id: string, content: string) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, content } : q
    ))
  }

  // 자동 저장 (로컬스토리지)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveToLocalStorage()
    }, 1000)

    return () => clearTimeout(timer)
  }, [title, questions])

  // 인쇄
  const handlePrint = () => {
    window.print()
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
    <>
      {/* 편집 모드 (화면 표시용) */}
      <main className="min-h-screen bg-blue-400 print:hidden">
        {/* Header */}
        <header className="border-b-4 border-black bg-black">
          <div className="container-neo py-6 flex items-center justify-between">
            <h1 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
              평가지 편집기
            </h1>
            <div className="flex gap-3">
              <BrutalButton
                variant="lime"
                size="md"
                onClick={saveToFirebase}
                disabled={saving}
                icon={saveStatus === 'saved' ? <span>✅</span> : <span>💾</span>}
              >
                {saveStatus === 'saving' ? '저장 중...' : saveStatus === 'saved' ? '저장됨!' : 'DB 저장'}
              </BrutalButton>
              <BrutalButton
                variant="cyan"
                size="md"
                onClick={handlePrint}
                icon={<span>🖨️</span>}
              >
                인쇄
              </BrutalButton>
              <BrutalButton variant="white" size="md" onClick={() => router.push('/dashboard')}>
                대시보드
              </BrutalButton>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container-neo py-12 max-w-5xl mx-auto">
          {/* 안내 */}
          <BrutalCard variant="yellow" padding="md" className="mb-6">
            <div className="flex items-start gap-3">
              <div className="text-3xl">💡</div>
              <div>
                <p className="font-bold text-gray-800">
                  <strong>자동 저장:</strong> 입력한 내용은 자동으로 로컬에 저장됩니다.
                </p>
                <p className="font-bold text-gray-700 text-sm mt-1">
                  'DB 저장' 버튼을 누르면 클라우드에 영구 저장되며, '인쇄' 버튼으로 바로 출력할 수 있습니다.
                </p>
              </div>
            </div>
          </BrutalCard>

          {/* 제목 편집 */}
          <BrutalCard variant="white" padding="lg" className="mb-6">
            <label className="block mb-3 font-black text-xl uppercase">📝 평가지 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border-4 border-black font-bold text-xl text-center"
              placeholder="평가지 제목"
            />
          </BrutalCard>

          {/* 문제 편집 */}
          <BrutalCard variant="white" padding="lg" className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <label className="font-black text-xl uppercase">📋 평가 문제</label>
              <BrutalButton
                variant="lime"
                size="sm"
                onClick={addQuestion}
                icon={<span>➕</span>}
              >
                문제 추가
              </BrutalButton>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="border-4 border-black p-4 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center font-black">
                      {index + 1}
                    </div>
                    <textarea
                      value={question.content}
                      onChange={(e) => updateQuestion(question.id, e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-black font-bold resize-none"
                      rows={2}
                      placeholder={`문제 ${index + 1}`}
                    />
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="flex-shrink-0 w-8 h-8 bg-red-400 border-2 border-black text-black font-black hover:bg-red-500 transition-colors"
                      disabled={questions.length <= 1}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </BrutalCard>

          {/* 미리보기 안내 */}
          <BrutalCard variant="orange" padding="md">
            <div className="text-center">
              <p className="font-bold text-gray-800">
                <strong>🖨️ 인쇄 미리보기:</strong> '인쇄' 버튼을 누르면 깔끔한 A4 형식으로 출력됩니다
              </p>
            </div>
          </BrutalCard>
        </div>
      </main>

      {/* 인쇄 모드 (인쇄 시에만 표시) */}
      <div className="hidden print:block print-template">
        <style jsx>{`
          @media print {
            @page {
              size: A4;
              margin: 20mm;
            }

            .print-template {
              display: block !important;
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              background: white;
              font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
              font-size: 14pt;
              line-height: 1.6;
            }

            .student-info-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
              border: 2px solid black;
            }

            .student-info-table td {
              border: 1px solid black;
              padding: 12px;
              font-weight: bold;
            }

            .student-info-table .label {
              background-color: #f0f0f0;
              text-align: center;
              width: 80px;
              font-weight: 900;
            }

            .print-title {
              text-align: center;
              font-size: 24pt;
              font-weight: bold;
              margin: 20px 0 30px 0;
              text-transform: uppercase;
              border-bottom: 4px solid black;
              padding-bottom: 10px;
            }

            .question-box {
              border: 2px solid black;
              margin-bottom: 20px;
              page-break-inside: avoid;
            }

            .question-header {
              background-color: #f5f5f5;
              border-bottom: 2px solid black;
              padding: 12px;
              font-weight: bold;
              font-size: 16pt;
            }

            .answer-area {
              padding: 20px;
              min-height: 150px;
              line-height: 2.0;
            }

            .print-instructions {
              background-color: #fffacd;
              border: 2px solid #ffd700;
              padding: 15px;
              margin-bottom: 20px;
              font-size: 12pt;
            }
          }
        `}</style>

        {/* 학생 정보 입력란 */}
        <table className="student-info-table">
          <tbody>
            <tr>
              <td className="label">학년</td>
              <td style={{ width: '100px' }}></td>
              <td className="label">반</td>
              <td style={{ width: '100px' }}></td>
              <td className="label">번호</td>
              <td style={{ width: '100px' }}></td>
            </tr>
            <tr>
              <td className="label">이름</td>
              <td colSpan={5}></td>
            </tr>
          </tbody>
        </table>

        {/* 제목 */}
        <h1 className="print-title">{title}</h1>

        {/* 사용 안내 */}
        <div className="print-instructions">
          <strong>💡 AI 인식 향상 팁:</strong>
          <ul style={{ margin: '10px 0 0 20px' }}>
            <li>답안은 <strong>검은색 펜</strong>으로 또렷하게 작성해주세요</li>
            <li>글씨는 <strong>네모 칸 안</strong>에 정자로 써주세요</li>
            <li>사진 촬영 시 <strong>조명이 밝은 곳</strong>에서 정면으로 찍어주세요</li>
          </ul>
        </div>

        {/* 문제들 */}
        {questions.map((question, index) => (
          <div key={question.id} className="question-box">
            <div className="question-header">
              {index + 1}. {question.content}
            </div>
            <div className="answer-area">
              {/* 답안 작성 영역 */}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '30px', padding: '15px', border: '2px solid #4CAF50', backgroundColor: '#f0fff0' }}>
          <p style={{ margin: 0, fontWeight: 'bold', textAlign: 'center' }}>
            📸 작성 완료 후 TeaBoard에 사진을 업로드하면 AI가 자동으로 채점합니다!
          </p>
        </div>
      </div>
    </>
  )
}
