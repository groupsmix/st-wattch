import { callGroq } from './groq';
import { isGroqConfigured } from './config';
import type { Watch } from '../../data/watches';

export async function generateReviewSummary(
  watch: Watch,
  language: 'en' | 'ar'
): Promise<string> {
  if (!isGroqConfigured()) {
    return getDefaultSummary(watch, language);
  }

  const systemPrompt = language === 'ar'
    ? 'أنت خبير ساعات. لخّص المراجعة في 3-4 نقاط رئيسية. اكتب بأسلوب طبيعي وشخصي. بدون markdown.'
    : 'You are a watch expert. Summarize the review in 3-4 key points. Write naturally and personally. No markdown.';

  const reviewExcerpt = watch.fullReview ? watch.fullReview.substring(0, 400) : '';

  const prompt = language === 'ar'
    ? `لخّص مراجعة ${watch.brand} ${watch.name} ($${watch.price}):
المميزات: ${watch.pros.join('، ')}
العيوب: ${watch.cons.join('، ')}
التقييم: ${watch.rating}/5
المراجعة: ${reviewExcerpt}

أعطني ملخص سريع في 3-4 نقاط بأسلوب شخصي ومباشر.`
    : `Summarize this ${watch.brand} ${watch.name} review ($${watch.price}):
Pros: ${watch.pros.join(', ')}
Cons: ${watch.cons.join(', ')}
Rating: ${watch.rating}/5
Review: ${reviewExcerpt}

Give me a quick 3-4 point summary in a personal, direct style.`;

  try {
    return await callGroq(prompt, systemPrompt);
  } catch {
    return getDefaultSummary(watch, language);
  }
}

function getDefaultSummary(watch: Watch, language: 'en' | 'ar'): string {
  if (language === 'ar') {
    return `الخلاصة: ${watch.brand} ${watch.name} ساعة ممتازة بسعر $${watch.price}. أبرز ميزة: ${watch.pros[0]}. أكبر عيب: ${watch.cons[0]}. التقييم: ${watch.rating}/5.`;
  }
  return `Bottom line: The ${watch.brand} ${watch.name} is a solid pick at $${watch.price}. Best thing about it? ${watch.pros[0]}. Biggest gripe: ${watch.cons[0]}. Overall: ${watch.rating}/5.`;
}
