from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
import re
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="WristNerd AI API")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# ============ WATCHES DATA ============
WATCHES = [
    {
        "id": "seiko-presage-srpb41",
        "name": "Seiko Presage SRPB41",
        "nameAr": "سيكو بريساج SRPB41",
        "brand": "Seiko",
        "brandAr": "سيكو",
        "category": "dress",
        "categoryAr": "رسمية",
        "price": 295,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=600",
        "heroImage": "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=1200",
        "movement": "Automatic (4R35)",
        "caseDiameter": "40.5mm",
        "waterResistance": "50m",
        "crystal": "Hardlex",
        "caseMaterial": "Stainless Steel",
        "bracelet": "Leather Strap",
        "powerReserve": "41 hours",
        "description": "The Seiko Presage SRPB41 is a stunning dress watch that punches well above its price point. Its cocktail-time dial features a mesmerizing sunburst pattern inspired by the Starlight cocktail, creating a dial that shifts between deep blue and purple depending on the light. The 4R35 automatic movement is reliable and hackable, while the exhibition caseback lets you admire the decorated rotor. At under $300, this is one of the best-looking dress watches money can buy.",
        "descriptionAr": "ساعة سيكو بريساج SRPB41 هي ساعة رسمية مذهلة تتفوق على فئتها السعرية. يتميز ميناؤها بنمط أشعة الشمس المستوحى من كوكتيل ستارلايت، مما يخلق ميناءً يتغير بين الأزرق الداكن والأرجواني حسب الضوء.",
        "pros": ["Stunning cocktail-time dial", "Excellent value for money", "Reliable 4R35 movement", "Exhibition caseback"],
        "cons": ["Hardlex crystal (not sapphire)", "Only 50m water resistance", "Leather strap quality could be better"],
        "affiliateLinks": {"amazon": "https://www.amazon.com/dp/B074P4B6C2", "jomashop": "https://www.jomashop.com/seiko-presage-srpb41.html"},
        "tags": ["dress", "cocktail", "automatic", "blue dial", "under 300", "best value"]
    },
    {
        "id": "orient-bambino-v2",
        "name": "Orient Bambino V2",
        "nameAr": "اورينت بامبينو V2",
        "brand": "Orient",
        "brandAr": "اورينت",
        "category": "dress",
        "categoryAr": "رسمية",
        "price": 130,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
        "heroImage": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200",
        "movement": "Automatic (F6722)",
        "caseDiameter": "40.5mm",
        "waterResistance": "30m",
        "crystal": "Mineral",
        "caseMaterial": "Stainless Steel",
        "bracelet": "Leather Strap",
        "powerReserve": "40 hours",
        "description": "The Orient Bambino Version 2 is the quintessential affordable dress watch. With its clean, minimalist dial featuring Roman numerals and a domed mineral crystal that creates a beautiful vintage aesthetic, it's hard to believe this watch costs around $130. The in-house F6722 automatic movement is smooth and reliable. This is the perfect first automatic watch for anyone entering the hobby.",
        "descriptionAr": "ساعة اورينت بامبينو V2 هي الساعة الرسمية المثالية بسعر معقول. بميناؤها النظيف مع أرقام رومانية وكريستال معدني مقبب يخلق جمالية عتيقة رائعة.",
        "pros": ["Incredible value under $150", "In-house automatic movement", "Beautiful domed crystal", "Classic design"],
        "cons": ["Only 30m water resistance", "No hacking/hand-winding", "Mineral crystal scratches easily"],
        "affiliateLinks": {"amazon": "https://www.amazon.com/dp/B01MTS5BFN", "jomashop": "https://www.jomashop.com/orient-bambino-v2.html"},
        "tags": ["dress", "vintage", "automatic", "roman numerals", "under 150", "best value", "first watch"]
    },
    {
        "id": "seiko-skx007",
        "name": "Seiko SKX007",
        "nameAr": "سيكو SKX007",
        "brand": "Seiko",
        "brandAr": "سيكو",
        "category": "dive",
        "categoryAr": "غوص",
        "price": 350,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600",
        "heroImage": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=1200",
        "movement": "Automatic (7S26)",
        "caseDiameter": "42mm",
        "waterResistance": "200m",
        "crystal": "Hardlex",
        "caseMaterial": "Stainless Steel",
        "bracelet": "Jubilee Bracelet",
        "powerReserve": "41 hours",
        "description": "The Seiko SKX007 is perhaps the most iconic affordable dive watch ever made. Discontinued in 2021, it has achieved legendary status among watch enthusiasts. The 200m water resistance, reliable 7S26 movement, and iconic pepsi bezel make it a true tool watch. Its lume is exceptional, and it's one of the most mod-friendly watches in existence with thousands of aftermarket parts available.",
        "descriptionAr": "ساعة سيكو SKX007 هي ربما أكثر ساعة غوص بأسعار معقولة شهرة على الإطلاق. توقف إنتاجها في 2021، وحققت مكانة أسطورية بين عشاق الساعات.",
        "pros": ["Legendary status & heritage", "200m water resistance", "Exceptional lume", "Highly moddable"],
        "cons": ["Discontinued (prices rising)", "No hacking/hand-winding", "Hardlex crystal"],
        "affiliateLinks": {"amazon": "https://www.amazon.com/dp/B001TNR174", "jomashop": "https://www.jomashop.com/seiko-skx007.html"},
        "tags": ["dive", "iconic", "automatic", "tool watch", "pepsi bezel", "discontinued", "legend"]
    },
    {
        "id": "tissot-prx-powermatic",
        "name": "Tissot PRX Powermatic 80",
        "nameAr": "تيسو PRX باورماتيك 80",
        "brand": "Tissot",
        "brandAr": "تيسو",
        "category": "luxury",
        "categoryAr": "فاخرة",
        "price": 650,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600",
        "heroImage": "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=1200",
        "movement": "Automatic (Powermatic 80)",
        "caseDiameter": "40mm",
        "waterResistance": "100m",
        "crystal": "Sapphire",
        "caseMaterial": "Stainless Steel",
        "bracelet": "Integrated Bracelet",
        "powerReserve": "80 hours",
        "description": "The Tissot PRX Powermatic 80 brings luxury sports watch aesthetics to an accessible price point. With its integrated bracelet design reminiscent of the Audemars Piguet Royal Oak, sapphire crystal, and impressive 80-hour power reserve, this watch offers Swiss made quality with serious style credentials. The waffle dial texture adds depth, and the overall finishing is exceptional for the price.",
        "descriptionAr": "ساعة تيسو PRX باورماتيك 80 تقدم جمالية ساعات الرياضة الفاخرة بسعر معقول. بتصميم سوارها المدمج المشابه لأوديمار بيغه رويال أوك وكريستال ياقوتي واحتياطي طاقة 80 ساعة.",
        "pros": ["80-hour power reserve", "Sapphire crystal", "Integrated bracelet design", "Swiss Made quality"],
        "cons": ["Thick for its size", "Clasp could be better", "Limited strap options due to integrated design"],
        "affiliateLinks": {"amazon": "https://www.amazon.com/dp/B09GRFTTMT", "jomashop": "https://www.jomashop.com/tissot-prx-powermatic.html"},
        "tags": ["luxury sports", "integrated bracelet", "automatic", "sapphire", "swiss made", "under 700"]
    },
    {
        "id": "casio-gshock-ga2100",
        "name": "Casio G-Shock GA-2100",
        "nameAr": "كاسيو جي شوك GA-2100",
        "brand": "Casio",
        "brandAr": "كاسيو",
        "category": "sport",
        "categoryAr": "رياضية",
        "price": 99,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600",
        "heroImage": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1200",
        "movement": "Quartz (Module 5611)",
        "caseDiameter": "45.4mm",
        "waterResistance": "200m",
        "crystal": "Mineral",
        "caseMaterial": "Carbon Core Guard",
        "bracelet": "Resin Strap",
        "powerReserve": "3 years (battery)",
        "description": "The Casio G-Shock GA-2100, nicknamed the 'CasiOak' for its octagonal bezel reminiscent of the Audemars Piguet Royal Oak, is one of the thinnest and most stylish G-Shocks ever made. At just 11.8mm thick, it wears comfortably on any wrist. It features G-Shock's legendary toughness with 200m water resistance, shock resistance, and a carbon core guard structure.",
        "descriptionAr": "ساعة كاسيو جي شوك GA-2100 الملقبة بـ 'كاسي أوك' بسبب إطارها المثمن المشابه لأوديمار بيغه رويال أوك، هي واحدة من أنحف وأكثر ساعات جي شوك أناقة.",
        "pros": ["Incredibly affordable", "Slim for a G-Shock", "200m water resistance", "Carbon core guard"],
        "cons": ["No Bluetooth", "LED light (not super bright)", "Analog hands can be hard to read at night"],
        "affiliateLinks": {"amazon": "https://www.amazon.com/dp/B083YZR3YZ", "jomashop": "https://www.jomashop.com/casio-gshock-ga2100.html"},
        "tags": ["sport", "tough", "quartz", "casioak", "under 100", "slim", "everyday"]
    },
    {
        "id": "hamilton-khaki-field",
        "name": "Hamilton Khaki Field Mechanical",
        "nameAr": "هاميلتون خاكي فيلد ميكانيكية",
        "brand": "Hamilton",
        "brandAr": "هاميلتون",
        "category": "field",
        "categoryAr": "ميدانية",
        "price": 475,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600",
        "heroImage": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=1200",
        "movement": "Hand-wind (H-50)",
        "caseDiameter": "38mm",
        "waterResistance": "50m",
        "crystal": "Sapphire",
        "caseMaterial": "Stainless Steel",
        "bracelet": "NATO/Leather Strap",
        "powerReserve": "80 hours",
        "description": "The Hamilton Khaki Field Mechanical is a direct descendant of the watches Hamilton supplied to the US military. The H-50 hand-wound movement offers an impressive 80-hour power reserve, and the 38mm case size is perfect for most wrists. The sandwich dial with its luminous numerals pays homage to vintage military watches while maintaining a modern feel. This is the definitive field watch under $500.",
        "descriptionAr": "ساعة هاميلتون خاكي فيلد الميكانيكية هي سليلة مباشرة للساعات التي قدمتها هاميلتون للجيش الأمريكي. حركة H-50 اليدوية توفر احتياطي طاقة 80 ساعة مثيرة للإعجاب.",
        "pros": ["80-hour power reserve", "Military heritage", "Perfect 38mm size", "Sapphire crystal"],
        "cons": ["Only 50m water resistance", "Hand-wind only (no automatic)", "No date complication"],
        "affiliateLinks": {"amazon": "https://www.amazon.com/dp/B07LBFDDMJ", "jomashop": "https://www.jomashop.com/hamilton-khaki-field.html"},
        "tags": ["field", "military", "hand-wind", "sapphire", "swiss made", "under 500", "heritage"]
    },
    {
        "id": "omega-seamaster-300",
        "name": "Omega Seamaster Diver 300M",
        "nameAr": "أوميغا سيماستر دايفر 300م",
        "brand": "Omega",
        "brandAr": "أوميغا",
        "category": "luxury",
        "categoryAr": "فاخرة",
        "price": 5200,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600",
        "heroImage": "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200",
        "movement": "Automatic (Co-Axial 8800)",
        "caseDiameter": "42mm",
        "waterResistance": "300m",
        "crystal": "Sapphire",
        "caseMaterial": "Stainless Steel",
        "bracelet": "Steel Bracelet",
        "powerReserve": "55 hours",
        "description": "The Omega Seamaster Diver 300M is one of the most recognizable luxury dive watches in the world, famously worn by James Bond. The Co-Axial Master Chronometer 8800 movement is METAS certified, resistant to magnetic fields up to 15,000 gauss. The wave-pattern ceramic dial, helium escape valve, and 300m water resistance make this a serious tool watch with luxury finishing.",
        "descriptionAr": "ساعة أوميغا سيماستر دايفر 300م هي واحدة من أكثر ساعات الغوص الفاخرة شهرة في العالم، ارتبطت بجيمس بوند. حركة Co-Axial Master Chronometer 8800 معتمدة من METAS.",
        "pros": ["METAS certified movement", "300m water resistance", "Iconic Bond watch", "Ceramic bezel and dial"],
        "cons": ["High price point", "42mm may be large for some", "Bracelet clasp could be improved"],
        "affiliateLinks": {"amazon": "https://www.amazon.com/dp/B07V3JLRQH", "jomashop": "https://www.jomashop.com/omega-seamaster-300m.html"},
        "tags": ["luxury", "dive", "automatic", "james bond", "ceramic", "swiss made", "coaxial", "master chronometer"]
    },
    {
        "id": "citizen-promaster-diver",
        "name": "Citizen Promaster Diver BN0151",
        "nameAr": "سيتيزن برومستر دايفر BN0151",
        "brand": "Citizen",
        "brandAr": "سيتيزن",
        "category": "dive",
        "categoryAr": "غوص",
        "price": 180,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1509941943102-10c232535736?w=600",
        "heroImage": "https://images.unsplash.com/photo-1509941943102-10c232535736?w=1200",
        "movement": "Eco-Drive (Solar)",
        "caseDiameter": "42mm",
        "waterResistance": "200m",
        "crystal": "Mineral",
        "caseMaterial": "Stainless Steel",
        "bracelet": "Rubber Strap",
        "powerReserve": "6 months (dark)",
        "description": "The Citizen Promaster Diver BN0151 is the ultimate grab-and-go dive watch. Powered by Citizen's Eco-Drive solar technology, you never need to worry about batteries or winding. It charges from any light source and holds a charge for up to 6 months in complete darkness. With ISO-compliant 200m water resistance and a unidirectional bezel, this is a legitimate dive watch at a remarkable price.",
        "descriptionAr": "ساعة سيتيزن برومستر دايفر BN0151 هي ساعة الغوص المثالية للاستخدام اليومي. تعمل بتقنية إيكو درايف الشمسية، فلا تحتاج أبداً للقلق بشأن البطاريات أو التعبئة.",
        "pros": ["Never needs a battery (Eco-Drive)", "ISO-compliant diver", "200m water resistance", "Excellent value"],
        "cons": ["Mineral crystal (not sapphire)", "Quartz movement (not mechanical)", "Rubber strap can be stiff initially"],
        "affiliateLinks": {"amazon": "https://www.amazon.com/dp/B016R90V8O", "jomashop": "https://www.jomashop.com/citizen-promaster-bn0151.html"},
        "tags": ["dive", "solar", "eco-drive", "tool watch", "under 200", "no battery", "everyday"]
    }
]


