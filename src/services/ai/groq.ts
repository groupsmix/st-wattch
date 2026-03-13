import { AI_CONFIG, isGroqConfigured } from './config';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function callGroq(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  if (!isGroqConfigured()) {
    throw new Error('Groq API key not configured. Set VITE_GROQ_API_KEY in .env');
  }

  const { apiKey, model, baseUrl, maxTokens, temperature } = AI_CONFIG.groq;

  const messages: GroqMessage[] = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errorText}`);
  }

  const data: GroqResponse = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function callGroqStream(
  prompt: string,
  systemPrompt: string,
  onChunk: (text: string) => void
): Promise<string> {
  if (!isGroqConfigured()) {
    throw new Error('Groq API key not configured');
  }

  const { apiKey, model, baseUrl, maxTokens, temperature } = AI_CONFIG.groq;

  const messages: GroqMessage[] = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq stream error (${response.status})`);
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
      if (line.startsWith('data: ') && line !== 'data: [DONE]') {
        try {
          const json = JSON.parse(line.slice(6));
          const delta = json.choices?.[0]?.delta?.content || '';
          if (delta) {
            fullText += delta;
            onChunk(fullText);
          }
        } catch {
          // Skip malformed chunks
        }
      }
    }
  }

  return fullText;
}
