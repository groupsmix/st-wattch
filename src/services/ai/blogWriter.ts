import { callGeminiStream } from './gemini';
import { getHumanizerPrompt, postProcessHumanize } from './humanizer';

export interface BlogArticle {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

export async function generateBlogArticle(
  topic: string,
  language: 'en' | 'ar',
  onChunk: (text: string) => void
): Promise<string> {
  const humanizer = getHumanizerPrompt(language);

  const systemPrompt = language === 'ar'
    ? `${humanizer}

أنت كاتب مقالات ساعات محترف. اكتب مقالات SEO عالية الجودة بأسلوب طبيعي 100%.
القواعد:
- اكتب 800-1200 كلمة
- أسلوب محادثاتي وشخصي
- لا تستخدم markdown أبداً
- ابدأ بمقدمة تجذب القارئ
- أضف تجارب شخصية وقصص
- اختم بنصيحة عملية
- لا تكتب "في هذا المقال سنتحدث عن" - ابدأ مباشرة بشيء مثير`
    : `${humanizer}

You are a professional watch article writer. Write high-quality SEO articles that are 100% natural-sounding.
Rules:
- Write 800-1200 words
- Conversational, personal style
- NEVER use markdown formatting
- Start with a hook that grabs the reader
- Include personal anecdotes and stories
- End with practical advice
- Don't write "In this article we'll discuss" - start directly with something engaging
- Use subheadings naturally within the text (just bold the text or make it a new paragraph)`;

  const prompt = language === 'ar'
    ? `اكتب مقالاً عن: ${topic}\n\nاكتب بأسلوب طبيعي كأنك إنسان حقيقي يشارك تجربته.`
    : `Write an article about: ${topic}\n\nWrite naturally as if you're a real person sharing their experience.`;

  const result = await callGeminiStream(prompt, systemPrompt, (chunk) => {
    onChunk(postProcessHumanize(chunk, language));
  });

  return postProcessHumanize(result, language);
}

export const BLOG_TOPICS_EN = [
  'How to Choose Your First Automatic Watch: A Beginner\'s Guide',
  'Seiko vs Orient: Which Budget Brand is Actually Better?',
  '7 Watch Mistakes Every Beginner Makes (And How to Avoid Them)',
  'Why the Casio F-91W is the Most Important Watch Ever Made',
  'The Complete Guide to Watch Water Resistance Ratings',
  'Best Watch Straps Under $30 That Transform Any Watch',
  'How to Build a 3-Watch Collection on a $500 Budget',
  'Sapphire vs Mineral vs Hardlex Crystal: What\'s the Difference?',
  'The Rise of Microbrands: Are They Worth Your Money?',
  'Watch Movements Explained: Quartz vs Automatic vs Manual',
];

export const BLOG_TOPICS_AR = [
  'كيف تختار أول ساعة أوتوماتيكية: دليل المبتدئين',
  'سيكو ضد أورينت: أيهما الأفضل فعلاً؟',
  '7 أخطاء يرتكبها كل مبتدئ في عالم الساعات',
  'لماذا كاسيو F-91W هي أهم ساعة صُنعت على الإطلاق',
  'الدليل الشامل لتصنيفات مقاومة الماء في الساعات',
  'أفضل أحزمة ساعات تحت 30 دولار تحول أي ساعة',
  'كيف تبني مجموعة من 3 ساعات بميزانية 500 دولار',
  'الفرق بين كريستال الياقوت والمعدني والهاردلكس',
  'صعود العلامات التجارية الصغيرة: هل تستحق أموالك؟',
  'حركات الساعات: الفرق بين الكوارتز والأوتوماتيك واليدوي',
];