def get_watch_context() -> str:
    context = "Available watches in our database:\n\n"
    for w in WATCHES:
        context += f"- {w['name']} ({w['brand']}): ${w['price']}, {w['category']} watch, rated {w['rating']}/5\n"
        context += f"  Movement: {w['movement']}, Case: {w['caseDiameter']}, WR: {w['waterResistance']}\n"
        context += f"  Pros: {', '.join(w['pros'])}\n"
        context += f"  Cons: {', '.join(w['cons'])}\n"
        context += f"  Tags: {', '.join(w['tags'])}\n\n"
    return context


def get_ai_client():
    api_key = os.getenv("OPENAI_API_KEY", "")
    if not api_key:
        return None
    from openai import OpenAI
    return OpenAI(api_key=api_key)


def generate_ai_response(system_prompt: str, user_prompt: str, fallback: str) -> str:
    client = get_ai_client()
    if client is None:
        return fallback
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        return response.choices[0].message.content or fallback
    except Exception as e:
        print(f"AI Error: {e}")
        return fallback


# ============ MODELS ============

class ChatMessage(BaseModel):
    message: str
    language: str = "en"

class CompareRequest(BaseModel):
    watch1_id: str
    watch2_id: str
    language: str = "en"

class SummaryRequest(BaseModel):
    watch_id: str
    language: str = "en"

