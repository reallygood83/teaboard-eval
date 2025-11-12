'use client'

import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'

export default function Home() {
  return (
    <main className="min-h-screen bg-white neo-dots-bg">
      {/* Hero Section - 완전 중앙 정렬 */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full mx-auto">
          {/* 메인 타이틀 - 중앙 배치 */}
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase text-black mb-6">
              TEABOARD
            </h1>

            <div className="bg-yellow-400 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1 inline-block">
              <p className="text-2xl md:text-3xl text-black font-black uppercase">
                AI 기반 루브릭 생성 및 OCR 채점으로<br />시간을 90% 절감하세요
              </p>
            </div>
          </div>

          {/* 로그인 버튼 - 정중앙 */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-md">
              <GoogleSignInButton />
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
