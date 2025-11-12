````
# Teaboard Eval Lab - 완전한 SaaS 기획 및 개발 문서 (하나의 .md 파일)

> **목표**  
> **에듀테크 대기업의 데이터 독점에서 벗어나, 교사들이 ‘자신의 평가 데이터’를 100% 소유**하는 **독립형 AI 평가 플랫폼**  
> **핵심 가치**: **교사 주권**, **데이터 주권**, **BYOK**, **개인정보 보호**, **AI 기반 평가기준 자동 생성**

---

## 1. 서비스 개요

| 항목 | 내용 |
|------|------|
| **서비스명** | **Teaboard Eval Lab** |
| **도메인** | `eval.teaboard.link`
| **타겟** | 초등 교사 (전국 확장 가능) |
| **핵심 가치** | - **데이터 주권** – 교사가 모든 평가 데이터 소유<br>- **BYOK** – Grok API 키 직접 입력<br>- **개인정보 보호** – 사진 24시간 자동 삭제<br>- **AI 자동 생성** – 성취기준 + 평가 취지 입력 → **3/4단계 루브릭 + 배점 + 세부 기준 자동 생성** |
| **배포** | Vercel + GitHub (무료) |
| **DB** | Firebase Firestore + Auth |
| **파일 저장** | UploadThing (24시간 자동 삭제) |

---

## 2. 기획 의도 (왜 만들어야 하는가?)

### 문제 인식
- **에듀테크 기업**은 평가 데이터(손글씨, 피드백, 성장 기록)를 수집 → **교사는 도구 사용자**로 전락  
- **학생 데이터**는 기업 서버에 **영구 저장** → **재사용 불가**, **서비스 종료 시 소실 위험**  
- **교사는 데이터 주권 없음** → **자신의 교육 철학을 데이터로 축적 불가**  
- **평가 기준 작성 부담** → 교사가 **성취기준, 루브릭, 배점**을 일일이 작성해야 함 → 시간 소모

### 해결책
> **Teaboard Eval Lab은 교사가 ‘데이터의 주인’이자 ‘평가 설계의 주인’이 되는 플랫폼**  
- 평가 세션, 기준, 결과 → **교사 Firebase 계정에 100% 저장**  
- 기업 중간 없이 **직접 Grok API 호출**  
- **학생 사진은 24시간 후 자동 삭제** → 개인정보 0리스크  
- **AI 루브릭 생성기** → 교사가 **‘성취기준 + 평가 취지’만 입력** → **3단계 또는 4단계 루브릭 + 배점 + 세부 기준 자동 생성**  
- **CSV/JSON 내보내기** → 교사가 **데이터 완전 소유**  
- **→ 교사가 자신의 교육 철학을 데이터로 축적, 재사용, 공유 가능**

---

## 3. 사용자 흐름 (워크플로우)

```mermaid
graph TD
    A[교사: Firebase 로그인] --> B[학급 생성]
    B --> C[학생 추가/삭제]
    C --> D[평가 세션 생성]
    D --> E[성취기준 + 평가 취지 입력]
    E --> F[AI 루브릭 생성기 실행<br>→ 3/4단계 루브릭 + 배점 자동 생성]
    F --> G[교사: 루브릭 검토/수정]
    G --> H[프롬프트 자동 생성 → 저장]
    H --> I[고유 링크 생성 → 카톡/클래스룸 배포]
    I --> J[학생: 링크 접속 → 사진 업로드]
    J --> K[Grok 4 Fast API 호출 (BYOK)]
    K --> L[자동 채점 → Firestore 저장<br>visibleToStudent: false]
    L --> M[교사 대시보드: 결과 확인]
    M --> N{교사: 공유?}
    N -- 예 --> O[visibleToStudent: true<br>학생 결과 페이지 공개]
    N -- 아니오 --> P[비공개 유지]
````

---

## 4. 데이터 모델 (Firestore)

ts

```
// users (교사 전용)
users: {
  uid: string,
  email: string,
  displayName: string,
  grokApiKey: string,        // BYOK 저장 (암호화 권장)
  createdAt: timestamp
}

// classes
classes: {
  id: string,
  name: string,
  teacherId: string,
  createdAt: timestamp
}

// students
students: {
  id: string,
  classId: string,
  name: string,
  createdAt: timestamp
}