class SearchRequest(BaseModel):
    query: str
    language: str = "en"

class RecommendationRequest(BaseModel):
    viewed_watch_ids: list[str]
    language: str = "en"


# ============ ENDPOINTS ============

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}


@app.get("/api/watches")
async def get_watches():
    return {"watches": WATCHES}


@app.get("/api/watches/{watch_id}")
async def get_watch(watch_id: str):
    for w in WATCHES:
        if w["id"] == watch_id:
            return {"watch": w}
    raise HTTPException(status_code=404, detail="Watch not found")


@app.post("/api/ai/chat")
async def ai_chat(req: ChatMessage):
    watch_context = get_watch_context()
    lang_instruction = "IMPORTANT: Respond in Arabic." if req.language == "ar" else ""

    system_prompt = f"""You are WristNerd's AI Watch Advisor - a knowledgeable, friendly watch consultant.
You help users find the perfect watch based on their needs, budget, and preferences.
{watch_context}
Guidelines:
- Be conversational and enthusiastic about watches
- Recommend watches from our database when possible
- Mention specific watch names, prices, and key features
- Keep responses concise (2-4 paragraphs max)
{lang_instruction}"""

    fallback_en = """Based on our collection, here are my recommendations:

**Dress watches:** The **Seiko Presage SRPB41** ($295) has a stunning cocktail-time dial, or the **Orient Bambino V2** ($130) for incredible value.

**Dive watches:** The legendary **Seiko SKX007** ($350) or the solar-powered **Citizen Promaster** ($180).

**Everyday wear:** The **Casio G-Shock GA-2100** ($99) is nearly indestructible, or the **Tissot PRX** ($650) for luxury sports style.

What's your budget and style preference? I can narrow it down!"""

    fallback_ar = """بناءً على مجموعتنا، إليك أفضل توصياتي:

**للساعات الرسمية:** ساعة **سيكو بريساج SRPB41** (295$) بميناؤها المذهل، أو **اورينت بامبينو V2** (130$) لقيمة لا تُضاهى.

**لساعات الغوص:** الأسطورية **سيكو SKX007** (350$) أو **سيتيزن برومستر** (180$) بالطاقة الشمسية.

**للاستخدام اليومي:** **كاسيو جي شوك GA-2100** (99$) شبه غير قابلة للتدمير، أو **تيسو PRX** (650$) بأسلوب رياضي فاخر.

ما ميزانيتك وذوقك المفضل؟"""

    fallback = fallback_ar if req.language == "ar" else fallback_en
    response = generate_ai_response(system_prompt, req.message, fallback)
    return {"response": response}


