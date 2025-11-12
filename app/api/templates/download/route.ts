import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { format } = await request.json()

    if (format !== 'pdf' && format !== 'docx') {
      return NextResponse.json(
        { error: '잘못된 형식입니다. pdf 또는 docx만 지원됩니다.' },
        { status: 400 }
      )
    }

    // HTML 템플릿 생성
    const htmlContent = generateTemplateHTML()

    if (format === 'pdf') {
      // PDF 생성 (향후 puppeteer 또는 jsPDF 사용)
      // 현재는 HTML을 직접 반환 (브라우저 인쇄 기능 사용)
      const htmlBlob = new Blob([htmlContent], { type: 'text/html' })

      return new NextResponse(htmlBlob, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': 'attachment; filename="평가지_템플릿_AI친화적.html"'
        }
      })
    } else {
      // DOCX 생성 (향후 docx 라이브러리 사용)
      // 현재는 HTML을 직접 반환 (워드에서 열 수 있도록)
      const htmlBlob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })

      return new NextResponse(htmlBlob, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': 'attachment; filename="평가지_템플릿_AI친화적.doc"'
        }
      })
    }
  } catch (error) {
    console.error('템플릿 생성 오류:', error)
    return NextResponse.json(
      { error: '템플릿 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

function generateTemplateHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>평가지 템플릿 - AI 친화적</title>
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }

    @media print {
      body {
        width: 210mm;
        height: 297mm;
        margin: 0;
        padding: 20mm;
      }
    }

    body {
      font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
      font-size: 14pt;
      line-height: 1.6;
      max-width: 210mm;
      margin: 0 auto;
      padding: 20mm;
      background: white;
    }

    h1 {
      text-align: center;
      font-size: 24pt;
      font-weight: bold;
      margin: 20px 0 30px 0;
      text-transform: uppercase;
      border-bottom: 4px solid black;
      padding-bottom: 10px;
    }

    .student-info {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
      border: 2px solid black;
    }

    .student-info td {
      border: 1px solid black;
      padding: 12px;
      font-weight: bold;
    }

    .student-info .label {
      background-color: #f0f0f0;
      text-align: center;
      width: 80px;
      font-weight: 900;
    }

    .question-box {
      border: 2px solid black;
      margin-bottom: 20px;
      page-break-inside: avoid;
    }

    .question-header {
      background-color: #f5f5f5;
      border-bottom: 2px solid black;
      padding: 12px;
      font-weight: bold;
      font-size: 16pt;
    }

    .answer-area {
      padding: 20px;
      min-height: 150px;
      line-height: 2.0;
    }

    .instructions {
      background-color: #fffacd;
      border: 2px solid #ffd700;
      padding: 15px;
      margin-bottom: 20px;
      font-size: 12pt;
    }

    .instructions strong {
      font-weight: 900;
    }
  </style>
</head>
<body>
  <!-- 학생 정보 입력란 -->
  <table class="student-info">
    <tr>
      <td class="label">학년</td>
      <td style="width: 100px;"></td>
      <td class="label">반</td>
      <td style="width: 100px;"></td>
      <td class="label">번호</td>
      <td style="width: 100px;"></td>
    </tr>
    <tr>
      <td class="label">이름</td>
      <td colspan="5"></td>
    </tr>
  </table>

  <!-- 제목 -->
  <h1>평가지 제목을 입력하세요</h1>

  <!-- 사용 안내 -->
  <div class="instructions">
    <strong>💡 AI 인식 향상 팁:</strong>
    <ul style="margin: 10px 0 0 20px;">
      <li>답안은 <strong>검은색 펜</strong>으로 또렷하게 작성해주세요</li>
      <li>글씨는 <strong>네모 칸 안</strong>에 정자로 써주세요</li>
      <li>사진 촬영 시 <strong>조명이 밝은 곳</strong>에서 정면으로 찍어주세요</li>
    </ul>
  </div>

  <!-- 문제 1 -->
  <div class="question-box">
    <div class="question-header">
      1. 문제 내용을 입력하세요
    </div>
    <div class="answer-area">
      <!-- 답안 작성 영역 -->
    </div>
  </div>

  <!-- 문제 2 -->
  <div class="question-box">
    <div class="question-header">
      2. 문제 내용을 입력하세요
    </div>
    <div class="answer-area">
      <!-- 답안 작성 영역 -->
    </div>
  </div>

  <!-- 문제 3 -->
  <div class="question-box">
    <div class="question-header">
      3. 문제 내용을 입력하세요
    </div>
    <div class="answer-area">
      <!-- 답안 작성 영역 -->
    </div>
  </div>

  <!-- 문제 4 -->
  <div class="question-box">
    <div class="question-header">
      4. 문제 내용을 입력하세요
    </div>
    <div class="answer-area">
      <!-- 답안 작성 영역 -->
    </div>
  </div>

  <!-- 문제 5 -->
  <div class="question-box">
    <div class="question-header">
      5. 문제 내용을 입력하세요
    </div>
    <div class="answer-area">
      <!-- 답안 작성 영역 -->
    </div>
  </div>

  <div style="margin-top: 30px; padding: 15px; border: 2px solid #4CAF50; background-color: #f0fff0;">
    <p style="margin: 0; font-weight: bold; text-align: center;">
      📸 작성 완료 후 TeaBoard에 사진을 업로드하면 AI가 자동으로 채점합니다!
    </p>
  </div>
</body>
</html>`
}