// evaluation_sessions
sessions: {
  id: string,
  classId: string,
  title: string,
  deadline: timestamp,
  criteria: {
    achievement: string,           // 성취기준 (입력)
    purpose: string,               // 평가 취지 (입력)
    rubricLevels: 3 | 4,           // 3단계 또는 4단계 (선택)
    rubric: {                      // ★ AI 자동 생성
      [level: string]: {
        description: string,       // 단계별 설명
        score: number              // 배점
      }
    },
    prompt: string                 // Grok에게 줄 최종 지침 (AI 생성 + 교사 수정 가능)
  },
  shortCode: string,               // e.g., ABC123
  createdAt: timestamp
}

// submissions
submissions: {
  id: string,
  sessionId: string,
  studentName: string,             // 학생 계정 없음 → 이름만
  imageUrl: string,                // UploadThing 24h URL
  result: {
    score: number,
    level: string,                 // e.g., "우수", "보통"
    feedback: string,
    details: object
  },
  visibleToStudent: boolean,       // ★ 교사만 먼저 조회
  sharedAt: timestamp | null,
  submittedAt: timestamp
}
```

---

## 5. 핵심 기능

### 교사 기능

|기능|설명|
|---|---|
|**학급 관리**|생성/삭제/이름 변경|
|**학생 관리**|추가/삭제/이름 수정|
|**평가 세션 생성**|제목, 마감일|
|**AI 루브릭 생성기**|**입력**: 성취기준 + 평가 취지 + 단계 수 (3/4) **출력**: 3/4단계 루브릭 + 배점 + 세부 설명 **교사**: 검토/수정 가능|
|**프롬프트 자동 생성**|루브릭 기반 → Grok 채점용 프롬프트 자동 생성|
|**BYOK 설정**|Grok API 키 입력 → Firestore 저장|
|**대시보드**|실시간 제출 목록, 사진 미리보기, 결과, **공유 버튼**|
|**데이터 내보내기**|CSV/JSON 다운로드 (자신의 데이터 100% 소유)|

### 학생 기능

|기능|설명|
|---|---|
|**링크 접속**|eval.teaboard.kr/s/ABC123|
|**사진 업로드**|1장 (손글씨 평가지)|
|**제출 완료**|“교사 확인 후 피드백 드릴게요~”|
|**결과 확인**|공유된 경우만 → 점수 + 단계 + 피드백|

---

## 6. AI 루브릭 생성기 (핵심 신기능)

### 입력 예시 (교사)

text

```
성취기준: 글씨가 바르고 예쁘게 쓴다.
평가 취지: 글씨의 크기, 간격, 획의 부드러움을 종합적으로 평가하여 쓰기 습관 형성.
단계 수: 4단계
```

### 출력 예시 (Grok 4 Fast 생성)

json

```
{
  "rubricLevels": 4,
  "rubric": {
    "탁월": {
      "description": "글씨 크기 일정, 간격 균일, 획 부드럽고 연결 자연스러움",
      "score": 100
    },
    "우수": {
      "description": "크기 약간 불균일하나 획은 부드러움, 간격 대부분 균일",
      "score": 85
    },
    "보통": {
      "description": "크기/간격 불균일하나 읽기 가능, 획 약간 끊김",
      "score": 70
    },
    "미흡": {
      "description": "크기/간격 매우 불균일, 획 끊김 심함, 읽기 어려움",
      "score": 50
    }
  },
  "prompt": "다음 손글씨 사진을 평가하세요. 성취기준: 글씨가 바르고 예쁘게 쓴다. 4단계 루브릭: 탁월(100점): 글씨 크기 일정... (이하 생략). 학생 이름: {{studentName}}. JSON 형식으로 반환: {level, score, feedback}"
}
```

---

## 7. BYOK 시스템 (Grok API 키)

- **설정 위치**: /settings 페이지
- **저장 위치**: users/{uid}.grokApiKey (Firestore)
- **무료 사용자 지원**:
    - **2025-11-21까지**: **무제한 무료**
    - **이후**: **월 100회 무료** (공식 문서)
- **안내 문구**:
    
    > “Grok 무료 사용자도 월 100회 사용 가능합니다. (2025-11-21까지 무제한)”
    

---

## 8. 개인정보 보호 정책

|항목|정책|
|---|---|
|**학생 사진**|UploadThing → **24시간 후 자동 삭제**|
|**평가 데이터**|**교사 Firebase 계정에만 저장**|
|**기업 접근**|**0** – 중간 서버 없음|
|**GDPR/KCPC 준수**|사진 임시 저장, 결과 텍스트만 보관|

---

## 9. 기술 스택

|레이어|도구|
|---|---|
|**프론트엔드**|Next.js 14 + React + Tailwind CSS|
|**백엔드**|Vercel Serverless Functions|
|**데이터베이스**|Firebase Firestore + Auth|
|**파일 저장**|UploadThing (24h 자동 삭제)|
|**인증**|Firebase Auth (이메일 + Google)|
|**배포**|Vercel + GitHub|

---

## 10. Firestore 보안 규칙 (Security Rules)

js

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 교사 전용 컬렉션: users, classes, students, sessions
    match /{document=**} {
      allow read, write: if request.auth != null 
        && get(/databases/$$ (database)/documents/users/ $$(request.auth.uid)).data.isTeacher == true;
    }

    // submissions: 학생 제출 허용, 교사만 읽기/수정
    match /submissions/{subId} {
      allow create: if true; // 학생 제출 허용
      allow read: if 
        request.auth != null 
        && get(/databases/$$ (database)/documents/sessions/ $$(resource.data.sessionId)).data.teacherId == request.auth.uid
        || resource.data.visibleToStudent == true;
      allow update: if request.auth != null 
        && get(/databases/$$ (database)/documents/sessions/ $$(resource.data.sessionId)).data.teacherId == request.auth.uid;
    }
  }
}
```