@app.post("/api/ai/compare")
async def ai_compare(req: CompareRequest):
    watch1 = next((w for w in WATCHES if w["id"] == req.watch1_id), None)
    watch2 = next((w for w in WATCHES if w["id"] == req.watch2_id), None)
    if not watch1 or not watch2:
        raise HTTPException(status_code=404, detail="Watch not found")

    lang_instruction = "IMPORTANT: Respond entirely in Arabic." if req.language == "ar" else ""
    system_prompt = f"""You are a professional watch reviewer. Generate a detailed comparison.
Sections: 1. Overview 2. Movement & Performance 3. Design 4. Value 5. Who Should Buy Which 6. Verdict
{lang_instruction}"""

    user_prompt = f"""Compare:
Watch 1: {watch1['name']} - ${watch1['price']}, {watch1['movement']}, {watch1['caseDiameter']}, {watch1['waterResistance']} WR, {watch1['crystal']}, {watch1['powerReserve']}
Pros: {', '.join(watch1['pros'])} | Cons: {', '.join(watch1['cons'])}

Watch 2: {watch2['name']} - ${watch2['price']}, {watch2['movement']}, {watch2['caseDiameter']}, {watch2['waterResistance']} WR, {watch2['crystal']}, {watch2['powerReserve']}
Pros: {', '.join(watch2['pros'])} | Cons: {', '.join(watch2['cons'])}"""

    n1 = watch1.get('nameAr', watch1['name']) if req.language == "ar" else watch1['name']
    n2 = watch2.get('nameAr', watch2['name']) if req.language == "ar" else watch2['name']
    fallback = f"""## {n1} vs {n2}

### {'نظرة عامة' if req.language == 'ar' else 'Overview'}
{n1} (${watch1['price']}) vs {n2} (${watch2['price']}).

### {'الحركة' if req.language == 'ar' else 'Movement'}
- **{n1}**: {watch1['movement']}, {watch1['powerReserve']}
- **{n2}**: {watch2['movement']}, {watch2['powerReserve']}

### {'التصميم' if req.language == 'ar' else 'Design'}
- **{n1}**: {watch1['caseDiameter']}, {watch1['crystal']}, {watch1['waterResistance']}
- **{n2}**: {watch2['caseDiameter']}, {watch2['crystal']}, {watch2['waterResistance']}

### {'القيمة' if req.language == 'ar' else 'Value'}
{'فرق السعر' if req.language == 'ar' else 'Price difference'}: ${abs(watch1['price'] - watch2['price'])}

### {'الحكم' if req.language == 'ar' else 'Verdict'}
{'كلتا الساعتين خيار ممتاز.' if req.language == 'ar' else 'Both are excellent choices in their class.'}"""

    response = generate_ai_response(system_prompt, user_prompt, fallback)
    return {"comparison": response, "watch1": watch1, "watch2": watch2}


