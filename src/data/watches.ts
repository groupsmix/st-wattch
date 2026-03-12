export interface Watch {
  id: string;
  name: string;
  brand: string;
  slug: string;
  image: string;
  price: number;
  rating: number;
  ratingCount: number;
  badge?: string;
  category: string;
  shortDescription: string;
  affiliateUrl: string;
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  detailedRatings: { label: string; score: number }[];
  reviewContent: {
    designBuild: string;
    movementAccuracy: string;
    comfortWearability: string;
    valueForMoney: string;
    whoIsItFor: string;
  };
  faq: { question: string; answer: string }[];
  whereToBuy: { store: string; price: string; url: string }[];
}

export interface ReviewArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  { name: "Luxury Watches", slug: "luxury", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80", count: 45 },
  { name: "Dive Watches", slug: "dive", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80", count: 32 },
  { name: "Dress Watches", slug: "dress", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80", count: 28 },
  { name: "Smartwatches", slug: "smart", image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&q=80", count: 24 },
  { name: "Pilot Watches", slug: "pilot", image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&q=80", count: 18 },
  { name: "Chronographs", slug: "chronograph", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80", count: 35 },
  { name: "Budget Under $100", slug: "budget-100", image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80", count: 20 },
  { name: "Best Under $500", slug: "under-500", image: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=600&q=80", count: 40 },
];

export const brands = [
  "Rolex", "Omega", "Seiko", "Casio", "TAG Heuer",
  "Tissot", "Orient", "Citizen", "G-Shock", "Apple Watch"
];

export const watches: Watch[] = [
  {
    id: "seiko-presage-srpd37",
    name: "Presage Cocktail Time SRPD37",
    brand: "Seiko",
    slug: "seiko-presage-srpd37",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80",
    price: 350,
    rating: 4.5,
    ratingCount: 1247,
    badge: "Editor's Choice",
    category: "Dress Watches",
    shortDescription: "A stunning dress watch that punches way above its weight class with its mesmerizing cocktail-inspired dial.",
    affiliateUrl: "#",
    specs: {
      "Case Diameter": "40.5mm",
      "Case Material": "Stainless Steel",
      "Movement": "Seiko 4R35 Automatic",
      "Water Resistance": "50m (5 ATM)",
      "Crystal": "Hardlex",
      "Band Material": "Leather Strap",
      "Weight": "70g",
      "Power Reserve": "41 hours",
      "Dial Color": "Blue Gradated",
      "Case Thickness": "11.8mm"
    },
    pros: [
      "Stunning dial with incredible light play",
      "Reliable Seiko 4R35 automatic movement",
      "Exceptional value for money at this price point",
      "Versatile enough for both casual and formal occasions"
    ],
    cons: [
      "Hardlex crystal instead of sapphire",
      "Water resistance limited to 50m",
      "Leather strap quality could be better"
    ],
    detailedRatings: [
      { label: "Design", score: 9 },
      { label: "Durability", score: 7 },
      { label: "Value", score: 9 },
      { label: "Accuracy", score: 8 },
      { label: "Overall", score: 8.5 }
    ],
    reviewContent: {
      designBuild: "The Seiko Presage Cocktail Time SRPD37 is nothing short of breathtaking when it comes to design. The dial is the star of the show - inspired by the colors of a cocktail, it features a mesmerizing blue gradient that shifts and plays with light in ways that watches costing five times as much struggle to match. The sunburst pattern catches every ray of light, creating a dynamic visual experience on your wrist.\n\nThe 40.5mm case is perfectly sized for most wrists, sitting comfortably in that sweet spot between too small and too large. The stainless steel case is well-finished with a mix of polished and brushed surfaces that give it a premium feel. The crown is signed with the Seiko 'S' and operates smoothly for time-setting and hand-winding.",
      movementAccuracy: "Powering the SRPD37 is the Seiko 4R35 automatic movement - a workhorse caliber that has earned its reputation for reliability. This movement offers hand-winding and hacking (the seconds hand stops when you pull the crown), which is a nice touch at this price point.\n\nIn our testing, the watch ran consistently at around +8 seconds per day, which is well within Seiko's stated accuracy range of +45/-35 seconds per day. The 41-hour power reserve means you can take it off Friday evening and it'll still be ticking Monday morning - a practical consideration for those who rotate watches.",
      comfortWearability: "At just 70g with the leather strap, the Presage SRPD37 is remarkably comfortable for daily wear. The 11.8mm case thickness keeps it slim enough to slide under most shirt cuffs without issue, making it an ideal dress watch companion.\n\nThe included leather strap is adequate but not exceptional - many owners choose to upgrade to a higher-quality strap, which can transform the watch's look and feel. The good news is that it uses a standard 20mm lug width, so aftermarket options are plentiful.",
      valueForMoney: "This is where the Seiko Presage truly shines. At around $350, you're getting a watch with an in-house automatic movement, a dial that rivals watches in the $1,000+ range, and the reliability that Seiko is famous for. It's genuinely difficult to find a better-looking dress watch at this price.\n\nCompared to Swiss alternatives like the Tissot Visodate or Hamilton Jazzmaster, the Presage holds its own in terms of aesthetics while often coming in at a lower price point. The only area where you might notice the cost savings is in the crystal (Hardlex vs. sapphire) and the strap quality.",
      whoIsItFor: "The Seiko Presage Cocktail Time is perfect for the watch enthusiast who wants a stunning dress watch without breaking the bank. It's an excellent choice for:\n\n- First-time automatic watch buyers looking for something special\n- Professionals who need a versatile watch for office and formal events\n- Watch collectors who appreciate exceptional dial work\n- Anyone who values style and substance at a reasonable price"
    },
    faq: [
      { question: "Is the Seiko Presage SRPD37 a good everyday watch?", answer: "While it's primarily designed as a dress watch, many owners wear it daily. The 50m water resistance handles hand washing and light rain, but you'll want to avoid swimming or showering with it." },
      { question: "How accurate is the Seiko 4R35 movement?", answer: "The 4R35 is rated for +45/-35 seconds per day, but most examples perform much better, typically running within +/- 15 seconds per day after a break-in period." },
      { question: "Can I replace the strap?", answer: "Yes! The SRPD37 uses a standard 20mm lug width, making it compatible with thousands of aftermarket straps. Many owners upgrade to a higher-quality leather strap or a mesh bracelet." },
      { question: "Is Hardlex crystal scratch-resistant?", answer: "Hardlex is Seiko's proprietary mineral crystal that's more scratch-resistant than regular glass but less so than sapphire. It's quite durable for daily wear but may accumulate light scratches over time." },
      { question: "How does it compare to the Orient Bambino?", answer: "Both are excellent dress watches under $400. The Presage has a more visually striking dial, while the Bambino offers a more classic, understated look. The Presage has slightly better water resistance (50m vs 30m)." }
    ],
    whereToBuy: [
      { store: "Amazon", price: "$338", url: "#" },
      { store: "Jomashop", price: "$315", url: "#" },
      { store: "Macy's", price: "$350", url: "#" }
    ]
  },
  {
    id: "casio-gshock-ga2100",
    name: "G-Shock GA-2100 'CasiOak'",
    brand: "Casio",
    slug: "casio-gshock-ga2100",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80",
    price: 99,
    rating: 4.7,
    ratingCount: 3842,
    badge: "Best Value",
    category: "Sports Watches",
    shortDescription: "The watch that broke the internet. An ultra-slim G-Shock with Royal Oak vibes at a fraction of the price.",
    affiliateUrl: "#",
    specs: {
      "Case Diameter": "45.4mm",
      "Case Material": "Carbon Core Guard Resin",
      "Movement": "Casio 5611 Quartz",
      "Water Resistance": "200m (20 ATM)",
      "Crystal": "Mineral Glass",
      "Band Material": "Resin",
      "Weight": "51g",
      "Battery Life": "Approx. 3 years",
      "Features": "World Time, Stopwatch, Timer, Alarm, LED Light",
      "Case Thickness": "11.8mm"
    },
    pros: [
      "Incredibly slim for a G-Shock at just 11.8mm",
      "Stunning octagonal design inspired by luxury watches",
      "200m water resistance - truly tough",
      "Amazing value at under $100"
    ],
    cons: [
      "Analog hands can be hard to read in low light",
      "No Bluetooth or solar power in base model",
      "Resin strap may feel cheap to some"
    ],
    detailedRatings: [
      { label: "Design", score: 9 },
      { label: "Durability", score: 10 },
      { label: "Value", score: 10 },
      { label: "Accuracy", score: 8 },
      { label: "Overall", score: 9 }
    ],
    reviewContent: {
      designBuild: "The Casio G-Shock GA-2100, affectionately nicknamed 'CasiOak' by the watch community for its resemblance to the Audemars Piguet Royal Oak, is a design masterpiece at its price point. The octagonal bezel with its integrated case-and-strap design creates a look that's both sporty and sophisticated.\n\nWhat makes this watch truly special is its slimness. At just 11.8mm thick and weighing only 51g, it defies the typical chunky G-Shock stereotype. The Carbon Core Guard structure allows Casio to achieve this slim profile while maintaining the legendary G-Shock toughness. It's a genuine engineering achievement.",
      movementAccuracy: "The GA-2100 uses Casio's 5611 quartz module, which combines analog hands with a small digital display at the 3 o'clock position. The quartz movement is rated for +/- 15 seconds per month, which is excellent and means you rarely need to adjust the time.\n\nThe digital display provides access to additional functions including world time (48 cities), stopwatch, countdown timer, and 5 daily alarms. The LED backlight illuminates both the analog and digital portions, though the analog hands don't have lume - a minor gripe.",
      comfortWearability: "At 51g, the GA-2100 is one of the most comfortable G-Shocks ever made. It sits flat on the wrist and doesn't have the wrist presence that many G-Shocks are known (or notorious) for. The resin strap is flexible right out of the box, unlike some G-Shocks that require a break-in period.\n\nThe watch wears smaller than its 45.4mm case diameter suggests due to the short lug-to-lug distance and integrated strap design. It works surprisingly well on wrists as small as 6.5 inches, which is unusual for a G-Shock.",
      valueForMoney: "At under $100, the GA-2100 is simply unbeatable in terms of value. You're getting a watch that's water-resistant to 200m, shock-resistant, and looks like a million bucks (well, about $30,000 - the price of the Royal Oak it resembles).\n\nThe modding community has also embraced this watch, with countless aftermarket metal cases and bracelets available that can transform it into something that looks genuinely luxury. Even without mods, it's a watch that consistently gets compliments and starts conversations.",
      whoIsItFor: "The GA-2100 is perfect for virtually anyone, but especially:\n\n- Budget-conscious buyers who want a stylish, tough watch\n- Active individuals who need a reliable daily beater\n- Watch enthusiasts who appreciate good design at any price\n- Modders who want a great base for customization\n- Students and young professionals looking for their first quality watch"
    },
    faq: [
      { question: "Is the GA-2100 really as tough as other G-Shocks?", answer: "Absolutely. Despite its slim profile, it carries the full G-Shock certification including 200m water resistance and shock resistance. The Carbon Core Guard structure actually makes it very robust." },
      { question: "What's the difference between GA-2100 and GA-B2100?", answer: "The GA-B2100 adds Bluetooth connectivity and Tough Solar charging, which are significant upgrades. It costs about $50 more but eliminates the need for battery changes and allows phone connectivity for time sync." },
      { question: "Can I swim with the GA-2100?", answer: "Yes! With 200m water resistance, it's more than capable of handling swimming, snorkeling, and even recreational diving. It's one of the best water-resistant watches at this price." },
      { question: "How do I set the time?", answer: "Hold the bottom-left button for 3 seconds to enter time-setting mode. Use the top buttons to adjust. The digital time drives the analog hands, so setting the digital display automatically moves the hands." }
    ],
    whereToBuy: [
      { store: "Amazon", price: "$89", url: "#" },
      { store: "Casio Official", price: "$99", url: "#" },
      { store: "Macy's", price: "$99", url: "#" }
    ]
  },
  {
    id: "orient-bambino-v2",
    name: "Bambino Version 2",
    brand: "Orient",
    slug: "orient-bambino-v2",
    image: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=600&q=80",
    price: 168,
    rating: 4.4,
    ratingCount: 2156,
    badge: "Top Rated",
    category: "Dress Watches",
    shortDescription: "The undisputed king of affordable dress watches. Classic elegance that punches well above its price.",
    affiliateUrl: "#",
    specs: {
      "Case Diameter": "40.5mm",
      "Case Material": "Stainless Steel",
      "Movement": "Orient F6724 Automatic",
      "Water Resistance": "30m (3 ATM)",
      "Crystal": "Domed Mineral Crystal",
      "Band Material": "Leather Strap",
      "Weight": "66g",
      "Power Reserve": "40+ hours",
      "Dial Color": "Cream",
      "Case Thickness": "11.8mm"
    },
    pros: [
      "In-house automatic movement at an unbeatable price",
      "Classic, timeless design that never goes out of style",
      "Domed crystal adds vintage charm and character",
      "Available in numerous dial color and case combinations"
    ],
    cons: [
      "Only 30m water resistance - not even splash-proof really",
      "No hacking or hand-winding on the movement",
      "Leather strap quality is basic"
    ],
    detailedRatings: [
      { label: "Design", score: 8 },
      { label: "Durability", score: 6 },
      { label: "Value", score: 10 },
      { label: "Accuracy", score: 7 },
      { label: "Overall", score: 8 }
    ],
    reviewContent: {
      designBuild: "The Orient Bambino Version 2 is a masterclass in classic watch design. With its clean, uncluttered dial, applied hour markers, and elegant dauphine hands, it evokes the golden era of watchmaking from the 1950s and 60s. The cream dial version is particularly stunning, developing a warm, vintage-like patina that gives it character.\n\nThe 40.5mm case is dressed in polished stainless steel, giving it a refined look appropriate for any formal occasion. The domed mineral crystal is a standout feature - it catches light beautifully and adds a sense of depth to the dial that flat crystals simply can't match. It's one of those details that makes the watch feel more expensive than it is.",
      movementAccuracy: "At the heart of the Bambino beats Orient's in-house F6724 automatic movement. Yes, you read that right - even at under $200, Orient uses their own in-house movement rather than outsourcing. This movement has been refined over decades and is known for its reliability.\n\nThe catch? This particular caliber doesn't offer hand-winding or hacking. This means you can't manually wind it when it runs down, and the seconds hand doesn't stop when you pull the crown. For many buyers at this price point, this is a non-issue, but it's worth mentioning for those who care about precise time-setting.",
      comfortWearability: "The Bambino sits comfortably on the wrist at 66g with the leather strap. The 40.5mm case diameter is universally flattering, and the 11.8mm thickness keeps it dressy without being too thick. It slides under shirt cuffs with ease, which is essential for a dress watch.\n\nThe included leather strap is functional but basic - it's one of the most common upgrades Bambino owners make. A quality Hirsch or Hadley Roma strap can elevate the entire watch experience. The 22mm lug width offers plenty of aftermarket options.",
      valueForMoney: "The Orient Bambino Version 2 is, quite simply, the best value in dress watches. Period. At around $168, you're getting an in-house automatic movement, a beautifully designed dial, and a watch that looks like it could cost $500 or more.\n\nCompare this to the competition: the closest alternatives from Seiko, Tissot, or Hamilton all cost significantly more. The Bambino has held its position as the go-to recommendation in the watch community for years, and for good reason.",
      whoIsItFor: "The Orient Bambino is ideal for:\n\n- First-time automatic watch buyers on a budget\n- Anyone needing an elegant dress watch for formal occasions\n- Vintage watch enthusiasts who appreciate classic design\n- Gift buyers looking for an impressive watch at a reasonable price\n- Watch collectors who want a reliable beater dress watch"
    },
    faq: [
      { question: "Is the Orient Bambino good for everyday wear?", answer: "It can be worn daily, but the 30m water resistance means you should be careful around water. It's best suited as a dress/office watch rather than an outdoor adventure watch." },
      { question: "Which version of the Bambino is best?", answer: "Version 2 is the most popular due to its classic Roman numeral markers and cream dial option. However, Orient offers many versions - V1 through V5 - each with different design elements. It comes down to personal preference." },
      { question: "How often does the Orient Bambino need servicing?", answer: "Orient recommends servicing every 3-5 years, but many owners report their Bambinos running well for much longer without service. The in-house movement is robust and well-proven." },
      { question: "Can the crystal be upgraded to sapphire?", answer: "Yes, several watchmakers offer sapphire crystal upgrades for the Bambino. It's a popular modification that costs around $40-60 installed and greatly improves scratch resistance." }
    ],
    whereToBuy: [
      { store: "Amazon", price: "$168", url: "#" },
      { store: "Orient Official", price: "$185", url: "#" },
      { store: "Long Island Watch", price: "$165", url: "#" }
    ]
  }
];

export const featuredWatches: Watch[] = watches;

export const topSellers = [
  { rank: 1, name: "Casio G-Shock GA-2100", brand: "Casio", image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=100&q=80", rating: 4.7, price: "$89", url: "#" },
  { rank: 2, name: "Seiko Presage SRPD37", brand: "Seiko", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=100&q=80", rating: 4.5, price: "$338", url: "#" },
  { rank: 3, name: "Orient Bambino V2", brand: "Orient", image: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=100&q=80", rating: 4.4, price: "$168", url: "#" },
  { rank: 4, name: "Tissot PRX Powermatic 80", brand: "Tissot", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=100&q=80", rating: 4.6, price: "$650", url: "#" },
  { rank: 5, name: "Seiko SKX007", brand: "Seiko", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&q=80", rating: 4.8, price: "$299", url: "#" },
  { rank: 6, name: "Casio F-91W", brand: "Casio", image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=100&q=80", rating: 4.5, price: "$15", url: "#" },
  { rank: 7, name: "Hamilton Khaki Field", brand: "Hamilton", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=100&q=80", rating: 4.6, price: "$495", url: "#" },
  { rank: 8, name: "Citizen Eco-Drive BM8180", brand: "Citizen", image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=100&q=80", rating: 4.3, price: "$120", url: "#" },
  { rank: 9, name: "Seiko 5 SRPD55", brand: "Seiko", image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=100&q=80", rating: 4.4, price: "$275", url: "#" },
  { rank: 10, name: "Orient Ray II", brand: "Orient", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=100&q=80", rating: 4.5, price: "$185", url: "#" },
];

export const reviewArticles: ReviewArticle[] = [
  { id: "1", title: "Seiko Presage Cocktail Time SRPD37 Review", slug: "seiko-presage-srpd37", excerpt: "A stunning dress watch that punches way above its weight class with its mesmerizing cocktail-inspired dial.", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80", date: "March 5, 2026", category: "Dress Watches", readTime: "8 min read" },
  { id: "2", title: "Casio G-Shock GA-2100 'CasiOak' Review", slug: "casio-gshock-ga2100", excerpt: "The watch that broke the internet. An ultra-slim G-Shock with Royal Oak vibes at a fraction of the price.", image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80", date: "February 28, 2026", category: "Sports Watches", readTime: "7 min read" },
  { id: "3", title: "Orient Bambino Version 2 Review", slug: "orient-bambino-v2", excerpt: "The undisputed king of affordable dress watches. Classic elegance that punches well above its price.", image: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=600&q=80", date: "February 20, 2026", category: "Dress Watches", readTime: "6 min read" },
];

export const bestUnder200 = [
  {
    rank: 1,
    name: "Orient Bambino Version 2",
    brand: "Orient",
    image: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=600&q=80",
    price: "$168",
    rating: 4.4,
    bestFeature: "Best Dress Watch",
    slug: "orient-bambino-v2",
    pros: ["In-house automatic movement", "Classic elegant design", "Domed crystal looks stunning"],
    cons: ["30m water resistance only", "No hand-winding"],
    description: "The Orient Bambino is the gold standard for affordable dress watches. Its in-house automatic movement and timeless design make it an incredible value proposition.",
    affiliateUrl: "#"
  },
  {
    rank: 2,
    name: "Casio G-Shock GA-2100",
    brand: "Casio",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80",
    price: "$89",
    rating: 4.7,
    bestFeature: "Most Stylish",
    slug: "casio-gshock-ga2100",
    pros: ["Ultra-slim G-Shock design", "200m water resistance", "Carbon Core Guard construction"],
    cons: ["No solar in base model", "Analog hands dim in low light"],
    description: "The CasiOak has taken the watch world by storm with its AP Royal Oak-inspired design packed into Casio's legendary G-Shock toughness.",
    affiliateUrl: "#"
  },
  {
    rank: 3,
    name: "Seiko 5 Sports SRPD55",
    brand: "Seiko",
    image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600&q=80",
    price: "$185",
    rating: 4.4,
    bestFeature: "Best All-Rounder",
    slug: "",
    pros: ["Seiko 4R36 automatic movement", "100m water resistance", "Day-date complication"],
    cons: ["Hardlex crystal", "Can run fast"],
    description: "The Seiko 5 Sports line offers incredible versatility with its robust automatic movement, respectable water resistance, and sporty-yet-refined design.",
    affiliateUrl: "#"
  },
  {
    rank: 4,
    name: "Citizen Eco-Drive BM8180-03E",
    brand: "Citizen",
    image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&q=80",
    price: "$120",
    rating: 4.3,
    bestFeature: "Best Solar",
    slug: "",
    pros: ["Never needs a battery change", "Military-inspired field watch design", "100m water resistance"],
    cons: ["Small 37mm case", "Basic design"],
    description: "The BM8180 is a masterclass in practical watchmaking. Citizen's Eco-Drive technology means this watch is powered by any light source and never needs a battery.",
    affiliateUrl: "#"
  },
  {
    rank: 5,
    name: "Casio Duro MDV-106",
    brand: "Casio",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
    price: "$55",
    rating: 4.5,
    bestFeature: "Best Budget Diver",
    slug: "",
    pros: ["200m water resistance", "Rotating bezel", "Unbeatable price"],
    cons: ["Quartz movement", "Rubber strap feels cheap"],
    description: "Bill Gates wears a Casio Duro - need we say more? This is the most capable dive watch you can buy for under $60, with genuine 200m water resistance.",
    affiliateUrl: "#"
  },
  {
    rank: 6,
    name: "Timex Marlin Automatic",
    brand: "Timex",
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&q=80",
    price: "$199",
    rating: 4.2,
    bestFeature: "Best Vintage Style",
    slug: "",
    pros: ["Miyota automatic movement", "Retro-modern design", "Exhibition caseback"],
    cons: ["Small at 40mm", "30m water resistance"],
    description: "The Timex Marlin Automatic brings mid-century charm to the modern wrist. With its Miyota movement and vintage-inspired design, it's a character piece at a great price.",
    affiliateUrl: "#"
  },
  {
    rank: 7,
    name: "Orient Ray II",
    brand: "Orient",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80",
    price: "$185",
    rating: 4.5,
    bestFeature: "Best Dive Watch",
    slug: "",
    pros: ["In-house automatic movement", "200m water resistance", "Solid stainless steel bracelet"],
    cons: ["No sapphire crystal", "Slightly thick at 13mm"],
    description: "The Orient Ray II is arguably the best dive watch you can buy under $200. With its in-house movement, solid construction, and 200m water resistance, it's a real tool watch.",
    affiliateUrl: "#"
  }
];
