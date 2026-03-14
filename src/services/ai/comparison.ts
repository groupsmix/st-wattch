import { callGeminiStream } from './gemini';
import { getHumanizerPrompt } from './humanizer';
import type { Watch } from '../../data/watches';

export async function generateAIComparison(
  watch1: Watch,
  watch2: Watch,
  language: 'en' | 'ar',
  onChunk: (text: string) => void
): Promise<string> {
  const humanizer = getHumanizerPrompt(language);

  const systemPrompt = language === 'ar'
    ? `${humanizer}

أنت خبير مقارنة ساعات. اكتب مقارنة مفصلة وشخصية بين ساعتين. لا تستخدم markdown.
اكتب بأسلوب محادثاتي طبيعي مع تجارب شخصية. قسّم المقارنة إلى:
1. انطباع أول
2. التصميم والبناء
3. الدقة والحركة
4. الراحة
5. القيمة مقابل السعر
6. الحكم النهائي - لمن تناسب كل ساعة`
    : `${humanizer}

You are a watch comparison expert. Write a detailed, personal comparison between two watches. Do NOT use markdown formatting.
Write in a natural, conversational style with personal experiences. Structure the comparison as:
1. First Impressions
2. Design & Build
3. Movement & Accuracy
4. Comfort & Wearability
5. Value for Money
6. Final Verdict - who should buy which`;

  const prompt = language === 'ar'
    ? `قارن بين هاتين الساعتين:

الساعة 1: ${watch1.brand} ${watch1.name}
السعر: $${watch1.price} | الفئة: ${watch1.category} | التقييم: ${watch1.rating}/5
المواصفات: ${JSON.stringify(watch1.specifications)}
المميزات: ${watch1.pros.join('، ')}
العيوب: ${watch1.cons.join('، ')}

الساعة 2: ${watch2.brand} ${watch2.name}
السعر: $${watch2.price} | الفئة: ${watch2.category} | التقييم: ${watch2.rating}/5
المواصفات: ${JSON.stringify(watch2.specifications)}
المميزات: ${watch2.pros.join('، ')}
العيوب: ${watch2.cons.join('، ')}

اكتب مقارنة طبيعية وشخصية (600-800 كلمة).`
    : `Compare these two watches:

Watch 1: ${watch1.brand} ${watch1.name}
Price: $${watch1.price} | Category: ${watch1.category} | Rating: ${watch1.rating}/5
Specs: ${JSON.stringify(watch1.specifications)}
Pros: ${watch1.pros.join(', ')}
Cons: ${watch1.cons.join(', ')}

Watch 2: ${watch2.brand} ${watch2.name}
Price: $${watch2.price} | Category: ${watch2.category} | Rating: ${watch2.rating}/5
Specs: ${JSON.stringify(watch2.specifications)}
Pros: ${watch2.pros.join(', ')}
Cons: ${watch2.cons.join(', ')}

Write a natural, personal comparison (600-800 words).`;

  return callGeminiStream(prompt, systemPrompt, onChunk);
}