@app.post("/api/ai/summary")
async def ai_summary(req: SummaryRequest):
    watch = next((w for w in WATCHES if w["id"] == req.watch_id), None)
    if not watch:
        raise HTTPException(status_code=404, detail="Watch not found")

    lang_instruction = "IMPORTANT: Respond in Arabic." if req.language == "ar" else ""
    system_prompt = f"""You are a watch review expert. Generate a concise summary:
- 3-4 bullet points of key takeaways
- Who this watch is perfect for
- Who should look elsewhere
{lang_instruction}"""

    user_prompt = f"""{watch['name']} by {watch['brand']} - ${watch['price']}, {watch['category']}, {watch['rating']}/5
{watch['movement']}, {watch['caseDiameter']}, {watch['waterResistance']} WR, {watch['crystal']}
Pros: {', '.join(watch['pros'])} | Cons: {', '.join(watch['cons'])}
Review: {watch['description']}"""

    if req.language == "ar":
        fallback = f"""### ملخص سريع بالذكاء الاصطناعي
- **التقييم**: {watch['rating']}/5 — {watch.get('categoryAr', watch['category'])} بسعر ${watch['price']}
- **أبرز المميزات**: {', '.join(watch['pros'][:2])}
- **أبرز العيوب**: {', '.join(watch['cons'][:2])}
- **الحركة**: {watch['movement']} — {watch['powerReserve']}

**مثالية لـ**: من يبحث عن ساعة {watch.get('categoryAr', watch['category'])} موثوقة.
**ليست مناسبة لـ**: من يحتاج مقاومة ماء عالية أو كريستال ياقوتي."""
    else:
        fallback = f"""### AI Quick Summary
- **Rating**: {watch['rating']}/5 — {watch['category'].title()} watch at ${watch['price']}
- **Top Pros**: {', '.join(watch['pros'][:2])}
- **Top Cons**: {', '.join(watch['cons'][:2])}
- **Movement**: {watch['movement']} — {watch['powerReserve']}

**Perfect for**: Anyone seeking a reliable {watch['category']} watch with excellent value.
**Look elsewhere if**: You need higher water resistance or sapphire crystal."""

    response = generate_ai_response(system_prompt, user_prompt, fallback)
    return {"summary": response, "watch": watch}


