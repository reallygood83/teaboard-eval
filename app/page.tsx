'use client'

import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'

export default function Home() {
  return (
    <main className="min-h-screen bg-purple-100">
      {/* Hero Section - 중앙 정렬 */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center space-y-12 py-16 sm:py-20">
          {/* 메인 타이틀 */}
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase text-black">
              TeaBoard
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-800 font-bold bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transform -rotate-1">
              AI 기반 루브릭 생성으로 평가 시간을 90% 절감하세요
            </p>
          </div>

          {/* Google 로그인 버튼 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <GoogleSignInButton />
          </div>

          {/* 신뢰 지표 */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-gray-800">
            <div className="flex items-center gap-2 bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span>⚡ 무료 시작</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span>🎯 설치 불필요</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span>📊 즉시 사용</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 중앙 정렬 */}
      <section className="py-16 md:py-24 bg-lime-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-6">
                AI가 선생님의 업무를 덜어드립니다
              </h2>
              <p className="text-xl font-bold text-gray-800">
                평가 준비부터 결과 분석까지, 모든 과정을 자동화하세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 border-4 border-black bg-yellow-400 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="font-black text-xl mb-4 uppercase tracking-wide text-black">
                  AI 자동 생성
                </h3>
                <p className="text-lg font-bold text-gray-800">
                  성취기준만 입력하면 AI가 교육과정에 맞는 평가 루브릭을 즉시 생성합니다
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 border-4 border-black bg-green-400 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all -rotate-1">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="font-black text-xl mb-4 uppercase tracking-wide text-black">
                  실시간 평가
                </h3>
                <p className="text-lg font-bold text-gray-800">
                  학생이 제출한 답변을 AI가 루브릭 기준에 따라 즉시 평가하고 점수를 부여합니다
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 border-4 border-black bg-blue-400 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rotate-1">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="font-black text-xl mb-4 uppercase tracking-wide text-black">
                  결과 분석
                </h3>
                <p className="text-lg font-bold text-gray-800">
                  학생별 피드백과 전체 통계를 자동으로 생성하여 한눈에 확인할 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - 중앙 정렬 */}
      <section className="py-16 md:py-24 bg-cyan-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-6">
                3단계로 완성하는 평가
              </h2>
              <p className="text-xl font-bold text-gray-800">
                복잡한 평가 과정을 간단하게 만들어드립니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-auto mb-6 flex items-center justify-center">
                  <span className="text-black font-black text-4xl uppercase">1</span>
                </div>
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                  <h3 className="text-xl font-black uppercase text-black mb-3">루브릭 생성</h3>
                  <p className="text-gray-800 font-bold">
                    성취기준을 입력하면 AI가 평가 기준을 자동으로 만들어드립니다
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-lime-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-auto mb-6 flex items-center justify-center">
                  <span className="text-black font-black text-4xl uppercase">2</span>
                </div>
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                  <h3 className="text-xl font-black uppercase text-black mb-3">학생 평가</h3>
                  <p className="text-gray-800 font-bold">
                    생성된 코드를 학생들에게 공유하여 평가를 시작합니다
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-pink-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-auto mb-6 flex items-center justify-center">
                  <span className="text-black font-black text-4xl uppercase">3</span>
                </div>
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                  <h3 className="text-xl font-black uppercase text-black mb-3">결과 확인</h3>
                  <p className="text-gray-800 font-bold">
                    실시간으로 평가 결과와 학생별 피드백을 확인합니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - 중앙 정렬 */}
      <section className="py-16 md:py-24 bg-orange-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-6">
                선생님들이 TeaBoard를 선택하는 이유
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center transform hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="text-5xl font-black mb-2 uppercase">90%</div>
                <p className="text-xl font-bold text-gray-800">평가 준비 시간 단축</p>
              </div>
              <div className="bg-lime-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center transform hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="text-5xl font-black mb-2 uppercase">즉시</div>
                <p className="text-xl font-bold text-gray-800">AI 기반 자동 채점</p>
              </div>
              <div className="bg-cyan-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center transform hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="text-5xl font-black mb-2 uppercase">100%</div>
                <p className="text-xl font-bold text-gray-800">무료 사용</p>
              </div>
              <div className="bg-pink-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center transform hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="text-5xl font-black mb-2 uppercase">실시간</div>
                <p className="text-xl font-bold text-gray-800">학생 피드백 제공</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - 중앙 정렬 */}
      <section className="py-16 md:py-24 bg-purple-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-black mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl font-bold text-gray-800 mb-10 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 inline-block">
              5분이면 첫 루브릭을 만들고 평가를 시작할 수 있습니다
            </p>

            <div className="max-w-md mx-auto mb-6">
              <GoogleSignInButton />
            </div>

            <p className="text-sm font-bold text-gray-800 bg-yellow-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 inline-block">
              Google 계정으로 간편하게 시작 · 카드 등록 불필요
            </p>
          </div>
        </div>
      </section>

      {/* Footer - 중앙 정렬 */}
      <footer className="border-t-4 border-black bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center">
                <span className="text-white font-black text-2xl">T</span>
              </div>
              <h3 className="text-2xl font-black uppercase text-black">TeaBoard</h3>
            </div>

            <p className="text-base font-black text-black bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-6 py-3">
              © 2025 TeaBoard. All rights reserved.
            </p>

            <p className="text-sm font-bold text-gray-800">
              선생님의 업무 부담을 줄이고, 학생들에게 더 나은 피드백을 제공합니다
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
