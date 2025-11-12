# TeaBoard Eval Lab - Quick Start Guide

> **목표**: 30분 안에 로컬 개발 환경 구축 및 첫 페이지 실행

---

## 📋 사전 요구사항

| 도구 | 최소 버전 | 확인 명령어 |
|------|----------|------------|
| **Node.js** | 18.17+ | `node -v` |
| **npm** | 9.0+ | `npm -v` |
| **Git** | 2.0+ | `git --version` |
| **VS Code** | latest | - |

---

## 🚀 Step 1: 프로젝트 생성 (5분)

### 1.1 Next.js 프로젝트 초기화

```bash
npx create-next-app@latest teaboard-eval
```

**설정 옵션**:
```
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias? … No
```

### 1.2 프로젝트 디렉토리 이동

```bash
cd teaboard-eval
```

---

## 🎨 Step 2: shadcn/ui 설정 (3분)

### 2.1 shadcn/ui 초기화

```bash
npx shadcn-ui@latest init
```

**설정 옵션**:
```
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Slate
✔ Would you like to use CSS variables for colors? … yes
```

### 2.2 필수 컴포넌트 설치

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add table
```

---

## 🔥 Step 3: Firebase 설정 (10분)

### 3.1 Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트명: `teaboard-eval`
4. Google Analytics: 비활성화 (선택 사항)

### 3.2 Firebase 서비스 활성화

#### Authentication
1. 좌측 메뉴 → Authentication → 시작하기
2. 로그인 방법 → 이메일/비밀번호 활성화
3. 로그인 방법 → Google 활성화

#### Firestore Database
1. 좌측 메뉴 → Firestore Database → 데이터베이스 만들기
2. 위치: `asia-northeast3` (서울)
3. 보안 규칙: **테스트 모드**로 시작 (나중에 변경)

### 3.3 Firebase SDK 설치

```bash
npm install firebase
```

### 3.4 Firebase 설정 파일 생성

**Firebase Console → 프로젝트 설정 → 일반 → 내 앱 → 웹 앱 추가**

```typescript
// lib/firebase/config.ts

import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// 중복 초기화 방지
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
```

### 3.5 환경 변수 설정

`.env.local` 파일 생성:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Grok API (BYOK - 사용자가 직접 입력)
# GROK_API_KEY는 Firestore에 암호화 저장
```

---

## 🎨 Step 4: Neo-Brutalism 디자인 시스템 적용 (5분)

### 4.1 커스텀 CSS 파일 생성

```css
/* styles/neo-brutalism.css */

:root {
  /* Colors */
  --primary: 37 99 235;
  --primary-dark: 29 78 216;
  --secondary: 249 115 22;
  --secondary-dark: 234 88 12;
  --accent: 34 197 94;
  --accent-dark: 22 163 74;
  --warning: 251 191 36;
  --error: 239 68 68;

  /* Border */
  --border-width: 4px;
  --border-width-heavy: 6px;
}

/* Hard Shadows */
.shadow-brutal-sm {
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
}

.shadow-brutal-md {
  box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
}

.shadow-brutal-lg {
  box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 1);
}

.shadow-brutal-xl {
  box-shadow: 16px 16px 0px 0px rgba(0, 0, 0, 1);
}

/* Typography */
.heading-xl {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.heading-lg {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.heading-md {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.heading-sm {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
}

.body-lg {
  font-size: 1.125rem;
  line-height: 1.6;
}

.body-md {
  font-size: 1rem;
  line-height: 1.6;
}

.body-sm {
  font-size: 0.875rem;
  line-height: 1.6;
}
```

### 4.2 globals.css에 임포트

```css
/* app/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@import './neo-brutalism.css';

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Base Styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### 4.3 Tailwind 설정 확장

```typescript
// tailwind.config.ts

import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(37 99 235)',
          dark: 'rgb(29 78 216)',
          light: 'rgb(59 130 246)'
        },
        secondary: {
          DEFAULT: 'rgb(249 115 22)',
          dark: 'rgb(234 88 12)',
          light: 'rgb(251 146 60)'
        },
        accent: {
          DEFAULT: 'rgb(34 197 94)',
          dark: 'rgb(22 163 74)',
          light: 'rgb(74 222 128)'
        },
        warning: 'rgb(251 191 36)',
        error: 'rgb(239 68 68)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace']
      }
    },
  },
  plugins: [],
}

export default config
```

---

## 🧩 Step 5: 공통 컴포넌트 생성 (5분)

### 5.1 BrutalCard 컴포넌트

```typescript
// components/shared/BrutalCard.tsx

import { cn } from '@/lib/utils'

interface BrutalCardProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'accent'
  className?: string
  onClick?: () => void
}

export function BrutalCard({
  children,
  variant = 'default',
  className,
  onClick
}: BrutalCardProps) {
  const variantStyles = {
    default: 'bg-white',
    primary: 'bg-primary/10',
    secondary: 'bg-secondary/10',
    accent: 'bg-accent/10'
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-none border-4 border-black p-6",
        "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
        "hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
        "transition-shadow cursor-pointer",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </div>
  )
}
```

### 5.2 BrutalButton 커스터마이징

```typescript
// components/ui/button.tsx (shadcn 기본 파일 수정)

// 기존 buttonVariants에 추가:
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-none", // Neo-Brutalism
    "font-bold",
    "border-4 border-black",
    "transition-all duration-150",
    "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    "active:translate-x-1 active:translate-y-1",
    "active:shadow-none",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark",
        secondary: "bg-secondary text-white hover:bg-secondary-dark",
        accent: "bg-accent text-white hover:bg-accent-dark",
        outline: "bg-white text-black hover:bg-gray-100",
        ghost: "border-transparent hover:border-black hover:bg-gray-50"
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "h-12 w-12"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)
```

---

## ✅ Step 6: 첫 페이지 생성 및 테스트 (2분)

### 6.1 홈 페이지 수정

```typescript
// app/page.tsx

