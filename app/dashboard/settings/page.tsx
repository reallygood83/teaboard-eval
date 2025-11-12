'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'firebase/auth'
import { auth, database } from '@/lib/firebase/config'
import { ref, get, set } from 'firebase/database'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { BrutalButton } from '@/components/shared/BrutalButton'

type AIModel = 'gemini-2.5-flash' | 'grok-4-fast'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // AI Model Settings
  const [selectedModel, setSelectedModel] = useState<AIModel>('gemini-2.5-flash')
  const [geminiApiKey, setGeminiApiKey] = useState('')
  const [grokApiKey, setGrokApiKey] = useState('')

  // Show API key (masked)
  const [showGeminiKey, setShowGeminiKey] = useState(false)
  const [showGrokKey, setShowGrokKey] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('/')
      } else {
        setUser(user)
        await loadSettings(user.uid)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const loadSettings = async (uid: string) => {
    try {
      const settingsRef = ref(database, `users/${uid}/settings`)
      const snapshot = await get(settingsRef)

      if (snapshot.exists()) {
        const data = snapshot.val()
        setSelectedModel(data.selectedModel || 'gemini-2.5-flash')
        setGeminiApiKey(data.geminiApiKey || '')
        setGrokApiKey(data.grokApiKey || '')
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  const handleSave = async () => {
    if (!user) return

    // Validate API keys
    if (selectedModel === 'gemini-2.5-flash' && !geminiApiKey) {
      alert('Gemini API 키를 입력해주세요.')
      return
    }

    if (selectedModel === 'grok-4-fast' && !grokApiKey) {
      alert('Grok API 키를 입력해주세요.')
      return
    }

    setSaving(true)

    try {
      const settingsRef = ref(database, `users/${user.uid}/settings`)
      await set(settingsRef, {
        selectedModel,
        geminiApiKey,
        grokApiKey,
        updatedAt: new Date().toISOString()
      })

      alert('설정이 저장되었습니다!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('설정 저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const maskApiKey = (key: string) => {
    if (!key) return ''
    if (key.length <= 8) return '••••••••'
    return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4)
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
            AI 설정
          </h1>
          <BrutalButton variant="white" size="md" onClick={() => router.push('/dashboard')}>
            대시보드
          </BrutalButton>
        </div>
      </header>

      {/* Content */}
      <div className="container-neo py-12">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Model Selection */}
          <BrutalCard variant="white" padding="xl">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">🤖</div>
                <h2 className="text-3xl font-black uppercase">AI 모델 선택</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Gemini 2.5 Flash */}
              <div
                onClick={() => setSelectedModel('gemini-2.5-flash')}
                className={`
                  p-6 border-4 border-black cursor-pointer transition-all
                  ${selectedModel === 'gemini-2.5-flash'
                    ? 'bg-white neo-shadow-lg scale-105'
                    : 'bg-white hover:bg-gray-50'}
                `}
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">⚡</div>
                  <h3 className="text-2xl font-black mb-2">Gemini 2.5 Flash</h3>
                  <p className="text-sm font-semibold text-gray-700">
                    Google의 빠르고 정확한 AI 모델
                  </p>
                  {selectedModel === 'gemini-2.5-flash' && (
                    <div className="mt-4 bg-white border-2 border-black p-2">
                      <span className="text-xs font-black text-black">선택됨 ✓</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Grok 4 Fast */}
              <div
                onClick={() => setSelectedModel('grok-4-fast')}
                className={`
                  p-6 border-4 border-black cursor-pointer transition-all
                  ${selectedModel === 'grok-4-fast'
                    ? 'bg-white neo-shadow-lg scale-105'
                    : 'bg-white hover:bg-gray-50'}
                `}
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">🚀</div>
                  <h3 className="text-2xl font-black mb-2">Grok 4 Fast</h3>
                  <p className="text-sm font-semibold text-gray-700">
                    xAI의 초고속 차세대 AI 모델
                  </p>
                  {selectedModel === 'grok-4-fast' && (
                    <div className="mt-4 bg-white border-2 border-black p-2">
                      <span className="text-xs font-black text-black">선택됨 ✓</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </BrutalCard>

          {/* API Keys Configuration */}
          <BrutalCard variant="white" padding="xl">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">🔑</div>
                <h2 className="text-3xl font-black uppercase">API 키 설정</h2>
              </div>

              <BrutalCard variant="white" padding="sm">
                <p className="text-sm font-bold">
                  💡 BYOK: 직접 발급한 API 키를 사용합니다.
                </p>
              </BrutalCard>
            </div>

            <div className="space-y-6">
              {/* Gemini API Key */}
              <div>
                <label className="block text-lg font-black mb-2 uppercase">
                  Gemini API 키
                </label>
                <div className="relative">
                  <input
                    type={showGeminiKey ? 'text' : 'password'}
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="AIza...로 시작하는 키를 입력하세요"
                    className="w-full p-4 border-4 border-black font-mono text-sm focus:outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowGeminiKey(!showGeminiKey)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl"
                  >
                    {showGeminiKey ? '🙈' : '👁️'}
                  </button>
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-600">
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Gemini API 키 발급받기 →
                  </a>
                </p>
                {selectedModel === 'gemini-2.5-flash' && !geminiApiKey && (
                  <div className="mt-2 bg-white border-2 border-black p-2">
                    <p className="text-xs font-bold text-black">
                      ⚠️ Gemini 모델을 사용하려면 API 키가 필요합니다
                    </p>
                  </div>
                )}
              </div>

              {/* Grok API Key */}
              <div>
                <label className="block text-lg font-black mb-2 uppercase">
                  Grok API 키
                </label>
                <div className="relative">
                  <input
                    type={showGrokKey ? 'text' : 'password'}
                    value={grokApiKey}
                    onChange={(e) => setGrokApiKey(e.target.value)}
                    placeholder="xai-...로 시작하는 키를 입력하세요"
                    className="w-full p-4 border-4 border-black font-mono text-sm focus:outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowGrokKey(!showGrokKey)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl"
                  >
                    {showGrokKey ? '🙈' : '👁️'}
                  </button>
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-600">
                  <a
                    href="https://console.x.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Grok API 키 발급받기 →
                  </a>
                </p>
                {selectedModel === 'grok-4-fast' && !grokApiKey && (
                  <div className="mt-2 bg-white border-2 border-black p-2">
                    <p className="text-xs font-bold text-black">
                      ⚠️ Grok 모델을 사용하려면 API 키가 필요합니다
                    </p>
                  </div>
                )}
              </div>
            </div>
          </BrutalCard>

          {/* Save Button */}
          <BrutalButton
            variant="black"
            size="lg"
            fullWidth
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '저장 중...' : '💾 설정 저장'}
          </BrutalButton>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <BrutalCard variant="white" padding="md">
              <h3 className="text-lg font-black mb-2">🔒 보안</h3>
              
            </BrutalCard>

            <BrutalCard variant="white" padding="md">
              <h3 className="text-lg font-black mb-2">💰 비용</h3>
              
            </BrutalCard>
          </div>
        </div>
      </div>
    </main>
  )
}
