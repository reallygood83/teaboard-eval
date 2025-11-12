import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { achievement, subject, grade } = await request.json()

    if (!achievement || !subject || !grade) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      )
    }

    // TODO: 실제 AI API (OpenAI/Gemini) 연동
    // 현재는 Mock 데이터 반환
    const mockRubric = {
      criteria: [
        {
          name: '내용 이해도',
          description: `${subject}의 핵심 개념과 원리를 얼마나 잘 이해했는가`,
          low: '핵심 개념을 이해하지 못하고 오답이 많음',
          medium: '핵심 개념을 부분적으로 이해하고 있음',
          high: '핵심 개념을 정확히 이해하고 설명할 수 있음'
        },
        {
          name: '적용 능력',
          description: '배운 내용을 새로운 상황에 적용할 수 있는가',
          low: '학습한 내용을 전혀 적용하지 못함',
          medium: '간단한 상황에 부분적으로 적용 가능',
          high: '다양한 상황에 창의적으로 적용 가능'
        },
        {
          name: '표현력',
          description: '자신의 생각을 논리적으로 표현할 수 있는가',
          low: '표현이 불명확하고 논리성이 부족함',
          medium: '기본적인 표현은 가능하나 논리성이 약함',
          high: '명확하고 논리적으로 자신의 생각을 표현함'
        },
        {
          name: '창의성',
          description: '문제 해결에 창의적인 접근을 시도하는가',
          low: '단순하고 획일적인 접근만 시도함',
          medium: '기본적인 수준의 창의적 시도가 보임',
          high: '독창적이고 다양한 관점에서 접근함'
        }
      ],
      generatedAt: new Date().toISOString(),
      metadata: {
        achievement,
        subject,
        grade
      }
    }

    // 실제 구현 시 OpenAI API 호출 예시:
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `당신은 ${grade} ${subject} 교육 전문가입니다. 주어진 성취기준에 맞는 평가 루브릭을 생성해주세요.`
          },
          {
            role: 'user',
            content: `성취기준: ${achievement}\n\n위 성취기준을 평가할 수 있는 루브릭을 4가지 평가 기준으로 만들어주세요. 각 기준은 하/중/상 3단계로 구분해주세요.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    const aiData = await response.json()
    const rubric = JSON.parse(aiData.choices[0].message.content)
    */

    return NextResponse.json({
      success: true,
      rubric: mockRubric
    })
  } catch (error) {
    console.error('Error generating rubric:', error)
    return NextResponse.json(
      { error: '루브릭 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
