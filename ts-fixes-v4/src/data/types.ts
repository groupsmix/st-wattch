export interface Watch {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: WatchCategory;
  movement: string;
  caseDiameter: string;
  waterResistance: string;
  crystal: string;
  strapMaterial: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  fullReview: string;
  pros: string[];
  cons: string[];
  specifications: Record<string, string>;
  affiliateLinks: AffiliateLink[];
  featured?: boolean;
  bestSeller?: boolean;
  aiSummary?: string;
  slug?: string;
  specs?: Record<string, string>;
  badge?: string;
  detailedRatings?: Array<{ label: string; score: number }>;
}

export type WatchCategory = 
  | 'dive'
  | 'dress'
  | 'luxury'
  | 'pilot'
  | 'field'
  | 'chronograph'
  | 'sports'
  | 'casual';

export interface AffiliateLink {
  store: string;
  url: string;
  price: number;
}

export interface Review {
  id: string;
  watchId: string;
  author: string;
  date: string;
  rating: number;
  content: string;
  helpful: number;
}

export interface ComparisonData {
  watch1Id: string;
  watch2Id: string;
  verdict: string;
  categories: ComparisonCategory[];
}

export interface ComparisonCategory {
  name: string;
  watch1Score: number;
  watch2Score: number;
  description: string;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ar';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
