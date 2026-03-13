import { AI_CONFIG, isGeminiConfigured } from './config';

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

export async function callGemini(prompt: string, systemInstruction?: string): Promise<string> {
  if (!isGeminiConfigured()) {
    throw new Error('Gemini API key not configured. Set VITE_GEMINI_API_KEY in .env');
  }

  const { apiKey, model, baseUrl, maxTokens, temperature } = AI_CONFIG.gemini;

  const body: Record<string, unknown> = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      maxOutputTokens: maxTokens,
      temperature,
    },
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  const response = await fetch(
    `${baseUrl}/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data: GeminiResponse = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export async function callGeminiStream(
  prompt: string,
  systemInstruction: string,
  onChunk: (text: string) => void
): Promise<string> {
  if (!isGeminiConfigured()) {
    throw new Error('Gemini API key not configured');
  }

  const { apiKey, model, baseUrl, maxTokens, temperature } = AI_CONFIG.gemini;

  const body: Record<string, unknown> = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      maxOutputTokens: maxTokens,
      temperature,
    },
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  const response = await fetch(
    `${baseUrl}/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini stream error (${response.status})`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const json = JSON.parse(line.slice(6));
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (text) {
            fullText += text;
            onChunk(fullText);
          }
        } catch {
          // Skip malformed JSON chunks
        }
      }
    }
  }

  return fullText;
}