@app.post("/api/ai/search")
async def ai_search(req: SearchRequest):
    watch_context = get_watch_context()
    system_prompt = f"""You are a watch search engine. Return ONLY a JSON array of matching watch IDs ordered by relevance.
{watch_context}
Example: ["seiko-skx007", "citizen-promaster-diver"]
If no matches: []"""

    query_lower = req.query.lower()
    matched_ids: list[tuple[str, int]] = []
    for w in WATCHES:
        searchable = f"{w['name']} {w['brand']} {w['category']} {' '.join(w['tags'])} {w['description']} {w.get('nameAr', '')} {w.get('brandAr', '')} {w.get('categoryAr', '')} {w.get('descriptionAr', '')}".lower()
        score = 0
        for word in query_lower.split():
            if len(word) > 2 and word in searchable:
                score += 1

        price_match = re.search(r'(\d+)', req.query)
        if price_match and any(kw in query_lower for kw in ["under", "below", "تحت", "أقل"]):
            target_price = int(price_match.group(1))
            if w['price'] <= target_price:
                score += 3

        category_map = {
            "dive": ["dive", "diving", "diver", "swim", "water", "غوص", "سباحة"],
            "dress": ["dress", "formal", "elegant", "classy", "رسمية", "أنيقة"],
            "sport": ["sport", "sporty", "tough", "rugged", "رياضية"],
            "field": ["field", "military", "outdoor", "ميدانية", "عسكرية"],
            "luxury": ["luxury", "premium", "high-end", "expensive", "فاخرة"],
        }
        for cat, keywords in category_map.items():
            if any(kw in query_lower for kw in keywords):
                if w['category'] == cat:
                    score += 5
        if score > 0:
            matched_ids.append((w['id'], score))

    matched_ids.sort(key=lambda x: x[1], reverse=True)
    fallback_ids = [mid[0] for mid in matched_ids]

    client = get_ai_client()
    if client:
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "system", "content": system_prompt}, {"role": "user", "content": req.query}],
                max_tokens=200, temperature=0.3
            )
            content = response.choices[0].message.content or "[]"
            match = re.search(r'\[.*?\]', content, re.DOTALL)
            if match:
                result_ids = json.loads(match.group())
                valid_ids = [wid for wid in result_ids if any(w['id'] == wid for w in WATCHES)]
                if valid_ids:
                    fallback_ids = valid_ids
        except Exception as e:
            print(f"AI Search Error: {e}")

    results = []
    for wid in fallback_ids:
        for w in WATCHES:
            if w['id'] == wid:
                results.append(w)
                break
    return {"results": results, "query": req.query}


