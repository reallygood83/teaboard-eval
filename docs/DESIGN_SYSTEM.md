# TeaBoard Eval Lab - Design System Guide

> **디자인 철학**: Neo-Brutalism (네오 부루탈리즘)
> **목표**: 교육적 신뢰감 + 대담한 시각적 임팩트 + 명확한 사용자 경험

---

## 📋 목차

1. [Neo-Brutalism 핵심 원칙](#1-neo-brutalism-핵심-원칙)
2. [컬러 팔레트](#2-컬러-팔레트)
3. [타이포그래피](#3-타이포그래피)
4. [간격 시스템](#4-간격-시스템)
5. [그림자와 효과](#5-그림자와-효과)
6. [shadcn/ui 컴포넌트 커스터마이징](#6-shadcnui-컴포넌트-커스터마이징)
7. [레이아웃 패턴](#7-레이아웃-패턴)
8. [애니메이션 및 인터랙션](#8-애니메이션-및-인터랙션)
9. [반응형 디자인](#9-반응형-디자인)
10. [접근성 가이드라인](#10-접근성-가이드라인)

---

## 1. Neo-Brutalism 핵심 원칙

### 1.1 디자인 DNA

Neo-Brutalism은 **1950-60년대 Brutalist 건축**에서 영감을 받아 디지털 세계로 재해석한 스타일입니다.

#### 핵심 특징

| 특징 | 설명 | 구현 방법 |
|------|------|----------|
| **굵은 경계선** | 4-6px 검은색 테두리 | `border-4 border-black` |
| **플랫 디자인** | 그림자 없는 평면적 요소 | `shadow-none` (기본) |
| **강렬한 색상** | 고채도 Primary/Secondary | `bg-primary`, `bg-secondary` |
| **Hard Shadow** | 오프셋 그림자 (X/Y 이동) | `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]` |
| **직각 모서리** | 둥근 모서리 없음 | `rounded-none` |
| **대담한 타이포그래피** | 굵은 폰트, 큰 크기 | `font-bold text-4xl` |
| **비대칭 레이아웃** | 격자를 깨는 배치 | Flexbox/Grid 창의적 활용 |

### 1.2 TeaBoard Eval Lab만의 해석

교육 플랫폼이므로 **신뢰감**과 **명확성**을 유지하면서 Neo-Brutalism의 **활력**을 더합니다.

- ✅ **교육적 신뢰**: 파란색(Primary)을 주요 색상으로 사용
- ✅ **행동 유도**: 주황색(Secondary)을 CTA 버튼에 활용
- ✅ **성공 피드백**: 녹색(Accent)을 긍정적 메시지에 사용
- ✅ **명확한 계층**: 헤더 > 카드 > 버튼 순으로 시각적 무게 차등

---

## 2. 컬러 팔레트

### 2.1 Primary Color (신뢰감)

```css
/* Blue - 교육적 신뢰와 안정감 */
--primary: 37 99 235;        /* #2563EB - Tailwind Blue-600 */
--primary-dark: 29 78 216;   /* #1D4ED8 - Hover/Active */
--primary-light: 59 130 246; /* #3B82F6 - Background */
```

**사용처**:
- 주요 버튼 (저장, 생성 등)
- 헤더/네비게이션
- 링크
- 진행 상태 표시

### 2.2 Secondary Color (활력)

```css
/* Orange - 에너지와 행동 유도 */
--secondary: 249 115 22;     /* #F97316 - Tailwind Orange-500 */
--secondary-dark: 234 88 12; /* #EA580C - Hover */
--secondary-light: 251 146 60; /* #FB923C - Background */
```

**사용처**:
- CTA 버튼 (AI 생성, 제출 등)
- 중요 알림
- 강조 배지

### 2.3 Accent Color (성공)

```css
/* Green - 성공과 긍정적 피드백 */
--accent: 34 197 94;         /* #22C55E - Tailwind Green-500 */
--accent-dark: 22 163 74;    /* #16A34A - Hover */
--accent-light: 74 222 128;  /* #4ADE80 - Background */
```

**사용처**:
- 성공 메시지
- 완료 상태
- 체크마크/확인 아이콘

### 2.4 Warning & Error

```css
/* Yellow - 주의/대기 */
--warning: 251 191 36;       /* #FBBF24 - Tailwind Yellow-400 */

/* Red - 오류/거부 */
--error: 239 68 68;          /* #EF4444 - Tailwind Red-500 */
```

### 2.5 Neutrals

```css
/* Black & White */
--foreground: 0 0 0;         /* #000000 - 텍스트/테두리 */
--background: 255 255 255;   /* #FFFFFF - 배경 */

/* Grays (최소 사용) */
--gray-100: 243 244 246;     /* #F3F4F6 */
--gray-200: 229 231 235;     /* #E5E7EB */
--gray-500: 107 114 128;     /* #6B7280 - 보조 텍스트 */
--gray-900: 17 24 39;        /* #111827 - 진한 텍스트 */
```

### 2.6 사용 예시

```tsx
// Button variants
<BrutalButton variant="default">저장</BrutalButton>     // Primary Blue
<BrutalButton variant="secondary">제출</BrutalButton>   // Orange CTA
<BrutalButton variant="accent">완료</BrutalButton>      // Green Success
<BrutalButton variant="outline">취소</BrutalButton>     // White + Border

// Cards
<BrutalCard variant="default">...</BrutalCard>          // White
<BrutalCard variant="primary">...</BrutalCard>          // Blue tint
<BrutalCard variant="secondary">...</BrutalCard>        // Orange tint
<BrutalCard variant="accent">...</BrutalCard>           // Green tint
```

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

```css
/* 헤더: Space Grotesk (Geometric Sans) */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');

/* 본문: Inter (Humanist Sans) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* 코드: JetBrains Mono (선택 사항) */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
```

**적용**:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em; /* Tight tracking */
}

body, p, span, div {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  line-height: 1.6;
}

code, pre {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
}
```

### 3.2 크기 스케일 (Tailwind 기반)

| 클래스 | 크기 | 용도 |
|--------|------|------|
| `.heading-xl` | 3rem (48px) | 페이지 타이틀 |
| `.heading-lg` | 2rem (32px) | 섹션 헤더 |
| `.heading-md` | 1.5rem (24px) | 카드 타이틀 |
| `.heading-sm` | 1.25rem (20px) | 서브헤더 |
| `.body-lg` | 1.125rem (18px) | 중요 본문 |
| `.body-md` | 1rem (16px) | 일반 본문 |
| `.body-sm` | 0.875rem (14px) | 보조 텍스트 |
| `.body-xs` | 0.75rem (12px) | 캡션 |

### 3.3 폰트 두께

```css
.font-normal { font-weight: 400; }  /* 본문 */
.font-medium { font-weight: 500; }  /* 강조 */
.font-semibold { font-weight: 600; } /* 버튼 */
.font-bold { font-weight: 700; }    /* 헤더 */
```

### 3.4 사용 예시

```tsx
// 페이지 타이틀
<h1 className="heading-xl font-bold mb-6">
  AI 루브릭 생성기
</h1>

// 섹션 헤더
<h2 className="heading-lg font-bold mb-4">
  평가 기준 설정
</h2>

// 카드 타이틀
<h3 className="heading-md font-bold mb-2">
  성취기준
</h3>

// 본문
<p className="body-md text-gray-700">
  글씨의 크기, 간격, 획의 부드러움을 평가합니다.
</p>

// 보조 텍스트
<span className="body-sm text-gray-500">
  최종 수정: 2025-08-07
</span>
```

---

## 4. 간격 시스템

Tailwind의 기본 스페이싱을 활용하되, **8px 그리드 시스템**을 따릅니다.

### 4.1 간격 스케일

| 값 | Tailwind | Pixels | 용도 |
|----|----------|--------|------|
| 0 | `p-0` | 0px | 없음 |
| 1 | `p-1` | 4px | 아이콘 간격 |
| 2 | `p-2` | 8px | Tight 간격 |
| 3 | `p-3` | 12px | 버튼 내부 |
| 4 | `p-4` | 16px | 카드 내부 |
| 6 | `p-6` | 24px | 섹션 간격 |
| 8 | `p-8` | 32px | 큰 섹션 |
| 12 | `p-12` | 48px | 페이지 레벨 |
| 16 | `p-16` | 64px | Hero 섹션 |

### 4.2 마진/패딩 규칙

```tsx
// 카드
<div className="p-6">       {/* 내부 패딩: 24px */}
  <h3 className="mb-4">...</h3>  {/* 헤더 하단: 16px */}
  <p className="mb-2">...</p>    {/* 문단 간격: 8px */}
</div>

// 섹션 간격
<section className="mb-12">  {/* 섹션 하단: 48px */}
  ...
</section>

// 페이지 레이아웃
<main className="container mx-auto px-4 py-12">
  {/* 좌우 패딩: 16px, 상하 패딩: 48px */}
</main>
```

---

## 5. 그림자와 효과

Neo-Brutalism의 핵심은 **Hard Shadow** (오프셋 그림자)입니다.

### 5.1 Hard Shadow Utility

```css
/* styles/neo-brutalism.css */

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

/* Hover 확대 */
.shadow-brutal-hover {
  box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
  transition: box-shadow 0.15s ease;
}

.shadow-brutal-hover:hover {
  box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 1);
}
```

### 5.2 색상별 그림자 (선택 사항)

```css
/* Primary Blue Shadow */
.shadow-brutal-primary {
  box-shadow: 8px 8px 0px 0px rgb(37 99 235);
}

/* Secondary Orange Shadow */
.shadow-brutal-secondary {
  box-shadow: 8px 8px 0px 0px rgb(249 115 22);
}
```

### 5.3 사용 예시

```tsx
// 카드
<BrutalCard className="shadow-brutal-md hover:shadow-brutal-lg">
  ...
</BrutalCard>

// 버튼
<BrutalButton className="shadow-brutal-sm active:shadow-none">
  클릭
</BrutalButton>

// 강조 박스
<div className="border-4 border-black p-6 shadow-brutal-primary">
  중요한 내용
</div>
```

---

## 6. shadcn/ui 컴포넌트 커스터마이징

### 6.1 Button

```typescript
// components/ui/button.tsx

import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center",
    "rounded-none", // 직각 모서리
    "font-bold",
    "border-4 border-black",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    // Hard shadow + active state
    "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    "active:translate-x-1 active:translate-y-1",
    "active:shadow-none"
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### 6.2 Input

```typescript
// components/ui/input.tsx

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full",
          "rounded-none", // 직각
          "border-4 border-black",
          "bg-white px-4 py-3",
          "text-base",
          "placeholder:text-gray-500",
          "focus-visible:outline-none",
          "focus-visible:ring-4 focus-visible:ring-primary/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
```

### 6.3 Card

```typescript
// components/ui/card.tsx

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-none bg-white",
        "border-4 border-black",
        "p-6",
        "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
        "transition-shadow duration-150",
        "hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
        className
      )}
      {...props}
    />
  )
)

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-2 pb-4 border-b-4 border-black", className)}
      {...props}
    />
  )
)

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("heading-md font-bold", className)}
      {...props}
    />
  )
)
```

### 6.4 Dialog (Modal)

```typescript
// components/ui/dialog.tsx (shadcn base + custom)

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50",
        "translate-x-[-50%] translate-y-[-50%]",
        "grid w-full max-w-lg gap-4",
        "rounded-none", // 직각
        "border-4 border-black",
        "bg-white p-6",
        "shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]", // XL shadow
        "duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
))
```

### 6.5 Table

```typescript
// components/ui/table.tsx

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto border-4 border-black">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
)

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-primary text-white font-bold", className)}
    {...props}
  />
))

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b-2 border-black transition-colors",
      "hover:bg-gray-50",
      className
    )}
    {...props}
  />
))
```

---

## 7. 레이아웃 패턴

### 7.1 컨테이너

```tsx
// 페이지 기본 레이아웃
<main className="min-h-screen bg-white">
  <div className="container mx-auto px-4 py-12 max-w-7xl">
    {/* 콘텐츠 */}
  </div>
</main>
```

### 7.2 그리드 시스템

```tsx
// 카드 그리드
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <BrutalCard>...</BrutalCard>
  <BrutalCard>...</BrutalCard>
  <BrutalCard>...</BrutalCard>
</div>

// 비대칭 그리드 (Neo-Brutalism 특징)
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-5">
    <BrutalCard className="h-full">...</BrutalCard>
  </div>
  <div className="col-span-7">
    <BrutalCard className="h-full">...</BrutalCard>
  </div>
</div>
```

### 7.3 Flexbox 레이아웃

```tsx
// 헤더
<header className="flex items-center justify-between p-6 border-b-4 border-black">
  <h1 className="heading-lg font-bold">TeaBoard Eval</h1>
  <nav className="flex gap-4">
    <Button variant="ghost">대시보드</Button>
    <Button variant="outline">로그아웃</Button>
  </nav>
</header>

// 카드 내부
<BrutalCard>
  <div className="flex items-start justify-between mb-4">
    <h3 className="heading-md font-bold">평가 세션</h3>
    <Button size="sm">수정</Button>
  </div>
  <p className="body-md text-gray-700">...</p>
</BrutalCard>
```

---

## 8. 애니메이션 및 인터랙션

### 8.1 버튼 Press 효과

```css
/* components/ui/button.tsx */
.btn-press {
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
}

.btn-press:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}
```

### 8.2 카드 Hover 확대

```css
.card-hover {
  transition: box-shadow 0.2s ease;
  box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
}

.card-hover:hover {
  box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 1);
}
```

### 8.3 입력 필드 Focus

```css
input:focus {
  outline: none;
  ring: 4px;
  ring-color: rgba(37, 99, 235, 0.5); /* Primary/50 */
}
```

### 8.4 모달 등장 애니메이션

```tsx
// Framer Motion (선택 사항)
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  className="fixed inset-0 z-50"
>
  <BrutalCard className="max-w-2xl mx-auto mt-20">
    ...
  </BrutalCard>
</motion.div>
```

---

## 9. 반응형 디자인

### 9.1 Breakpoints (Tailwind 기본)

```css
/* Mobile First */
sm:  640px   /* Small devices */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large screens */
```

### 9.2 반응형 패턴

```tsx
// 모바일: 1열, 태블릿: 2열, 데스크톱: 3열
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  ...
</div>

// 모바일 숨김
<div className="hidden md:block">
  데스크톱 전용 콘텐츠
</div>

// 모바일 표시
<div className="block md:hidden">
  모바일 전용 메뉴
</div>

// 폰트 크기 조정
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
  TeaBoard Eval Lab
</h1>

// 패딩 조정
<section className="px-4 md:px-6 lg:px-12 py-8 md:py-12">
  ...
</section>
```

---

## 10. 접근성 가이드라인

### 10.1 색상 대비

모든 텍스트는 **WCAG 2.1 AA** 기준을 충족해야 합니다.

| 조합 | 대비 비율 | 통과 여부 |
|------|----------|----------|
| Black (#000) / White (#FFF) | 21:1 | ✅ AAA |
| Primary (#2563EB) / White | 8.6:1 | ✅ AAA |
| Secondary (#F97316) / White | 3.9:1 | ✅ AA |
| Accent (#22C55E) / White | 3.1:1 | ✅ AA (Large) |

### 10.2 키보드 네비게이션

```tsx
// 모든 인터랙티브 요소에 focus-visible
<button className="focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50">
  클릭
</button>

// 링크
<a
  href="/dashboard"
  className="focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
>
  대시보드
</a>
```

### 10.3 ARIA 속성

```tsx
// 버튼
<button
  aria-label="AI 루브릭 생성"
  aria-describedby="rubric-help"
>
  🤖 생성
</button>
<span id="rubric-help" className="sr-only">
  성취기준과 평가 취지를 입력하면 자동으로 루브릭을 생성합니다
</span>

// 모달
<div
  role="dialog"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">결과 공유</h2>
  <p id="dialog-description">학생에게 평가 결과를 공유하시겠습니까?</p>
</div>

// 로딩 상태
<button disabled aria-busy="true">
  <Loader2 className="animate-spin" aria-hidden="true" />
  처리 중...
</button>
```

### 10.4 스크린 리더 전용 텍스트

```tsx
// sr-only 클래스
<span className="sr-only">현재 페이지: 대시보드</span>

// Tailwind utility
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 📚 추가 리소스

### Neo-Brutalism 참고 사이트
- [Brutalist Websites](https://brutalistwebsites.com/)
- [Dribbble - Neo-Brutalism](https://dribbble.com/search/neo-brutalism)
- [Awwwards - Brutalism](https://www.awwwards.com/websites/brutalism/)

### Figma 디자인 템플릿
- [Neo-Brutalism UI Kit](https://www.figma.com/community/file/1234567890)
- [Brutal Design System](https://www.figma.com/community/file/0987654321)

### 폰트 다운로드
- [Space Grotesk - Google Fonts](https://fonts.google.com/specimen/Space+Grotesk)
- [Inter - Google Fonts](https://fonts.google.com/specimen/Inter)

---

## 🎯 디자인 체크리스트

페이지/컴포넌트 작성 시 확인:

- [ ] 모든 버튼에 `border-4 border-black` 적용
- [ ] 카드에 `shadow-brutal-md` 적용
- [ ] 입력 필드 `rounded-none` 확인
- [ ] Primary/Secondary/Accent 색상 적절히 사용
- [ ] 폰트: 헤더는 Space Grotesk, 본문은 Inter
- [ ] 간격: 8px 그리드 시스템 준수
- [ ] 모바일 반응형 테스트 완료
- [ ] 키보드 네비게이션 작동 확인
- [ ] 색상 대비 AA 이상 통과
- [ ] ARIA 속성 필요시 추가

---

**이 디자인 시스템을 모든 페이지와 컴포넌트에 일관되게 적용하세요!** 🎨
