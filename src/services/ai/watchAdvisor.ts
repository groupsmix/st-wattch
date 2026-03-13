import { callGeminiStream } from './gemini';
import { getHumanizerPrompt } from './humanizer';
import { watches } from '../../data/watches';
import type { Watch } from '../../data/watches';

function getWatchContext(): string {
  return watches.map(w =>
    `${w.brand} ${w.name}: $${w.price}, ${w.category}, Rating: ${w.rating}/5, Pros: ${w.pros.join(', ')}, Cons: ${w.cons.join(', ')}`
  ).join('\n');
}

export function getAdvisorSystemPrompt(language: 'en' | 'ar'): string {
  const watchData = getWatchContext();
  const humanizer = getHumanizerPrompt(language);

  if (language === 'ar') {
    return `${humanizer}

أنت مستشار ساعات ذكي لموقع WristNerd. تساعد الزوار في اختيار الساعة المناسبة لهم.

## قاعدة بيانات الساعات المتوفرة:
${watchData}

## قواعد المحادثة:
- اسأل عن الميزانية، المناسبة (رسمية/رياضية/يومية)، وتفضيلات التصميم
- اقترح ساعات من القاعدة أعلاه فقط
- كن ودوداً ومتحمساً
- أجب بإيجاز (3-5 جمل)
- إذا سُئلت عن ساعة غير موجودة في القاعدة، اقترح البديل الأقرب
- استخدم الروابط: [اسم الساعة](/review/slug) لربط المراجعات`;
  }

  return `${humanizer}

You are WristNerd's AI Watch Advisor chatbot. Help visitors find their perfect watch.

## Available Watch Database:
${watchData}

## Conversation Rules:
- Ask about budget, occasion (formal/sport/daily), and design preferences
- Only recommend watches from the database above
- Be friendly, enthusiastic, and conversational
- Keep responses brief (3-5 sentences)
- If asked about a watch not in the database, suggest the closest alternative
- Use links: [watch name](/review/slug) to link to reviews
- If a user is undecided, ask ONE follow-up question to narrow down`;
}

export async function streamAdvisorResponse(
  userMessage: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[],
  language: 'en' | 'ar',
  onChunk: (text: string) => void
): Promise<string> {
  const systemPrompt = getAdvisorSystemPrompt(language);

  const historyText = conversationHistory
    .slice(-6) // Keep last 6 messages for context
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  const prompt = historyText
    ? `Previous conversation:\n${historyText}\n\nUser: ${userMessage}`
    : `User: ${userMessage}`;

  return callGeminiStream(prompt, systemPrompt, onChunk);
}

export function getWatchRecommendations(
  budget: number,
  category?: string
): Watch[] {
  return watches
    .filter(w => {
      const inBudget = w.price <= budget * 1.2;
      const inCategory = !category || w.category.toLowerCase().includes(category.toLowerCase());
      return inBudget && inCategory;
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}
