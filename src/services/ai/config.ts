// AI Configuration - Free tier API keys
// Gemini Flash: 15 RPM, 1500 req/day (free)
// Groq (Llama 3.3): 30 RPM, 14400 req/day (free)

export const AI_CONFIG = {
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
    model: 'gemini-2.0-flash',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    maxTokens: 2048,
    temperature: 0.8,
  },
  groq: {
    apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
    model: 'llama-3.3-70b-versatile',
    baseUrl: 'https://api.groq.com/openai/v1',
    maxTokens: 1024,
    temperature: 0.7,
  },
};

export function isGeminiConfigured(): boolean {
  return AI_CONFIG.gemini.apiKey.length > 0;
}

export function isGroqConfigured(): boolean {
  return AI_CONFIG.groq.apiKey.length > 0;
}

export function isAIConfigured(): boolean {
  return isGeminiConfigured() || isGroqConfigured();
}
