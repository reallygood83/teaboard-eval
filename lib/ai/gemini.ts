// Gemini API Integration

export interface GeminiEvaluationRequest {
  question: string
  answer: string
  rubric: {
    criteria: Array<{
      name: string
      description: string
      low: string
      medium: string
      high: string
    }>
  }
  studentName: string
}

export interface GeminiEvaluationResponse {
  scores: Array<{
    criterion: string
    level: 'low' | 'medium' | 'high'
    feedback: string
  }>
  overallFeedback: string
  evaluatedAt: string
}

export async function evaluateWithGemini(
  apiKey: string,
  request: GeminiEvaluationRequest
): Promise<GeminiEvaluationResponse> {
  // Build the evaluation prompt
  const prompt = buildEvaluationPrompt(request)

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    // Parse the JSON response
    const evaluation = parseEvaluationResponse(generatedText, request)

    return {
      ...evaluation,
      evaluatedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error('Gemini evaluation error:', error)
    throw error
  }
}

function buildEvaluationPrompt(request: GeminiEvaluationRequest): string {
  const criteriaText = request.rubric.criteria.map((c, index) => {
    return `
평가 기준 ${index + 1}: ${c.name}
설명: ${c.description}
- 하 (low): ${c.low}
- 중 (medium): ${c.medium}
- 상 (high): ${c.high}
`
  }).join('\n')

  return `당신은 교육 평가 전문가입니다. 다음 학생의 답변을 주어진 루브릭 기준으로 평가해주세요.

평가 질문:
${request.question}

학생 답변 (${request.studentName}):
${request.answer}

평가 기준 (루브릭):
${criteriaText}

다음 JSON 형식으로 정확히 응답해주세요:
{
  "scores": [
    {
      "criterion": "평가기준명",
      "level": "low" | "medium" | "high",
      "feedback": "구체적인 피드백 (2-3문장)"
    }
  ],
  "overallFeedback": "전체적인 평가와 격려 (3-4문장)"
}

중요: JSON 형식만 반환하고, 다른 텍스트는 포함하지 마세요.`
}

function parseEvaluationResponse(
  text: string,
  request: GeminiEvaluationRequest
): Omit<GeminiEvaluationResponse, 'evaluatedAt'> {
  try {
    // Remove markdown code blocks if present
    let cleanedText = text.trim()
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '')
    }

    const parsed = JSON.parse(cleanedText)
    return {
      scores: parsed.scores || [],
      overallFeedback: parsed.overallFeedback || '평가가 완료되었습니다.'
    }
  } catch (error) {
    console.error('Failed to parse Gemini response:', error)
    console.error('Raw text:', text)

    // Fallback: create a basic evaluation
    return {
      scores: request.rubric.criteria.map(c => ({
        criterion: c.name,
        level: 'medium' as const,
        feedback: `${c.name}에 대한 평가가 필요합니다.`
      })),
      overallFeedback: '답변을 제출해 주셔서 감사합니다. 더 구체적인 평가를 위해 교사 선생님의 확인이 필요합니다.'
    }
  }
}
