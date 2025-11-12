# 🎓 TeaBoard Eval Lab

> **교사 데이터 주권을 위한 독립형 AI 평가 플랫폼**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-latest-orange?logo=firebase)](https://firebase.google.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)](https://ui.shadcn.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

---

## 📌 프로젝트 개요

**TeaBoard Eval Lab**은 에듀테크 대기업의 데이터 독점에서 벗어나, **교사가 평가 데이터를 100% 소유**하고 **AI로 평가 기준을 자동 생성**하는 혁신적인 교육 플랫폼입니다.

### 🎯 핵심 가치

| 가치 | 설명 |
|------|------|
| **📊 데이터 주권** | 모든 평가 데이터를 교사 Firebase 계정에 100% 저장 |
| **🔑 BYOK** | Grok API 키 직접 입력으로 투명한 운영 |
| **🔒 개인정보 보호** | 학생 사진 24시간 자동 삭제 (UploadThing) |
| **🤖 AI 자동 생성** | 성취기준 + 평가 취지 → 3/4단계 루브릭 자동 생성 |
| **💾 완전한 소유** | CSV/JSON 내보내기로 데이터 완전 소유 |

---

## ✨ 주요 기능

### 교사 기능
- ✅ **AI 루브릭 생성기**: 성취기준과 평가 취지만 입력하면 자동으로 3/4단계 루브릭 + 배점 + 세부 기준 생성
- ✅ **학급 관리**: 생성/삭제/이름 변경
- ✅ **학생 관리**: 추가/삭제/이름 수정
- ✅ **평가 세션 생성**: 제목, 마감일, 루브릭 설정
- ✅ **실시간 대시보드**: 제출 목록, 사진 미리보기, 결과 확인
- ✅ **결과 공유**: 교사 확인 후 학생에게 공개
- ✅ **데이터 내보내기**: CSV/JSON 다운로드

### 학생 기능
- ✅ **간편 접속**: 세션 코드로 링크 접속 (로그인 불필요)
- ✅ **사진 업로드**: 손글씨 평가지 1장 제출
- ✅ **결과 확인**: 공유된 경우만 점수 + 단계 + 피드백 조회

---

## 🛠️ 기술 스택

### Frontend
- **Next.js 14** - App Router, SSR, API Routes
- **React 18** - UI 컴포넌트
- **TypeScript 5** - 타입 안정성
- **Tailwind CSS 3** - 유틸리티 CSS
- **shadcn/ui** - UI 컴포넌트 라이브러리
- **Radix UI** - Headless UI Primitives

### Backend
- **Firebase Auth** - 교사 인증 (이메일/Google)
- **Firestore** - NoSQL 데이터베이스
- **Vercel Serverless** - API Functions
- **UploadThing** - 파일 업로드 (24h 자동 삭제)

### AI/ML
- **Grok API** - 루브릭 생성, 손글씨 평가
- **BYOK** - 교사 직접 API 키 입력

### Design System
- **Neo-Brutalism** - 굵은 테두리, Hard Shadow, 강렬한 색상

---

## 🚀 빠른 시작

### 사전 요구사항
- Node.js 18.17+
- npm 9.0+
- Firebase 계정
- Grok API 키 (무료 월 100회)

### 1. 프로젝트 클론

```bash
git clone https://github.com/yourusername/teaboard-eval.git
cd teaboard-eval
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일 생성:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# UploadThing
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 📚 문서

| 문서 | 설명 |
|------|------|
| [**DEVELOPMENT_SPEC.md**](./DEVELOPMENT_SPEC.md) | 완전한 개발 스펙 및 아키텍처 |
| [**DESIGN_SYSTEM.md**](./DESIGN_SYSTEM.md) | Neo-Brutalism 디자인 시스템 |
| [**SHADCN_MCP_GUIDE.md**](./SHADCN_MCP_GUIDE.md) | shadcn/ui MCP 활용 가이드 |
| [**QUICKSTART.md**](./QUICKSTART.md) | 30분 환경 구축 가이드 |

---

## 🎨 디자인 시스템

### Neo-Brutalism 특징
- ✅ 굵은 검은색 테두리 (4-6px)
- ✅ Hard Shadow (8px_8px_0px_0px)
- ✅ 직각 모서리 (rounded-none)
- ✅ 강렬한 색상 조합
- ✅ 플랫 디자인

### 컬러 팔레트

| 색상 | 용도 | Hex |
|------|------|-----|
| **Primary** | 신뢰감, 주요 버튼 | #2563EB |
| **Secondary** | 에너지, CTA | #F97316 |
| **Accent** | 성공, 긍정 | #22C55E |
| **Warning** | 주의, 대기 | #FBBF24 |
| **Error** | 오류, 거부 | #EF4444 |

---

## 📁 프로젝트 구조

```
teaboard-eval/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── classes/
│   │   ├── students/
│   │   ├── sessions/
│   │   └── settings/
│   ├── s/[shortCode]/          # 학생 제출
│   ├── results/[submissionId]/  # 학생 결과
│   └── api/
│       ├── sessions/
│       ├── rubric/
│       ├── submit/
│       └── export/
├── components/
│   ├── ui/                      # shadcn/ui
│   ├── auth/
│   ├── dashboard/
│   ├── sessions/
│   └── shared/
├── lib/
│   ├── firebase/
│   ├── grok/
│   └── uploadthing/
├── styles/
│   ├── globals.css
│   └── neo-brutalism.css
└── public/
```

---

## 🔥 핵심 워크플로우

### 1. AI 루브릭 생성

```
교사 입력:
- 성취기준: "글씨가 바르고 예쁘게 쓴다"
- 평가 취지: "글씨의 크기, 간격, 획의 부드러움을 평가"
- 단계 수: 4단계

↓ Grok API 호출

AI 자동 생성:
- 탁월 (100점): 크기 일정, 간격 균일, 획 부드러움
- 우수 (85점): 크기 약간 불균일, 획 부드러움
- 보통 (70점): 크기/간격 불균일, 읽기 가능
- 미흡 (50점): 크기/간격 매우 불균일, 읽기 어려움

+ 프롬프트 자동 생성 (Grok 채점용)
```

### 2. 학생 제출 및 자동 채점

```
학생:
1. 링크 접속 (eval.teaboard.kr/s/ABC123)
2. 이름 입력 + 사진 업로드 (UploadThing)
3. 제출 완료

↓ Grok Vision API 호출

자동 채점:
- 점수: 85점
- 단계: "우수"
- 피드백: "글씨 크기가 대체로 일정하나..."

↓ Firestore 저장 (visibleToStudent: false)

교사:
- 대시보드에서 결과 확인
- 검토 후 "공유" 버튼 클릭

학생:
- 결과 페이지에서 점수/피드백 확인
```

---

## 🔒 개인정보 보호

| 항목 | 정책 |
|------|------|
| **학생 사진** | UploadThing에 24시간 저장 후 자동 삭제 |
| **평가 데이터** | 교사 Firebase 계정에만 저장 |
| **기업 접근** | 0 - 중간 서버 없음 |
| **GDPR/KCPC** | 사진 임시 저장, 결과 텍스트만 보관 |

---

## 🚀 배포

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Firebase 배포 (Firestore Rules)

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# Firebase 로그인
firebase login

# Firestore 규칙 배포
firebase deploy --only firestore:rules
```

---

## 🧪 테스트

### 단위 테스트

```bash
npm test
```

### E2E 테스트

```bash
npm run test:e2e
```

---

## 🗺️ 로드맵

### v0.1 - MVP (2주)
- [x] Firebase Auth 연동
- [x] AI 루브릭 생성기
- [x] 학생 제출 페이지
- [x] 교사 대시보드

### v1.0 - 공유 기능 (1주)
- [ ] 결과 공유 기능
- [ ] CSV/JSON 내보내기
- [ ] BYOK 설정 페이지
- [ ] 실시간 업데이트

### v2.0 - UX 개선 (1주)
- [ ] 성장 그래프
- [ ] 다중 파일 업로드
- [ ] 세션 복제
- [ ] 모바일 최적화

### v3.0 - 고급 기능 (미정)
- [ ] 오프라인 동기화 (PWA)
- [ ] 다국어 지원
- [ ] 협업 기능
- [ ] 오픈소스 공개

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포하세요.

---

## 👤 개발자

**안양 박달초 김문정**
- GitHub: [@reallygood83](https://github.com/reallygood83)
- Email: teacher@example.com

---

## 🙏 감사의 글

- [shadcn/ui](https://ui.shadcn.com/) - 아름다운 UI 컴포넌트
- [Firebase](https://firebase.google.com/) - 백엔드 인프라
- [Grok](https://x.ai/) - AI 평가 엔진
- [UploadThing](https://uploadthing.com/) - 파일 업로드
- [Vercel](https://vercel.com/) - 배포 플랫폼

---

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면:
- GitHub Issues: [Create Issue](https://github.com/yourusername/teaboard-eval/issues)
- Email: teacher@example.com

---

**Made with ❤️ for Teachers by Teachers**
