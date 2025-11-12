## 현재 구조 진단
- 프레임워크: Next.js App Router + Serverless API, Tailwind v4, Firebase Auth/DB.
- 폴더 구조: `app/*` 페이지/라우트, `app/api/*` 서버 핸들러, `components/shared/*` 공용 UI, `lib/*` 서비스.
- 테마: 네오 부루탈리즘 유틸리티와 컬러 변수를 `app/globals.css:7-32`에 정의. 버튼/카드/인풋은 `components/shared/Brutal*`로 구현.
- 페이지: 랜딩(`app/page.tsx`), 인증(`app/auth/*`), 대시보드/설정/세션/결과(`app/dashboard/*`), 학생 제출(`app/student/*`).
- 헤더: `components/shared/Header.tsx:11-155` 존재하지만 일부 페이지에서 중복 헤더 구현(`app/dashboard/page.tsx:54-63`).
- 폰트: `app/layout.tsx:2-13`의 Geist 폰트 변수와 `app/globals.css:54-58`의 시스템/노토 산스 지정이 혼재.
- API: 루브릭 생성/저장/세션/제출 등 라우트가 존재(`app/api/rubrics/generate/route.ts`, `app/api/submissions/submit-with-ocr/route.ts` 등). AI 연동 유틸은 `lib/ai/gemini.ts`, `lib/ai/grok.ts`.

## 테마/디자인 개선
- 컬러/토큰 표준화: `:root` 변수를 Primary/Secondary/Accent/Warning/Neutral로 확장하고 Tailwind v4에서 CSS 변수 매핑.
- 폰트 일관화: 헤딩은 Space Grotesk, 본문은 Inter/Noto Sans KR로 통일. Geist 제거 또는 보조로 한정(`app/layout.tsx:2-13`, `app/globals.css:54-58`).
- 배경 정리: 그래디언트 제거하고 플랫 배경 + 도트/그리드 패턴 적용. 예: `app/page.tsx:7`, `app/student/submit/[sessionCode]/page.tsx:173`.
- 컴포넌트 레이어 강화: `BrutalButton/Card/Input` 외에 Badge, Table, Modal, Toggle, FormField 추가. 변형(variant)과 크기(size)를 토큰 기반으로 통합.
- 그림자/테두리 유틸 통합: 반복되는 `border-4`/하드 섀도우를 공용 유틸(`neo-border`, `neo-shadow-*`)로 강제.
- 다크 모드: CSS 변수 기반 `data-theme="dark"` 토글 추가, 고대비 유지.

## UI/UX 개선
- 글로벌 레이아웃: `app/layout.tsx`에서 `Header`/Footer를 포함해 모든 페이지 일관 네비게이션. 중복 헤더 제거(`app/dashboard/page.tsx:54-63`).
- 내비게이션: 교사용 상단 탭(루브릭/세션/결과/템플릿/설정), 모바일에서는 바텀 바.
- 폼 UX: 즉시 검증, 에러 요약, 진행 상태(스켈레톤/로더), 키보드 탐색 강화.
- 학생 제출 흐름: 업로드 진행률/파일 제한/자동 리사이즈, 제출 후 대기 큐 안내(현재 표시 유지하되 가시성 개선).
- 접근성: 색상 대비, `focus-visible` 링, ARIA 라벨, 스크린리더 텍스트 적용(가이드에 맞춰 전면 적용).
- 마이크로카피: 교사용/학생용 텍스트 톤 분리, 행동 유도형 문구로 개선.

## 아키텍처/기능 개선
- 상태관리: 글로벌 UI/세션 상태는 Zustand 사용(의존성 존재). 알림/토스트, 로딩, 테마 토글 등.
- 데이터 계층: 설정은 RTDB 사용 중(`app/dashboard/settings/page.tsx:6-7`). 세션/루브릭/제출은 Firestore로 일원화(보안 규칙 포함).
- API 일관화: 응답 스키마(`{success, data, error}`) 통합, 에러 핸들러/로그 규약. 입력 검증(Zod) 추가.
- AI 연동: `lib/ai/*`를 라우트에서 사용하도록 연결하고 재시도/파서 견고화. BYOK 저장/마스킹은 유지(`app/dashboard/settings/page.tsx:92-96`).
- 업로드: UploadThing 도입 및 24h 삭제 정책 반영. 큰 파일 처리/압축.
- 보안/제한: 인증 가드(HOC/미들웨어), 레이트리미트(서버 라우트), 입력 살균.
- 국제화: i18n 준비(ko 기본, en 확장), 숫자/날짜 포맷.

## 구현 단계
### 1) 디자인 토큰/테마 정비
- CSS 변수 확장 및 Tailwind 테마 매핑.
- 폰트 교체 및 `RootLayout` 적용.
- 플랫 배경/패턴 유틸 도입.

### 2) 공용 컴포넌트 라이브러리화
- Badge/Table/Modal/Toggle/FormField 추가.
- Brutal 컴포넌트 변형/크기 표준화.

### 3) 레이아웃/내비 리팩터링
- `Header`를 글로벌로 적용, 대시보드 헤더 중복 제거.
- 모바일 바텀 내비 추가.

### 4) 페이지 UX 개선
- 루브릭 생성 폼 검증/피드백 강화.
- 학생 제출 업로드 UX 개선(프로그레스/프리뷰/삭제/제약).

### 5) 데이터/API 일원화
- Firestore 컬렉션 스키마 정립 및 보안 규칙.
- API 응답/에러 표준화, Zod 검증.

### 6) 접근성/국제화/성능
- A11y 전면 적용, i18n 도입.
- 이미지 최적화, 섀도우 비용 모바일 완화.

## 우선순위/효과
- 1주: 테마 일관화 + 글로벌 레이아웃 → 즉각적인 브랜드/일관성 향상.
- 2주: 컴포넌트 표준화 + 폼 UX → 생산성/가독성↑, 오류↓.
- 3주: 데이터/API 일원화 → 안정성/확장성↑.

## 참고 코드 위치
- 토큰/유틸: `app/globals.css:7-32, 64-117, 140-167`
- 공용 컴포넌트: `components/shared/BrutalButton.tsx:15-66`, `BrutalCard.tsx:12-53`, `BrutalInput.tsx:16-69`
- 레이아웃/헤더: `app/layout.tsx:2-33`, `components/shared/Header.tsx:11-155`, 중복 헤더 `app/dashboard/page.tsx:54-63`
- 랜딩/학생 배경: `app/page.tsx:7`, `app/student/submit/[sessionCode]/page.tsx:173`
- AI/라우트: `lib/ai/gemini.ts:28-78`, `lib/ai/grok.ts:28-80`, `app/api/rubrics/generate/route.ts:3-95`

## 산출물
- 디자인 토큰/테마 세트, 공용 컴포넌트 추가, 글로벌 레이아웃, UX 개선된 폼/제출 흐름, 표준화된 API/데이터 레이어, A11y 체크리스트 통과.

이 계획대로 진행하여 네오 부루탈리즘 테마를 더 일관되고 견고하게 적용하면서, 전체 UX와 아키텍처 신뢰성을 함께 끌어올리겠습니다.