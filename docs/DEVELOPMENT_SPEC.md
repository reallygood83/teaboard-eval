# TeaBoard Eval Lab - 개발 스펙 문서 (Development Specification)

> **목표**: 교사 데이터 주권과 AI 평가 자동화를 결합한 독립형 SaaS 플랫폼
> **디자인 철학**: Neo-Brutalism (네오 부루탈리즘)
> **UI Framework**: shadcn/ui + Tailwind CSS
> **핵심 가치**: 데이터 주권, BYOK, 개인정보 보호, AI 루브릭 자동 생성

---

## 📋 목차

1. [프로젝트 구조](#1-프로젝트-구조)
2. [Neo-Brutalism 디자인 시스템](#2-neo-brutalism-디자인-시스템)
3. [기술 스택 상세](#3-기술-스택-상세)
4. [개발 우선순위 및 단계](#4-개발-우선순위-및-단계)
5. [컴포넌트 설계](#5-컴포넌트-설계)
6. [API 엔드포인트 상세](#6-api-엔드포인트-상세)
7. [상태 관리 전략](#7-상태-관리-전략)
8. [보안 및 인증](#8-보안-및-인증)
9. [배포 및 CI/CD](#9-배포-및-cicd)
10. [테스트 전략](#10-테스트-전략)

---

## 1. 프로젝트 구조

```
teaboard-eval/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # 인증 그룹
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/              # 교사 대시보드 그룹
│   │   ├── dashboard/
│   │   ├── classes/
│   │   ├── students/
│   │   ├── sessions/
│   │   └── settings/
│   ├── s/[shortCode]/            # 학생 제출 페이지
│   ├── results/[submissionId]/   # 학생 결과 페이지
│   └── api/                      # API Routes
│       ├── sessions/
│       ├── rubric/
│       ├── submit/
│       └── export/
├── components/
│   ├── ui/                       # shadcn/ui 컴포넌트
│   ├── auth/
│   ├── dashboard/
│   ├── sessions/
│   └── shared/
├── lib/
│   ├── firebase/
│   │   ├── config.ts
│   │   ├── auth.ts
│   │   └── firestore.ts
│   ├── grok/
│   │   └── api.ts
│   ├── uploadthing/
│   │   └── config.ts
│   └── utils/
│       ├── validation.ts
│       └── helpers.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useFirestore.ts
│   └── useGrok.ts
├── types/
│   ├── database.ts
│   ├── api.ts
│   └── components.ts
├── styles/
│   ├── globals.css
│   └── neo-brutalism.css
└── public/
    └── fonts/
```

---

## 2. Neo-Brutalism 디자인 시스템

### 2.1 디자인 원칙

Neo-Brutalism(네오 부루탈리즘)은 **굵은 경계선, 강렬한 색상 대비, 그림자 없는 평면적 디자인**을 특징으로 하는 스타일입니다.

#### 핵심 특징
- ✅ **굵은 검은색 테두리** (4-6px)
- ✅ **강렬한 색상 조합** (Primary, Secondary, Accent)
- ✅ **플랫 디자인** (그림자 없음)
- ✅ **명확한 계층 구조**
- ✅ **대담한 타이포그래피**
- ✅ **비대칭적 레이아웃**

### 2.2 컬러 시스템

```css
/* styles/neo-brutalism.css */

:root {
  /* Primary - 교육적 신뢰감 */
  --primary: 37 99 235;        /* Blue #2563EB */
  --primary-dark: 29 78 216;   /* Darker Blue */

  /* Secondary - 에너지와 활력 */
  --secondary: 249 115 22;     /* Orange #F97316 */
  --secondary-dark: 234 88 12; /* Darker Orange */

  /* Accent - 성공/긍정 */
  --accent: 34 197 94;         /* Green #22C55E */
  --accent-dark: 22 163 74;    /* Darker Green */

  /* Warning - 주의/대기 */
  --warning: 251 191 36;       /* Yellow #FBBF24 */

  /* Error - 오류/거부 */
  --error: 239 68 68;          /* Red #EF4444 */

  /* Neutrals */
  --background: 255 255 255;   /* White */
  --foreground: 0 0 0;         /* Black */
  --border: 0 0 0;             /* Black borders */

  /* Border Width */
  --border-width: 4px;
  --border-width-heavy: 6px;
}

/* Dark Mode (Optional) */
@media (prefers-color-scheme: dark) {
  :root {
    --background: 23 23 23;    /* Near Black */
    --foreground: 255 255 255; /* White */
  }
}
```

### 2.3 Typography

```css
/* fonts/inter, space-grotesk 사용 권장 */

h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  line-height: 1.2;
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

.heading-xl {
  font-size: 3rem;    /* 48px */
  letter-spacing: -0.02em;
}

.heading-lg {
  font-size: 2rem;    /* 32px */
}

.heading-md {
  font-size: 1.5rem;  /* 24px */
}

.heading-sm {
  font-size: 1.25rem; /* 20px */
}

.body-lg {
  font-size: 1.125rem; /* 18px */
}

.body-md {
  font-size: 1rem;     /* 16px */
}

.body-sm {
  font-size: 0.875rem; /* 14px */
}
```

### 2.4 shadcn/ui 커스터마이징

**모든 shadcn/ui 컴포넌트에 Neo-Brutalism 스타일 적용**

```typescript
// components/ui/button.tsx (shadcn 기본 + Neo-Brutalism)

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-none font-bold transition-transform active:translate-x-1 active:translate-y-1",
  {
    variants: {
      variant: {
        default: "bg-primary text-white border-4 border-black hover:bg-primary-dark",
        secondary: "bg-secondary text-white border-4 border-black hover:bg-secondary-dark",
        accent: "bg-accent text-white border-4 border-black hover:bg-accent-dark",
        outline: "bg-white text-black border-4 border-black hover:bg-gray-100",
        ghost: "border-2 border-transparent hover:border-black hover:bg-gray-50"
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

```typescript
// components/ui/card.tsx (Neo-Brutalism Card)

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-none bg-white border-4 border-black p-6",
        "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]", // Neo-Brutalism shadow
        "hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
        "transition-shadow",
        className
      )}
      {...props}
    />
  )
)
```

```typescript
// components/ui/input.tsx (Neo-Brutalism Input)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-none border-4 border-black bg-white px-4 py-3",
          "text-base placeholder:text-gray-500",
          "focus:outline-none focus:ring-4 focus:ring-primary/50",
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

---

## 3. 기술 스택 상세

### 3.1 Frontend

| 도구 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 14.x | App Router, SSR, API Routes |
| **React** | 18.x | UI 컴포넌트 |
| **TypeScript** | 5.x | 타입 안정성 |
| **Tailwind CSS** | 3.x | 유틸리티 CSS |
| **shadcn/ui** | latest | UI 컴포넌트 라이브러리 |
| **Radix UI** | latest | headless UI primitives |
| **react-hook-form** | 7.x | 폼 관리 |
| **zod** | 3.x | 스키마 검증 |

### 3.2 Backend

| 도구 | 용도 |
|------|------|
| **Firebase Auth** | 교사 인증 (이메일/Google) |
| **Firestore** | NoSQL 데이터베이스 |
| **Vercel Serverless** | API Functions |
| **UploadThing** | 파일 업로드 (24h 자동 삭제) |

### 3.3 AI/ML

| 도구 | 용도 |
|------|------|
| **Grok API** | 루브릭 생성, 손글씨 평가 |
| **BYOK** | 교사 직접 API 키 입력 |

---

## 4. 개발 우선순위 및 단계

### Phase 1: MVP (v0.1) - 핵심 기능 [2주]

#### Week 1: 인프라 및 인증
- [ ] Next.js 14 프로젝트 셋업
- [ ] Firebase 프로젝트 생성 및 연동
- [ ] Tailwind + shadcn/ui 설치
- [ ] Neo-Brutalism 디자인 시스템 구축
- [ ] Firebase Auth 구현 (로그인/회원가입)
- [ ] 교사 전용 인증 미들웨어

#### Week 2: 핵심 평가 흐름
- [ ] 학급 생성/관리 UI
- [ ] 학생 추가/삭제 기능
- [ ] AI 루브릭 생성기 API (`/api/rubric/generate`)
- [ ] 평가 세션 생성 UI + 루브릭 생성 통합
- [ ] 학생 제출 페이지 (`/s/[shortCode]`)
- [ ] UploadThing 통합 (24h 자동 삭제)
- [ ] Grok API 채점 로직
- [ ] 교사 대시보드 (제출 목록)

### Phase 2: 공유 및 데이터 관리 (v1.0) [1주]

- [ ] 결과 공유 기능 (`visibleToStudent: true`)
- [ ] 학생 결과 페이지 (`/results/[submissionId]`)
- [ ] CSV/JSON 내보내기 (`/api/export`)
- [ ] BYOK 설정 페이지 (`/settings`)
- [ ] 실시간 업데이트 (Firestore listeners)

### Phase 3: UX 개선 (v2.0) [1주]

- [ ] 성장 그래프 (학생별 점수 추이)
- [ ] 다중 파일 업로드 지원
- [ ] 세션 복제 기능
- [ ] 루브릭 템플릿 저장/재사용
- [ ] 모바일 반응형 최적화

### Phase 4: 고급 기능 (v3.0) [미정]

- [ ] 오프라인 동기화 (PWA)
- [ ] 다국어 지원 (i18n)
- [ ] 협업 기능 (학년별 공유)
- [ ] 오픈소스 공개

---

## 5. 컴포넌트 설계

### 5.1 공통 컴포넌트

#### BrutalCard

```typescript
// components/shared/BrutalCard.tsx

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
        "transition-all cursor-pointer",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </div>
  )
}
```

#### BrutalButton

```typescript
// components/shared/BrutalButton.tsx

import { Button } from "@/components/ui/button"

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  loading?: boolean
}

export function BrutalButton({
  children,
  variant = 'default',
  size = 'default',
  loading,
  ...props
}: BrutalButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={loading}
      className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          처리 중...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
```

### 5.2 도메인별 컴포넌트

#### RubricGenerator

```typescript
// components/sessions/RubricGenerator.tsx

interface RubricGeneratorProps {
  onGenerate: (rubric: RubricData) => void
}

export function RubricGenerator({ onGenerate }: RubricGeneratorProps) {
  const [achievement, setAchievement] = useState('')
  const [purpose, setPurpose] = useState('')
  const [levels, setLevels] = useState<3 | 4>(4)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/rubric/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievement, purpose, levels })
      })
      const rubric = await response.json()
      onGenerate(rubric)
    } catch (error) {
      toast.error('루브릭 생성 실패')
    } finally {
      setLoading(false)
    }
  }

  return (
    <BrutalCard variant="primary">
      <h3 className="heading-md mb-4">AI 루브릭 생성기</h3>

      <div className="space-y-4">
        <div>
          <label className="font-bold mb-2 block">성취기준</label>
          <Input
            placeholder="예: 글씨가 바르고 예쁘게 쓴다"
            value={achievement}
            onChange={(e) => setAchievement(e.target.value)}
          />
        </div>

        <div>
          <label className="font-bold mb-2 block">평가 취지</label>
          <Textarea
            placeholder="예: 글씨의 크기, 간격, 획의 부드러움을 종합적으로 평가..."
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows={4}
          />
        </div>

        <div>
          <label className="font-bold mb-2 block">단계 수</label>
          <div className="flex gap-4">
            <BrutalButton
              variant={levels === 3 ? 'default' : 'outline'}
              onClick={() => setLevels(3)}
            >
              3단계
            </BrutalButton>
            <BrutalButton
              variant={levels === 4 ? 'default' : 'outline'}
              onClick={() => setLevels(4)}
            >
              4단계
            </BrutalButton>
          </div>
        </div>

        <BrutalButton
          variant="accent"
          size="lg"
          onClick={handleGenerate}
          loading={loading}
          className="w-full"
        >
          🤖 AI 루브릭 생성
        </BrutalButton>
      </div>
    </BrutalCard>
  )
}
```

#### StudentSubmissionForm

```typescript
// components/submissions/StudentSubmissionForm.tsx

export function StudentSubmissionForm({ sessionId, shortCode }: Props) {
  const [studentName, setStudentName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !studentName) return

    setSubmitting(true)
    try {
      // 1. UploadThing으로 파일 업로드
      const uploadRes = await uploadFiles([file])
      const imageUrl = uploadRes[0].url

      // 2. 제출 API 호출
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          studentName,
          imageUrl
        })
      })

      if (response.ok) {
        toast.success('제출 완료! 교사 확인 후 피드백 드릴게요~')
        // 결과 대기 페이지로 이동
        router.push(`/results/pending`)
      }
    } catch (error) {
      toast.error('제출 실패')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <BrutalCard className="max-w-2xl mx-auto">
      <h2 className="heading-lg mb-6">손글씨 평가 제출</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-bold mb-2 block">이름</label>
          <Input
            placeholder="김철수"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-bold mb-2 block">사진 업로드</label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => setFile(res[0])}
            appearance={{
              button: "bg-primary border-4 border-black",
              container: "border-4 border-dashed border-black"
            }}
          />
        </div>

        <BrutalButton
          type="submit"
          variant="accent"
          size="lg"
          loading={submitting}
          className="w-full"
        >
          📤 제출하기
        </BrutalButton>
      </form>
    </BrutalCard>
  )
}
```

---

## 6. API 엔드포인트 상세

### 6.1 `/api/rubric/generate` - AI 루브릭 생성

**요청**
```typescript
POST /api/rubric/generate

{
  "achievement": "글씨가 바르고 예쁘게 쓴다",
  "purpose": "글씨의 크기, 간격, 획의 부드러움을 종합적으로 평가...",
  "levels": 4
}
```

**응답**
```typescript
{
  "rubricLevels": 4,
  "rubric": {
    "탁월": {
      "description": "...",
      "score": 100
    },
    "우수": { ... },
    "보통": { ... },
    "미흡": { ... }
  },
  "prompt": "다음 손글씨 사진을 평가하세요..."
}
```

**구현**
```typescript
// app/api/rubric/generate/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { callGrokAPI } from '@/lib/grok/api'

export async function POST(req: NextRequest) {
  try {
    const { achievement, purpose, levels } = await req.json()

    // Grok API 호출 (루브릭 생성 프롬프트)
    const systemPrompt = `
당신은 초등학교 평가 전문가입니다.
성취기준과 평가 취지를 바탕으로 ${levels}단계 루브릭을 생성하세요.

출력 형식 (JSON):
{
  "rubricLevels": ${levels},
  "rubric": {
    "단계명": {
      "description": "구체적 설명",
      "score": 점수
    }
  },
  "prompt": "Grok에게 줄 채점용 지침"
}
    `

    const userPrompt = `
성취기준: ${achievement}
평가 취지: ${purpose}
    `

    const result = await callGrokAPI({
      model: 'grok-2-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3
    })

    const rubricData = JSON.parse(result.choices[0].message.content)

    return NextResponse.json(rubricData)
  } catch (error) {
    return NextResponse.json(
      { error: '루브릭 생성 실패' },
      { status: 500 }
    )
  }
}
```

### 6.2 `/api/submit` - 학생 제출 + Grok 채점

**요청**
```typescript
POST /api/submit

{
  "sessionId": "abc123",
  "studentName": "김철수",
  "imageUrl": "https://uploadthing.com/..."
}
```

**응답**
```typescript
{
  "submissionId": "sub_xyz",
  "status": "processing"
}
```

**구현**
```typescript
// app/api/submit/route.ts

export async function POST(req: NextRequest) {
  const { sessionId, studentName, imageUrl } = await req.json()

  // 1. 세션 정보 가져오기
  const sessionDoc = await getDoc(doc(db, 'sessions', sessionId))
  const session = sessionDoc.data()

  // 2. Grok Vision API로 채점
  const grokResult = await callGrokAPI({
    model: 'grok-2-vision-latest',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: session.criteria.prompt },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      }
    ]
  })

  const evaluation = JSON.parse(grokResult.choices[0].message.content)

  // 3. Firestore에 저장
  const submissionRef = await addDoc(collection(db, 'submissions'), {
    sessionId,
    studentName,
    imageUrl,
    result: {
      score: evaluation.score,
      level: evaluation.level,
      feedback: evaluation.feedback,
      details: evaluation.details || {}
    },
    visibleToStudent: false, // 교사만 먼저 볼 수 있음
    submittedAt: serverTimestamp()
  })

  return NextResponse.json({
    submissionId: submissionRef.id,
    status: 'completed'
  })
}
```

### 6.3 `/api/sessions/share` - 결과 공유

**요청**
```typescript
POST /api/sessions/share

{
  "submissionId": "sub_xyz"
}
```

**응답**
```typescript
{
  "success": true,
  "sharedAt": "2025-08-07T10:30:00Z"
}
```

**구현**
```typescript
// app/api/sessions/share/route.ts

export async function POST(req: NextRequest) {
  const { submissionId } = await req.json()
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 권한 확인 후 업데이트
  await updateDoc(doc(db, 'submissions', submissionId), {
    visibleToStudent: true,
    sharedAt: serverTimestamp()
  })

  return NextResponse.json({ success: true })
}
```

---

## 7. 상태 관리 전략

### 7.1 전역 상태 (Zustand)

```typescript
// lib/store/useAuthStore.ts

import { create } from 'zustand'

interface AuthState {
  user: User | null
  loading: boolean
  grokApiKey: string | null
  setUser: (user: User | null) => void
  setGrokApiKey: (key: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  grokApiKey: null,
  setUser: (user) => set({ user, loading: false }),
  setGrokApiKey: (key) => set({ grokApiKey: key })
}))
```

```typescript
// lib/store/useSessionStore.ts

interface SessionState {
  sessions: EvaluationSession[]
  currentSession: EvaluationSession | null
  addSession: (session: EvaluationSession) => void
  updateSession: (id: string, data: Partial<EvaluationSession>) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  sessions: [],
  currentSession: null,
  addSession: (session) => set((state) => ({
    sessions: [...state.sessions, session]
  })),
  updateSession: (id, data) => set((state) => ({
    sessions: state.sessions.map(s =>
      s.id === id ? { ...s, ...data } : s
    )
  }))
}))
```

### 7.2 서버 상태 (React Query)

```typescript
// hooks/useSubmissions.ts

import { useQuery, useMutation } from '@tanstack/react-query'

export function useSubmissions(sessionId: string) {
  return useQuery({
    queryKey: ['submissions', sessionId],
    queryFn: async () => {
      const q = query(
        collection(db, 'submissions'),
        where('sessionId', '==', sessionId),
        orderBy('submittedAt', 'desc')
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    }
  })
}

export function useShareSubmission() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (submissionId: string) => {
      const response = await fetch('/api/sessions/share', {
        method: 'POST',
        body: JSON.stringify({ submissionId })
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] })
      toast.success('학생에게 결과가 공유되었습니다')
    }
  })
}
```

---

## 8. 보안 및 인증

### 8.1 Firebase Auth 설정

```typescript
// lib/firebase/auth.ts

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)

  // 교사 전용 체크
  await setDoc(doc(db, 'users', result.user.uid), {
    email: result.user.email,
    displayName: result.user.displayName,
    isTeacher: true,
    createdAt: serverTimestamp()
  }, { merge: true })

  return result.user
}

export async function signUpWithEmail(email: string, password: string, displayName: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email,
    displayName,
    isTeacher: true,
    createdAt: serverTimestamp()
  })

  return userCredential.user
}
```

### 8.2 Firestore Security Rules (최종)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper: 교사 권한 확인
    function isTeacher() {
      return request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isTeacher == true;
    }

    // Helper: 세션 소유자 확인
    function isSessionOwner(sessionId) {
      return isTeacher() &&
        get(/databases/$(database)/documents/sessions/$(sessionId)).data.teacherId == request.auth.uid;
    }

    // users: 본인만 읽기/쓰기
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // classes: 교사만 CRUD
    match /classes/{classId} {
      allow read: if isTeacher();
      allow create, update, delete: if isTeacher() &&
        request.resource.data.teacherId == request.auth.uid;
    }

    // students: 교사만 CRUD
    match /students/{studentId} {
      allow read: if isTeacher();
      allow create, update, delete: if isTeacher();
    }

    // sessions: 교사만 CRUD
    match /sessions/{sessionId} {
      allow read: if isTeacher();
      allow create, update, delete: if isTeacher() &&
        request.resource.data.teacherId == request.auth.uid;
    }

    // submissions: 학생 생성 가능, 교사/학생 조건부 읽기
    match /submissions/{submissionId} {
      allow create: if true; // 학생 제출 허용

      allow read: if
        // 교사: 자신의 세션 제출물만
        isSessionOwner(resource.data.sessionId) ||
        // 학생: 공유된 경우만
        resource.data.visibleToStudent == true;

      allow update: if isSessionOwner(resource.data.sessionId);

      allow delete: if isSessionOwner(resource.data.sessionId);
    }
  }
}
```

### 8.3 API Route 보호

```typescript
// lib/auth/middleware.ts

import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function requireAuth(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return session
}

// 사용 예시
export async function POST(req: NextRequest) {
  const session = await requireAuth(req)
  if (session instanceof NextResponse) return session // 에러 응답

  // 정상 처리
  // ...
}
```

---

## 9. 배포 및 CI/CD

### 9.1 Vercel 배포 설정

```bash
# vercel.json

{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_FIREBASE_API_KEY": "@firebase-api-key",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN": "@firebase-auth-domain",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID": "@firebase-project-id",
    "UPLOADTHING_SECRET": "@uploadthing-secret",
    "UPLOADTHING_APP_ID": "@uploadthing-app-id"
  }
}
```

### 9.2 GitHub Actions (선택 사항)

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
```

---

## 10. 테스트 전략

### 10.1 단위 테스트 (Jest + React Testing Library)

```typescript
// __tests__/components/RubricGenerator.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RubricGenerator } from '@/components/sessions/RubricGenerator'

describe('RubricGenerator', () => {
  it('성취기준 입력 후 루브릭 생성', async () => {
    const mockOnGenerate = jest.fn()
    render(<RubricGenerator onGenerate={mockOnGenerate} />)

    // 입력
    fireEvent.change(screen.getByLabelText('성취기준'), {
      target: { value: '글씨가 바르고 예쁘게 쓴다' }
    })

    // 생성 버튼 클릭
    fireEvent.click(screen.getByText('🤖 AI 루브릭 생성'))

    // 결과 확인
    await waitFor(() => {
      expect(mockOnGenerate).toHaveBeenCalledWith(
        expect.objectContaining({
          rubricLevels: 4,
          rubric: expect.any(Object)
        })
      )
    })
  })
})
```

### 10.2 E2E 테스트 (Playwright)

```typescript
// e2e/session-flow.spec.ts

import { test, expect } from '@playwright/test'

test('평가 세션 생성 → 학생 제출 → 결과 확인', async ({ page }) => {
  // 1. 로그인
  await page.goto('http://localhost:3000/login')
  await page.fill('input[name="email"]', 'teacher@test.com')
  await page.fill('input[name="password"]', 'password123')
  await page.click('button[type="submit"]')

  // 2. 세션 생성
  await page.goto('/sessions/create')
  await page.fill('input[name="title"]', '손글씨 평가')
  await page.fill('textarea[name="achievement"]', '글씨가 바르고 예쁘게 쓴다')
  await page.click('button:has-text("AI 루브릭 생성")')

  await page.waitForSelector('text=루브릭이 생성되었습니다')

  const shortCode = await page.textContent('[data-testid="short-code"]')

  // 3. 학생 제출 (새 탭)
  const studentPage = await page.context().newPage()
  await studentPage.goto(`http://localhost:3000/s/${shortCode}`)
  await studentPage.fill('input[name="studentName"]', '김철수')
  await studentPage.setInputFiles('input[type="file"]', './test-image.jpg')
  await studentPage.click('button:has-text("제출하기")')

  await studentPage.waitForSelector('text=제출 완료')

  // 4. 교사 대시보드에서 확인
  await page.reload()
  await expect(page.locator('text=김철수')).toBeVisible()
})
```

---

## 📚 추가 참고 자료

### shadcn/ui 설치

```bash
npx shadcn-ui@latest init

# 필요한 컴포넌트 설치
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add table
```

### Neo-Brutalism 참고 사이트

- [Neo-Brutalism UI](https://www.neobrutalism.dev/)
- [Dribbble - Neo-Brutalism](https://dribbble.com/tags/neo-brutalism)
- [Figma Community - Brutal UI Kit](https://www.figma.com/community/search?model_type=files&q=brutal)

### Grok API 문서

- [x.ai API Documentation](https://docs.x.ai/api)
- [Grok Vision API](https://docs.x.ai/docs/guides/vision)

---

## 🎯 개발 시작 체크리스트

- [ ] Next.js 14 프로젝트 생성
- [ ] Firebase 프로젝트 설정
- [ ] Tailwind CSS + shadcn/ui 설치
- [ ] Neo-Brutalism 디자인 시스템 구축 (`styles/neo-brutalism.css`)
- [ ] Firebase Auth 연동
- [ ] Firestore 보안 규칙 배포
- [ ] UploadThing 계정 생성 및 설정
- [ ] Grok API 테스트 (BYOK)
- [ ] Vercel 프로젝트 연결
- [ ] 환경 변수 설정

---

## 💡 핵심 개발 원칙

1. **데이터 주권 최우선**: 모든 데이터는 교사 Firebase 계정에 저장
2. **개인정보 보호**: 사진 24시간 자동 삭제, 최소 데이터 수집
3. **BYOK 투명성**: 교사가 직접 API 키 관리
4. **Neo-Brutalism 일관성**: 모든 UI 컴포넌트에 디자인 시스템 적용
5. **TypeScript 엄격 모드**: 타입 안정성 보장
6. **접근성 우선**: ARIA 속성, 키보드 네비게이션
7. **반응형 디자인**: 모바일 퍼스트
8. **성능 최적화**: 이미지 최적화, 코드 스플리팅

---

## 🚀 다음 단계

이 스펙 문서를 기반으로 다음 작업을 진행하세요:

1. **프로젝트 초기화**
   ```bash
   npx create-next-app@latest teaboard-eval --typescript --tailwind --app
   cd teaboard-eval
   npx shadcn-ui@latest init
   ```

2. **Firebase 설정**
   - Firebase Console에서 프로젝트 생성
   - Auth, Firestore 활성화
   - `lib/firebase/config.ts` 작성

3. **첫 페이지 구현**
   - `/login` - 로그인 페이지 (Neo-Brutalism 스타일)
   - `/dashboard` - 교사 대시보드
   - `/sessions/create` - AI 루브릭 생성기

4. **핵심 API 구현**
   - `/api/rubric/generate` - Grok 루브릭 생성
   - `/api/submit` - 학생 제출 + 채점

---

**이 문서는 TeaBoard Eval Lab의 완전한 개발 가이드입니다.**
**각 섹션의 코드는 그대로 사용하거나 프로젝트에 맞게 커스터마이징하세요.**

**문의사항이나 추가 기능 요청은 GitHub Issues에서 관리하세요!** 🚀