import { BrutalCard } from '@/components/shared/BrutalCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* 헤더 */}
        <header className="text-center mb-12">
          <h1 className="heading-xl mb-4">
            TeaBoard Eval Lab
          </h1>
          <p className="body-lg text-gray-700">
            교사 데이터 주권을 위한 AI 평가 플랫폼
          </p>
        </header>

        {/* 기능 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <BrutalCard variant="primary">
            <h3 className="heading-md mb-2">🤖 AI 루브릭 생성</h3>
            <p className="body-md text-gray-700">
              성취기준만 입력하면 자동으로 3/4단계 루브릭 생성
            </p>
          </BrutalCard>

          <BrutalCard variant="secondary">
            <h3 className="heading-md mb-2">🔒 데이터 주권</h3>
            <p className="body-md text-gray-700">
              모든 평가 데이터를 교사가 100% 소유
            </p>
          </BrutalCard>

          <BrutalCard variant="accent">
            <h3 className="heading-md mb-2">🔑 BYOK</h3>
            <p className="body-md text-gray-700">
              Grok API 키 직접 입력으로 투명한 운영
            </p>
          </BrutalCard>

          <BrutalCard variant="default">
            <h3 className="heading-md mb-2">⏰ 24시간 삭제</h3>
            <p className="body-md text-gray-700">
              학생 사진 자동 삭제로 개인정보 0리스크
            </p>
          </BrutalCard>
        </div>

        {/* CTA */}
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button variant="default" size="lg">
              시작하기
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">
              더 알아보기
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
```

### 6.2 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 → **Neo-Brutalism 스타일의 홈 페이지 확인!** ✨

---

## 🎯 Step 7: 다음 단계

### 7.1 로그인 페이지 생성

```bash
mkdir -p app/(auth)/login
```

```typescript
// app/(auth)/login/page.tsx

'use client'

import { useState } from 'react'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (error) {
      alert('로그인 실패')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <BrutalCard className="max-w-md w-full">
        <h1 className="heading-xl mb-6">로그인</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="font-bold mb-2 block">이메일</label>
            <Input
              type="email"
              placeholder="teacher@school.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-4 border-black"
              required
            />
          </div>

          <div>
            <label className="font-bold mb-2 block">비밀번호</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-4 border-black"
              required
            />
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <a href="/signup" className="text-primary underline body-md">
            회원가입
          </a>
        </div>
      </BrutalCard>
    </main>
  )
}
```

### 7.2 대시보드 페이지 생성

```bash
mkdir -p app/(dashboard)/dashboard
```

```typescript
// app/(dashboard)/dashboard/page.tsx

'use client'

import { BrutalCard } from '@/components/shared/BrutalCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="heading-xl">내 평가 세션</h1>
          <Link href="/sessions/create">
            <Button variant="accent" size="lg">
              + 새 세션 만들기
            </Button>
          </Link>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <BrutalCard variant="primary">
            <div className="heading-lg mb-2">12</div>
            <div className="body-md text-gray-700">총 세션 수</div>
          </BrutalCard>

          <BrutalCard variant="secondary">
            <div className="heading-lg mb-2">348</div>
            <div className="body-md text-gray-700">총 제출 수</div>
          </BrutalCard>

          <BrutalCard variant="warning">
            <div className="heading-lg mb-2">23</div>
            <div className="body-md text-gray-700">대기 중</div>
          </BrutalCard>
        </div>

        {/* 세션 목록 */}
        <BrutalCard>
          <h2 className="heading-md mb-4">최근 세션</h2>
          <div className="space-y-4">
            <p className="body-md text-gray-500 text-center py-8">
              아직 세션이 없습니다. 첫 세션을 만들어보세요!
            </p>
          </div>
        </BrutalCard>
      </div>
    </main>
  )
}
```

---

## 📦 Step 8: 배포 (선택 사항)

### 8.1 Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### 8.2 환경 변수 설정

Vercel Dashboard → Settings → Environment Variables에 `.env.local` 내용 추가

---

## ✅ 완료 체크리스트

- [ ] Node.js 18+ 설치 확인
- [ ] Next.js 프로젝트 생성
- [ ] shadcn/ui 초기화 및 컴포넌트 설치
- [ ] Firebase 프로젝트 생성 및 SDK 설정
- [ ] Neo-Brutalism CSS 적용
- [ ] BrutalCard, BrutalButton 컴포넌트 생성
- [ ] 홈 페이지 작성 및 확인 (`npm run dev`)
- [ ] 로그인 페이지 생성
- [ ] 대시보드 페이지 생성

---

## 🆘 문제 해결

### 포트 3000이 사용 중일 때

```bash
# 포트 변경
npm run dev -- -p 3001
```

### Tailwind 클래스가 작동하지 않을 때

```bash
# 캐시 삭제 후 재시작
rm -rf .next
npm run dev
```

### Firebase 연결 오류

1. `.env.local` 파일 확인
2. Firebase Console에서 API 키 재확인
3. 개발 서버 재시작

---

**축하합니다! 🎉 TeaBoard Eval Lab 개발 환경이 준비되었습니다.**

**다음 단계**: [DEVELOPMENT_SPEC.md](./DEVELOPMENT_SPEC.md)를 참고하여 기능 구현 시작!
