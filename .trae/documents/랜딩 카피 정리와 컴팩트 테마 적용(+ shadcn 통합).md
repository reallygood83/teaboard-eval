## 목표
- 랜딩/마케팅 영역의 장황한 설명을 제거하고 핵심 요소만 남깁니다.
- 네오 브루탈리즘 톤은 유지하되 색·요소 수를 축소해 시선 흐름을 명확히 합니다.
- shadcn/ui로 기본 UI를 표준화해 깔끔하고 컴팩트한 테마를 구현합니다.

## 변경 범위
- app/page.tsx:
  - Hero를 "브랜드 헤딩 + 한 줄 서브 + 단일 CTA"로 재구성하고 나머지 설명 섹션 삭제.
  - 3-기능 카드 영역은 한 줄로 압축(아이콘+라벨만) 또는 제거.
  - 섹션 제거 대상: "AI가 선생님의 업무를…"(58–63), 기능 카드 본문(70–92), "3단계로…"(101–107), Step 1–3(116–146), "선생님들이 TEABOARD를…" 섹션(156–180), "지금 바로 시작하세요" 블록(188–200), 푸터 장문 카피(208–215).
  - CTA는 `GoogleSignInButton` 하나만 노출하고 보조 버튼은 하단으로 이동 또는 삭제.
- components/shared/Header.tsx:
  - 로고 하위 서브레이블("Eval Lab")를 축약 또는 제거, 우측 로그인/회원가입 간격 정리.
- components/auth/GoogleSignInButton.tsx:
  - 라벨을 짧게(예: "Google로 시작하기") 유지, 보조 설명 제거.
- app/layout.tsx:
  - `container` 폭, 기본 여백 통일. 기존 폰트(헤딩/본문) 유지.

## shadcn/ui 통합
- 레지스트리 확인: 프로젝트에 `@shadcn` 등록됨.
- 추가할 컴포넌트: `button`, `card`, `separator`, `badge`, `alert`.
- 추가 커맨드:
  - `npx shadcn@latest add @shadcn/button @shadcn/card @shadcn/separator @shadcn/badge @shadcn/alert`
- 사용 지침:
  - Hero CTA: shadcn `button`으로 기본/outline 변형만 사용.
  - 정보 구분: `separator`로 섹션 경계만 간결히 표시.
  - 작은 강조: `badge`를 숫자/상태에만 제한적으로 적용.
  - 알림: `alert`로 로그인 실패 등 피드백만 최소 노출.
  - 카드: 필요 시 한 줄 3개 정렬로 아이콘+라벨만 배치(본문 문장 없음).

## 디자인 가이드(컴팩트)
- 팔레트: `Primary #FFCC00`, `Text #000`, `Neutral #F8F8F8`, `Accent #00C2FF`.
- 그리드: `max-w-[1024px]`, 공통 `gap-6`, 카드 섀도우 오프셋 6–8px.
- 타이포: 헤딩 대문자 유지, 본문 `line-height: 1.7`, 문장 수 최소화.
- 접근성: `:focus-visible` 굵은 링, 색 대비 WCAG 준수.
- 반응형: 모바일에서 하드 섀도우 깊이 축소 또는 비활성화.

## 구현 단계
1) shadcn 컴포넌트 추가 및 import paths 정리.
2) app/page.tsx에서 불필요 섹션 제거, Hero/CTA만 남기고 레이아웃 재정렬.
3) Header/CTA 간격 및 포커스 스타일 정리.
4) 배경/그리드/간격 토큰 적용으로 일관화.
5) 모바일 뷰 섀도우/여백 튜닝.

## 완료 기준
- 랜딩은 Hero+단일 CTA 중심으로 구성되고 장문 설명이 사라짐.
- 요소·색 수가 줄어들어 첫인상과 행동 유도(CTA)가 명확해짐.
- 빌드/린트 통과, 접근성 포커스와 대비 확인.

## 참고 코드 위치
- 히어로/카피: `app/page.tsx`(13–21, 31–50 등)
- 제거 대상 섹션 라인: `app/page.tsx`(58–63, 70–92, 101–107, 116–146, 156–180, 188–200, 208–215)
- 헤더: `components/shared/Header.tsx`
- CTA: `components/auth/GoogleSignInButton.tsx`

## 후속
- 변경 후 즉시 푸시: lint/build → 커밋 → GitHub 원격 푸시.

승인해 주시면 바로 적용하고 테스트/푸시까지 원샷으로 진행하겠습니다.