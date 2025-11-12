# TeaBoard Eval Lab - shadcn/ui MCP 통합 가이드

> **목표**: shadcn/ui MCP를 활용하여 Neo-Brutalism 디자인의 고품질 컴포넌트를 빠르게 생성
> **도구**: shadcn/ui MCP Server (Model Context Protocol)

---

## 📋 목차

1. [shadcn/ui MCP 소개](#1-shadcnui-mcp-소개)
2. [MCP 서버 설정](#2-mcp-서버-설정)
3. [컴포넌트 생성 워크플로우](#3-컴포넌트-생성-워크플로우)
4. [Neo-Brutalism 스타일 프롬프트](#4-neo-brutalism-스타일-프롬프트)
5. [페이지별 컴포넌트 구성](#5-페이지별-컴포넌트-구성)
6. [실전 예제](#6-실전-예제)
7. [문제 해결](#7-문제-해결)

---

## 1. shadcn/ui MCP 소개

### 1.1 MCP (Model Context Protocol)란?

MCP는 AI 모델이 **외부 도구 및 데이터**에 접근할 수 있도록 하는 프로토콜입니다. shadcn/ui MCP는 Claude Code가 shadcn/ui 컴포넌트를 **자동으로 설치하고 커스터마이징**할 수 있게 해줍니다.

### 1.2 shadcn/ui MCP의 장점

| 기능 | 설명 |
|------|------|
| **자동 설치** | CLI 명령 대신 프롬프트로 컴포넌트 설치 |
| **커스터마이징** | Neo-Brutalism 스타일로 즉시 변환 |
| **코드 생성** | 페이지 전체를 한 번에 생성 |
| **일관성** | 디자인 시스템 자동 적용 |
| **속도** | 수동 작업 대비 5-10배 빠름 |

---

## 2. MCP 서버 설정

### 2.1 Claude Code에서 MCP 활성화 확인

```bash
# Claude Code 설정 확인
cat ~/.claude-code-mcp.json
```

shadcn/ui MCP가 없다면 추가:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-shadcn"],
      "env": {}
    }
  }
}
```

### 2.2 프로젝트에서 shadcn/ui 초기화

```bash
npx shadcn-ui@latest init
```

**설정 옵션**:
- ✅ TypeScript: Yes
- ✅ Style: Default
- ✅ Base color: Slate (나중에 커스터마이징)
- ✅ CSS variables: Yes
- ✅ Tailwind config: Yes
- ✅ Components path: `@/components`
- ✅ Utils path: `@/lib/utils`

---

## 3. 컴포넌트 생성 워크플로우

### 3.1 기본 프롬프트 패턴

```
shadcn/ui MCP를 사용하여 [컴포넌트명]을 생성해줘.

요구사항:
- Neo-Brutalism 스타일 적용
- 4px 검은색 테두리
- Hard shadow (8px_8px_0px_0px_rgba(0,0,0,1))
- rounded-none (직각 모서리)
- Primary 색상: #2563EB (파란색)
- Secondary 색상: #F97316 (주황색)

추가 기능:
- [기능 1]
- [기능 2]
```

### 3.2 단계별 워크플로우

#### Step 1: 컴포넌트 선택

```
shadcn/ui에서 다음 컴포넌트를 설치해줘:
- Button
- Card
- Input
- Form
- Select
- Textarea
- Dialog
- Toast
```

#### Step 2: Neo-Brutalism 커스터마이징

```
방금 설치한 Button 컴포넌트를 Neo-Brutalism 스타일로 변경해줘:

- border-4 border-black
- rounded-none
- shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
- active:translate-x-1 active:translate-y-1
- active:shadow-none

Variants:
- default: bg-primary (#2563EB) text-white
- secondary: bg-secondary (#F97316) text-white
- accent: bg-accent (#22C55E) text-white
- outline: bg-white border-black
```

#### Step 3: 페이지 생성

```
다음 페이지를 shadcn/ui 컴포넌트로 생성해줘:

페이지: AI 루브릭 생성기
경로: /sessions/create

레이아웃:
1. 헤더: "AI 루브릭 생성기" (heading-xl)
2. 카드 1: 성취기준 입력 (Input)
3. 카드 2: 평가 취지 입력 (Textarea)
4. 카드 3: 단계 선택 (3단계/4단계 버튼)
5. CTA 버튼: "🤖 AI 루브릭 생성" (accent variant)

모든 컴포넌트는 Neo-Brutalism 스타일 적용.
```

---

## 4. Neo-Brutalism 스타일 프롬프트

### 4.1 버튼 생성 프롬프트

```
shadcn/ui Button 컴포넌트를 다음 스펙으로 커스터마이징해줘:

기본 스타일:
- rounded-none (직각 모서리)
- border-4 border-black (굵은 검은색 테두리)
- font-bold (굵은 폰트)
- shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] (Hard shadow)
- transition-all duration-150
- active:translate-x-1 active:translate-y-1 (클릭 시 이동)
- active:shadow-none (클릭 시 그림자 제거)

Variants:
1. default: bg-primary (#2563EB) text-white hover:bg-[#1D4ED8]
2. secondary: bg-secondary (#F97316) text-white hover:bg-[#EA580C]
3. accent: bg-accent (#22C55E) text-white hover:bg-[#16A34A]
4. outline: bg-white text-black hover:bg-gray-100

Sizes:
- sm: h-10 px-4 py-2 text-sm
- default: h-12 px-6 py-3 text-base
- lg: h-14 px-8 py-4 text-lg
- icon: h-12 w-12

Focus:
- focus-visible:outline-none
- focus-visible:ring-4
- focus-visible:ring-primary/50

파일 경로: components/ui/button.tsx
```

### 4.2 Card 생성 프롬프트

```
shadcn/ui Card 컴포넌트를 Neo-Brutalism 스타일로 생성해줘:

Card:
- rounded-none
- bg-white
- border-4 border-black
- p-6
- shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
- hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
- transition-shadow duration-150

CardHeader:
- pb-4
- border-b-4 border-black

CardTitle:
- heading-md font-bold

CardDescription:
- body-md text-gray-600

CardContent:
- pt-4

CardFooter:
- pt-4
- border-t-4 border-black

파일 경로: components/ui/card.tsx
```

### 4.3 Input 생성 프롬프트

```
shadcn/ui Input 컴포넌트를 다음 스타일로 커스터마이징해줘:

Input:
- h-12 w-full
- rounded-none
- border-4 border-black
- bg-white
- px-4 py-3
- text-base
- placeholder:text-gray-500
- focus-visible:outline-none
- focus-visible:ring-4
- focus-visible:ring-primary/50
- disabled:cursor-not-allowed
- disabled:opacity-50

파일 경로: components/ui/input.tsx
```

### 4.4 Dialog (Modal) 생성 프롬프트

```
shadcn/ui Dialog 컴포넌트를 Neo-Brutalism 스타일로 생성해줘:

DialogContent:
- rounded-none
- border-4 border-black
- bg-white
- p-6
- shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] (XL shadow)
- max-w-lg

DialogHeader:
- pb-4
- border-b-4 border-black

DialogTitle:
- heading-lg font-bold

DialogDescription:
- body-md text-gray-600 mt-2

DialogFooter:
- pt-4
- flex gap-4 justify-end

파일 경로: components/ui/dialog.tsx
```

---

## 5. 페이지별 컴포넌트 구성

### 5.1 로그인 페이지 (`/login`)

#### 필요 컴포넌트
- Card
- Input
- Button
- Form

#### 생성 프롬프트

```
shadcn/ui로 로그인 페이지를 생성해줘.

페이지 경로: app/(auth)/login/page.tsx

레이아웃:
1. 중앙 정렬 Card (max-w-md)
2. 헤더: "로그인" (heading-xl font-bold)
3. Form:
   - 이메일 Input (border-4 border-black)
   - 비밀번호 Input (type="password")
4. 버튼:
   - "로그인" (variant="default", 너비 100%)
   - "Google로 로그인" (variant="outline")
5. 하단 링크: "회원가입" (text-primary underline)

스타일:
- 모든 컴포넌트 Neo-Brutalism 적용
- Card shadow-brutal-md
- 입력 필드 focus시 ring-4 ring-primary/50
```

### 5.2 대시보드 (`/dashboard`)

#### 필요 컴포넌트
- Card
- Button
- Badge
- Table

#### 생성 프롬프트

```
shadcn/ui로 교사 대시보드 페이지를 생성해줘.

페이지 경로: app/(dashboard)/dashboard/page.tsx

레이아웃:
1. 헤더:
   - 제목: "내 평가 세션" (heading-xl)
   - CTA 버튼: "새 세션 만들기" (variant="accent")

2. 통계 카드 그리드 (3열):
   - 총 세션 수 (bg-primary/10)
   - 총 제출 수 (bg-secondary/10)
   - 대기 중 (bg-warning/10)

3. 세션 목록 Card:
   - 테이블 (border-4 border-black)
   - 헤더: 제목, 마감일, 제출 수, 상태, 액션
   - 각 행: 세션 정보 + "보기" 버튼

스타일:
- 통계 카드: shadow-brutal-sm
- 테이블: border-b-2 border-black (각 행)
- 상태 배지: rounded-none border-2 border-black
```

### 5.3 AI 루브릭 생성기 (`/sessions/create`)

#### 필요 컴포넌트
- Card
- Input
- Textarea
- Button
- Select

#### 생성 프롬프트

```
shadcn/ui로 AI 루브릭 생성기 페이지를 생성해줘.

페이지 경로: app/(dashboard)/sessions/create/page.tsx

레이아웃:
1. 헤더: "새 평가 세션 만들기" (heading-xl)

2. Card 1: 기본 정보
   - 제목 Input
   - 마감일 DatePicker

3. Card 2: AI 루브릭 생성기 (bg-primary/10)
   - 성취기준 Input
   - 평가 취지 Textarea (rows=4)
   - 단계 선택: 3단계/4단계 토글 버튼
   - "🤖 AI 루브릭 생성" Button (variant="accent")

4. Card 3: 생성된 루브릭 (조건부 렌더링)
   - 단계별 설명 + 배점 테이블
   - "수정" / "저장" 버튼

5. 하단 액션:
   - "취소" (variant="outline")
   - "세션 생성" (variant="default")

스타일:
- 모든 Input/Textarea: border-4 border-black
- AI 생성 버튼: shadow-brutal-sm
- 루브릭 테이블: border-4 border-black
```

### 5.4 학생 제출 페이지 (`/s/[shortCode]`)

#### 필요 컴포넌트
- Card
- Input
- UploadDropzone (UploadThing)
- Button

#### 생성 프롬프트

```
shadcn/ui로 학생 제출 페이지를 생성해줘.

페이지 경로: app/s/[shortCode]/page.tsx

레이아웃:
1. 중앙 Card (max-w-2xl)
2. 헤더: "손글씨 평가 제출" (heading-lg)
3. 세션 정보 표시:
   - 제목 (text-xl font-bold)
   - 마감일 (text-gray-600)

4. Form:
   - 이름 Input (border-4 border-black)
   - 파일 업로드 영역:
     - UploadDropzone (border-4 border-dashed border-black)
     - "사진을 드래그하거나 클릭하세요"
   - 미리보기 (업로드 후)

5. 제출 버튼:
   - "📤 제출하기" (variant="accent", 너비 100%)
   - 로딩 상태: Spinner + "제출 중..."

스타일:
- Card: shadow-brutal-md
- 업로드 영역: hover시 bg-gray-50
- 제출 버튼: shadow-brutal-sm
```

---

## 6. 실전 예제

### 6.1 예제 1: 루브릭 생성기 카드

**프롬프트**:
```
다음 React 컴포넌트를 shadcn/ui로 생성해줘:

컴포넌트명: RubricGenerator
파일 경로: components/sessions/RubricGenerator.tsx

Props:
- onGenerate: (rubric: RubricData) => void

UI:
1. BrutalCard (variant="primary")
2. 헤더: "AI 루브릭 생성기" (heading-md)
3. Form:
   - 성취기준 Input (placeholder="예: 글씨가 바르고 예쁘게 쓴다")
   - 평가 취지 Textarea (placeholder="예: 글씨의 크기, 간격...")
   - 단계 선택: 3단계/4단계 버튼 그룹
4. 생성 버튼: "🤖 AI 루브릭 생성" (variant="accent", loading prop)

상태:
- achievement: string
- purpose: string
- levels: 3 | 4
- loading: boolean

로직:
- 생성 버튼 클릭 → /api/rubric/generate POST
- 성공 → onGenerate(result) 호출
- 에러 → toast.error() 표시

스타일:
- 모든 입력 필드: border-4 border-black
- 버튼: shadow-brutal-sm
- 로딩 상태: Spinner + "생성 중..."
```

**생성 결과**:
```tsx
// components/sessions/RubricGenerator.tsx

'use client'

import { useState } from 'react'
import { BrutalCard } from '@/components/shared/BrutalCard'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

interface RubricData {
  rubricLevels: 3 | 4
  rubric: Record<string, { description: string; score: number }>
  prompt: string
}

interface RubricGeneratorProps {
  onGenerate: (rubric: RubricData) => void
}

export function RubricGenerator({ onGenerate }: RubricGeneratorProps) {
  const [achievement, setAchievement] = useState('')
  const [purpose, setPurpose] = useState('')
  const [levels, setLevels] = useState<3 | 4>(4)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!achievement || !purpose) {
      toast({
        title: '입력 필요',
        description: '성취기준과 평가 취지를 모두 입력해주세요.',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/rubric/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievement, purpose, levels })
      })

      if (!response.ok) throw new Error('루브릭 생성 실패')

      const rubric = await response.json()
      onGenerate(rubric)

      toast({
        title: '루브릭 생성 완료',
        description: `${levels}단계 루브릭이 생성되었습니다.`,
      })
    } catch (error) {
      toast({
        title: '생성 실패',
        description: '루브릭 생성 중 오류가 발생했습니다.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <BrutalCard variant="primary">
      <h3 className="heading-md font-bold mb-4">AI 루브릭 생성기</h3>

      <div className="space-y-4">
        {/* 성취기준 */}
        <div>
          <label className="font-bold mb-2 block">성취기준</label>
          <Input
            placeholder="예: 글씨가 바르고 예쁘게 쓴다"
            value={achievement}
            onChange={(e) => setAchievement(e.target.value)}
            className="border-4 border-black"
          />
        </div>

        {/* 평가 취지 */}
        <div>
          <label className="font-bold mb-2 block">평가 취지</label>
          <Textarea
            placeholder="예: 글씨의 크기, 간격, 획의 부드러움을 종합적으로 평가..."
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows={4}
            className="border-4 border-black"
          />
        </div>

        {/* 단계 선택 */}
        <div>
          <label className="font-bold mb-2 block">단계 수</label>
          <div className="flex gap-4">
            <Button
              variant={levels === 3 ? 'default' : 'outline'}
              onClick={() => setLevels(3)}
              type="button"
            >
              3단계
            </Button>
            <Button
              variant={levels === 4 ? 'default' : 'outline'}
              onClick={() => setLevels(4)}
              type="button"
            >
              4단계
            </Button>
          </div>
        </div>

        {/* 생성 버튼 */}
        <Button
          variant="accent"
          size="lg"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full shadow-brutal-sm"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              생성 중...
            </>
          ) : (
            '🤖 AI 루브릭 생성'
          )}
        </Button>
      </div>
    </BrutalCard>
  )
}
```

### 6.2 예제 2: 세션 카드 리스트

**프롬프트**:
```
shadcn/ui로 평가 세션 카드 리스트 컴포넌트를 생성해줘:

컴포넌트명: SessionCard
파일 경로: components/dashboard/SessionCard.tsx

Props:
- session: {
    id: string
    title: string
    deadline: Date
    submissionCount: number
    totalStudents: number
    shortCode: string
  }
- onView: (id: string) => void

UI:
1. BrutalCard (hover시 shadow-brutal-lg)
2. 헤더:
   - 제목 (heading-md font-bold)
   - 상태 배지 (진행 중/마감)
3. 본문:
   - 마감일 (아이콘 + 날짜)
   - 제출률 (X/Y명 + Progress Bar)
   - 세션 코드 (복사 버튼)
4. 액션:
   - "보기" 버튼 (variant="default")
   - "공유" 아이콘 버튼

스타일:
- Card: shadow-brutal-md
- 상태 배지: rounded-none border-2
- Progress Bar: border-2 border-black
```

**생성 결과**:
```tsx
// components/dashboard/SessionCard.tsx

'use client'

import { BrutalCard } from '@/components/shared/BrutalCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, Copy, Share2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface Session {
  id: string
  title: string
  deadline: Date
  submissionCount: number
  totalStudents: number
  shortCode: string
}

interface SessionCardProps {
  session: Session
  onView: (id: string) => void
}

export function SessionCard({ session, onView }: SessionCardProps) {
  const isActive = new Date() < session.deadline
  const progress = (session.submissionCount / session.totalStudents) * 100

  const handleCopyCode = () => {
    navigator.clipboard.writeText(session.shortCode)
    toast({
      title: '복사 완료',
      description: `세션 코드 ${session.shortCode}가 복사되었습니다.`
    })
  }

  return (
    <BrutalCard className="shadow-brutal-md hover:shadow-brutal-lg">
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="heading-md font-bold">{session.title}</h3>
        <Badge
          variant={isActive ? 'default' : 'secondary'}
          className="rounded-none border-2 border-black"
        >
          {isActive ? '진행 중' : '마감'}
        </Badge>
      </div>

      {/* 본문 */}
      <div className="space-y-3 mb-4">
        {/* 마감일 */}
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="h-4 w-4" />
          <span className="body-sm">
            {session.deadline.toLocaleDateString('ko-KR')}
          </span>
        </div>

        {/* 제출률 */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="body-sm font-medium">
                {session.submissionCount}/{session.totalStudents}명 제출
              </span>
            </div>
            <span className="body-xs text-gray-500">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-gray-200 border-2 border-black">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 세션 코드 */}
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-gray-100 px-3 py-2 border-2 border-black font-mono text-sm">
            {session.shortCode}
          </code>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopyCode}
            className="shadow-brutal-sm"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 액션 */}
      <div className="flex gap-3 pt-4 border-t-4 border-black">
        <Button
          variant="default"
          className="flex-1 shadow-brutal-sm"
          onClick={() => onView(session.id)}
        >
          보기
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="shadow-brutal-sm"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </BrutalCard>
  )
}
```

---

## 7. 문제 해결

### 7.1 MCP 서버가 응답하지 않을 때

**증상**: 프롬프트가 작동하지 않음

**해결책**:
```bash
# MCP 서버 재시작
pkill -f "server-shadcn"

# Claude Code 재시작
```

### 7.2 스타일이 적용되지 않을 때

**증상**: Neo-Brutalism 스타일이 반영되지 않음

**해결책**:
1. `tailwind.config.ts` 확인:
```typescript
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Neo-Brutalism 커스텀 색상 추가
      colors: {
        primary: {
          DEFAULT: 'rgb(37 99 235)',
          dark: 'rgb(29 78 216)'
        },
        secondary: {
          DEFAULT: 'rgb(249 115 22)',
          dark: 'rgb(234 88 12)'
        },
        accent: {
          DEFAULT: 'rgb(34 197 94)',
          dark: 'rgb(22 163 74)'
        }
      }
    }
  }
}
```

2. `globals.css` 확인:
```css
@import 'neo-brutalism.css';
```

### 7.3 컴포넌트 타입 에러

**증상**: TypeScript 타입 에러

**해결책**:
```bash
# shadcn/ui 재설치
npx shadcn-ui@latest add [component-name]

# 타입 체크
npm run type-check
```

---

## 📚 추가 리소스

### shadcn/ui 공식 문서
- [shadcn/ui 공식 사이트](https://ui.shadcn.com/)
- [Components](https://ui.shadcn.com/docs/components)
- [Theming](https://ui.shadcn.com/docs/theming)

### MCP 프로토콜
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP GitHub](https://github.com/modelcontextprotocol)

---

## 🎯 MCP 활용 체크리스트

프롬프트 작성 시 확인:

- [ ] 컴포넌트명과 파일 경로 명시
- [ ] Neo-Brutalism 스타일 명시
  - [ ] border-4 border-black
  - [ ] rounded-none
  - [ ] shadow-brutal-*
- [ ] Props 인터페이스 정의
- [ ] 상태 관리 명시
- [ ] 이벤트 핸들러 로직 설명
- [ ] Tailwind 클래스 구체적 명시
- [ ] 접근성 (ARIA) 요구사항

---

**shadcn/ui MCP를 활용하여 빠르고 일관된 UI를 구축하세요!** 🚀