@app.post("/api/ai/recommendations")
async def ai_recommendations(req: RecommendationRequest):
    viewed_watches = [w for w in WATCHES if w['id'] in req.viewed_watch_ids]
    if not viewed_watches:
        sorted_watches = sorted(WATCHES, key=lambda w: w['rating'], reverse=True)
        return {"recommendations": sorted_watches[:4], "reason": "Top rated watches" if req.language == "en" else "أعلى الساعات تقييماً"}

    viewed_categories = [w['category'] for w in viewed_watches]
    viewed_brands = [w['brand'] for w in viewed_watches]
    avg_price = sum(w['price'] for w in viewed_watches) / len(viewed_watches)
    viewed_ids = set(req.viewed_watch_ids)

    scored = []
    for w in WATCHES:
        if w['id'] in viewed_ids:
            continue
        score = 0.0
        if w['category'] in viewed_categories:
            score += 3
        if w['brand'] in viewed_brands:
            score += 2
        price_diff = abs(w['price'] - avg_price)
        if price_diff < 100:
            score += 3
        elif price_diff < 300:
            score += 1
        score += w['rating']
        scored.append((w, score))

    scored.sort(key=lambda x: x[1], reverse=True)
    recommendations = [s[0] for s in scored[:4]]
    if req.language == "ar":
        reason = f"بناءً على اهتمامك بساعات {', '.join(set(w.get('categoryAr', w['category']) for w in viewed_watches))}"
    else:
        reason = f"Based on your interest in {', '.join(set(w['category'] for w in viewed_watches))} watches"
    return {"recommendations": recommendations, "reason": reason}
