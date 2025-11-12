'use client'

import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-400">
      {/* Header */}
      <header className="border-b-4 border-black bg-black">
        <div className="container-neo py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-400 border-4 border-black flex items-center justify-center">
                <span className="text-black font-black text-3xl">T</span>
              </div>
              <h1 className="font-black text-4xl text-white uppercase tracking-tight">
                TEABOARD
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container-neo py-20">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h2 className="font-black text-7xl md:text-8xl uppercase leading-none mb-6">
              선생님을 위한
              <br />
              <span className="text-black">AI 루브릭 생성</span>
            </h2>
            <p className="text-2xl font-bold text-black mb-12">
              성취기준만 입력하면 AI가 자동으로 평가 기준을 만들어드립니다
            </p>
          </div>

          <div className="max-w-md">
            <GoogleSignInButton />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-black border-t-4 border-b-4 border-black py-20">
        <div className="container-neo">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-cyan-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="text-6xl mb-6">🤖</div>
              <h3 className="font-black text-3xl uppercase mb-4">AI 자동화</h3>
              <p className="text-lg font-semibold">
                성취기준 입력으로
                <br />
                즉시 루브릭 생성
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-pink-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="font-black text-3xl uppercase mb-4">실시간 평가</h3>
              <p className="text-lg font-semibold">
                학생 제출물을
                <br />
                바로바로 채점
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-lime-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="font-black text-3xl uppercase mb-4">결과 분석</h3>
              <p className="text-lg font-semibold">
                학생별 피드백과
                <br />
                통계 자동 생성
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-orange-400 border-b-4 border-black py-20">
        <div className="container-neo">
          <h2 className="font-black text-6xl uppercase text-center mb-16">
            3단계로 끝나는 평가
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-black text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-black text-4xl">1</span>
              </div>
              <h3 className="font-black text-2xl uppercase mb-4">루브릭 생성</h3>
              <p className="font-bold text-lg">
                성취기준 입력하고
                <br />
                AI가 자동 생성
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-black text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-black text-4xl">2</span>
              </div>
              <h3 className="font-black text-2xl uppercase mb-4">세션 공유</h3>
              <p className="font-bold text-lg">
                학생들에게
                <br />
                코드 공유
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-black text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-black text-4xl">3</span>
              </div>
              <h3 className="font-black text-2xl uppercase mb-4">결과 확인</h3>
              <p className="font-bold text-lg">
                실시간으로
                <br />
                평가 완료
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-400 border-b-4 border-black py-20">
        <div className="container-neo text-center">
          <h2 className="font-black text-6xl md:text-7xl uppercase mb-8">
            지금 바로 시작하세요
          </h2>
          <p className="text-2xl font-bold mb-12">
            무료로 사용 가능 · 설치 불필요 · 즉시 시작
          </p>

          <div className="max-w-md mx-auto">
            <GoogleSignInButton />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container-neo text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-yellow-400 border-4 border-white flex items-center justify-center">
              <span className="text-black font-black text-xl">T</span>
            </div>
            <span className="font-black text-3xl">TEABOARD</span>
          </div>
          <p className="font-bold text-lg opacity-80">
            AI 기반 교육 평가 플랫폼
          </p>
          <p className="font-semibold mt-4 opacity-60">
            © 2025 TEABOARD. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
