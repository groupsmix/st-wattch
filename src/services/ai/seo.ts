import { callGroq } from './groq';
import { isGroqConfigured } from './config';

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

export async function generateSEO(
  watchName: string,
  brand: string,
  category: string,
  price: number,
  language: 'en' | 'ar'
): Promise<SEOData> {
  if (!isGroqConfigured()) {
    return getDefaultSEO(watchName, brand, category, price, language);
  }

  const systemPrompt = language === 'ar'
    ? 'أنت خبير SEO. أعد بيانات SEO بصيغة JSON فقط. بدون أي نص إضافي.'
    : 'You are an SEO expert. Return SEO data in JSON format only. No extra text.';

  const prompt = language === 'ar'
    ? `ولّد بيانات SEO لمراجعة ساعة: ${brand} ${watchName}، الفئة: ${category}، السعر: $${price}.
أرجع JSON بهذا الشكل: {"title":"...","description":"...","keywords":["..."],"ogTitle":"...","ogDescription":"..."}`
    : `Generate SEO data for a watch review: ${brand} ${watchName}, Category: ${category}, Price: $${price}.
Return JSON like: {"title":"...","description":"...","keywords":["..."],"ogTitle":"...","ogDescription":"..."}`;

  try {
    const result = await callGroq(prompt, systemPrompt);
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as SEOData;
    }
  } catch {
    // Fall back to defaults
  }

  return getDefaultSEO(watchName, brand, category, price, language);
}

function getDefaultSEO(
  watchName: string,
  brand: string,
  category: string,
  price: number,
  language: 'en' | 'ar'
): SEOData {
  if (language === 'ar') {
    return {
      title: `مراجعة ${brand} ${watchName} - هل تستحق الشراء؟ | WristNerd`,
      description: `مراجعة شاملة لساعة ${brand} ${watchName} من فئة ${category} بسعر $${price}. اكتشف المميزات والعيوب وأفضل سعر.`,
      keywords: [brand, watchName, 'مراجعة ساعة', category, 'ساعات بأسعار معقولة'],
      ogTitle: `مراجعة ${brand} ${watchName} | WristNerd`,
      ogDescription: `مراجعة شاملة ومقارنة أسعار لساعة ${brand} ${watchName}`,
    };
  }

  return {
    title: `${brand} ${watchName} Review - Worth It in 2026? | WristNerd`,
    description: `In-depth ${brand} ${watchName} review. ${category} watch at $${price}. Pros, cons, specs, and where to buy at the best price.`,
    keywords: [brand, watchName, 'watch review', category, 'affordable watches', `best watches under $${Math.ceil(price / 100) * 100}`],
    ogTitle: `${brand} ${watchName} Review | WristNerd`,
    ogDescription: `Honest review and price comparison for the ${brand} ${watchName}`,
  };
}

export async function generateAltText(
  imageSrc: string,
  watchName: string,
  brand: string,
  context?: string
): Promise<string> {
  if (!isGroqConfigured()) {
    return `${brand} ${watchName}${context ? ` - ${context}` : ''}`;
  }

  try {
    const result = await callGroq(
      `Generate a concise, SEO-friendly alt text (max 125 characters) for an image of the ${brand} ${watchName} watch.${context ? ` Context: ${context}.` : ''} Image URL for reference: ${imageSrc}. Return only the alt text, nothing else.`,
      'You are an SEO expert specializing in image optimization. Return only the alt text.'
    );
    return result.trim().replace(/^["']|["']$/g, '');
  } catch {
    return `${brand} ${watchName}${context ? ` - ${context}` : ''}`;
  }
}
