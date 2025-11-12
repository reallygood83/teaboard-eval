'use client'

import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
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
                AI 기반 루브릭 생성으로<br />평가 시간을 90% 절감하세요
              </p>
            </div>
          </div>

          {/* 로그인 버튼 - 정중앙 */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-md">
              <GoogleSignInButton />
            </div>
          </div>

          {/* 3가지 주요 기능 - 중앙 정렬 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* 무료 시작 */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 text-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-5xl mb-3">⚡</div>
              <p className="text-lg font-black uppercase text-black">무료 시작</p>
            </div>

            {/* 설치 불필요 */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 text-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-5xl mb-3">🎯</div>
              <p className="text-lg font-black uppercase text-black">설치 불필요</p>
            </div>

            {/* 즉시 사용 */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 text-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-5xl mb-3">📊</div>
              <p className="text-lg font-black uppercase text-black">즉시 사용</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI 기능 소개 - 3단계 */}
      <section className="py-20 bg-cyan-100 border-t-4 border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase text-black mb-6">
              AI가 선생님의 업무를 덜어드립니다
            </h2>
            <p className="text-xl font-bold text-gray-800">
              평가 준비부터 결과 분석까지, 모든 과정을 자동화하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI 자동 생성 */}
            <div className="bg-yellow-400 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-7xl mb-4">⚡</div>
              <h3 className="text-2xl font-black uppercase mb-4 text-black">AI 자동 생성</h3>
              <p className="text-lg font-bold text-gray-900">
                성취기준만 입력하면 AI가 교육과정에 맞는 평가 루브릭을 즉시 생성합니다
              </p>
            </div>

            {/* 실시간 평가 */}
            <div className="bg-green-400 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-7xl mb-4">🎯</div>
              <h3 className="text-2xl font-black uppercase mb-4 text-black">실시간 평가</h3>
              <p className="text-lg font-bold text-gray-900">
                학생이 제출한 답변을 AI가 루브릭 기준에 따라 즉시 평가하고 점수를 부여합니다
              </p>
            </div>

            {/* 결과 분석 */}
            <div className="bg-blue-400 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-7xl mb-4">📊</div>
              <h3 className="text-2xl font-black uppercase mb-4 text-black">결과 분석</h3>
              <p className="text-lg font-bold text-gray-900">
                학생별 피드백과 전체 통계를 자동으로 생성하여 한눈에 확인할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3단계 프로세스 */}
      <section className="py-20 bg-lime-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase text-black mb-6">
              3단계로 완성하는 평가
            </h2>
            <p className="text-xl font-bold text-gray-800">
              복잡한 평가 과정을 간단하게 만들어드립니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-28 h-28 bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-auto mb-6 flex items-center justify-center">
                <span className="text-6xl font-black text-black">1</span>
              </div>
              <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                <h3 className="text-2xl font-black uppercase text-black mb-3">루브릭 생성</h3>
                <p className="text-base font-bold text-gray-800">
                  성취기준을 입력하면 AI가 평가 기준을 자동으로 만들어드립니다
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-28 h-28 bg-lime-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-auto mb-6 flex items-center justify-center">
                <span className="text-6xl font-black text-black">2</span>
              </div>
              <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                <h3 className="text-2xl font-black uppercase text-black mb-3">학생 평가</h3>
                <p className="text-base font-bold text-gray-800">
                  생성된 코드를 학생들에게 공유하여 평가를 시작합니다
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-28 h-28 bg-pink-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-auto mb-6 flex items-center justify-center">
                <span className="text-6xl font-black text-black">3</span>
              </div>
              <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                <h3 className="text-2xl font-black uppercase text-black mb-3">결과 확인</h3>
                <p className="text-base font-bold text-gray-800">
                  실시간으로 평가 결과와 학생별 피드백을 확인합니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 선택 이유 - 4가지 */}
      <section className="py-20 bg-orange-100 border-t-4 border-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase text-black mb-6">
              선생님들이 TEABOARD를 선택하는 이유
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-6xl font-black mb-2 text-black">90%</div>
              <p className="text-lg font-bold text-gray-900">평가 준비 시간 단축</p>
            </div>

            <div className="bg-lime-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-6xl font-black mb-2 text-black">즉시</div>
              <p className="text-lg font-bold text-gray-900">AI 기반 자동 채점</p>
            </div>

            <div className="bg-cyan-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-6xl font-black mb-2 text-black">100%</div>
              <p className="text-lg font-bold text-gray-900">무료 사용</p>
            </div>

            <div className="bg-pink-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-6xl font-black mb-2 text-black">실시간</div>
              <p className="text-lg font-bold text-gray-900">학생 피드백 제공</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-100 border-t-4 border-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-black uppercase text-black mb-8">
            지금 바로 시작하세요
          </h2>

          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 inline-block mb-10">
            <p className="text-xl font-bold text-gray-900">
              5분이면 첫 루브릭을 만들고 평가를 시작할 수 있습니다
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <GoogleSignInButton />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-3xl font-black uppercase text-white">TEABOARD</h3>
            <p className="text-base font-bold text-gray-300">
              © 2025 TeaBoard. All rights reserved.
            </p>
            <p className="text-sm font-bold text-gray-400">
              선생님의 업무 부담을 줄이고, 학생들에게 더 나은 피드백을 제공합니다
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