---

## 11. 핵심 API 엔드포인트 (Vercel Functions)

|경로|메서드|설명|
|---|---|---|
|/api/create-session|POST|평가 세션 생성 + shortCode 발급|
|/api/generate-rubric|POST|**AI 루브릭 생성기** (성취기준 + 취지 → 루브릭)|
|/api/submit|POST|학생 사진 제출 + Grok 호출|
|/api/share-result|POST|교사가 결과 공유|
|/api/export-csv|GET|학급/세션별 데이터 내보내기|

---

## 12. 배포 체크리스트

1. Firebase 프로젝트 생성 → Auth (이메일/Google), Firestore 활성화
2. Vercel + GitHub 연동 → Next.js 템플릿 생성
3. firebase.config.ts 설정 (서비스 계정 키)
4. UploadThing 가입 → API 키 발급
5. api/ 폴더에 generate-rubric.ts, submit.ts, share.ts 구현
6. pages/create-session.tsx → AI 루브릭 생성 UI
7. pages/settings.tsx → BYOK 입력 폼
8. vercel --prod 배포
9. 도메인 연결 → eval.teaboard.kr

---

## 13. 로드맵

|버전|목표|
|---|---|
|**v0.1**|MVP – AI 루브릭 생성 + 1개 평가 세션|
|**v1.0**|공유 기능 + 교사 대시보드 + CSV 내보내기|
|**v2.0**|성장 그래프 + 다중 파일 지원|
|**v3.0**|오프라인 동기화 + PWA + 오픈소스 공개|

---

## 14. Claude Code에게 요청할 작업 예시

> “위 기획 문서를 기반으로 다음을 작성해줘:
> 
> 1. api/generate-rubric.ts – 성취기준 + 취지 입력 → 3/4단계 루브릭 JSON 생성
> 2. pages/create-session.tsx – AI 루브릭 생성 UI + 프롬프트 자동 생성
> 3. pages/dashboard.tsx – 교사 대시보드 (제출 목록 + 공유 버튼)
> 4. api/submit.ts – 학생 제출 + Grok 호출 + Firestore 저장
> 5. lib/firebase.ts – 초기화 및 보안 규칙 적용
> 6. components/BYOKSettings.tsx – API 키 입력 폼”

---

## 결론: **Teaboard Eval Lab은 ‘교사 데이터 주권 + 평가 설계 혁명’이다.**

> **“내 학생의 손글씨, 내 평가 기준, 내 피드백 – 모두 내가 소유한다.”** **Teaboard Eval Lab은 에듀테크의 ‘종속’이 아닌, 교사의 ‘자율’을 위한 도구다.** **AI가 루브릭을 만들면, 교사는 교육에 집중한다.**