import { watches } from '../../data/watches';
import type { Watch } from '../../data/watches';

const STORAGE_KEY = 'wristnerd-browsing-history';

interface BrowsingEntry {
  watchId: string;
  timestamp: number;
  category: string;
  brand: string;
  priceRange: string;
}

function getPriceRange(price: number): string {
  if (price < 100) return 'budget';
  if (price < 200) return 'mid';
  if (price < 500) return 'premium';
  return 'luxury';
}

export function trackWatchView(watch: Watch): void {
  const history = getBrowsingHistory();
  const entry: BrowsingEntry = {
    watchId: watch.id,
    timestamp: Date.now(),
    category: watch.category,
    brand: watch.brand,
    priceRange: getPriceRange(watch.price),
  };

  // Remove duplicate, add new entry at top
  const filtered = history.filter(h => h.watchId !== watch.id);
  filtered.unshift(entry);

  // Keep only last 20 entries
  const trimmed = filtered.slice(0, 20);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // localStorage full or unavailable
  }
}

function getBrowsingHistory(): BrowsingEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as BrowsingEntry[];
    }
  } catch {
    // Invalid data
  }
  return [];
}

export function getPersonalizedRecommendations(currentWatchId?: string): Watch[] {
  const history = getBrowsingHistory();

  if (history.length === 0) {
    // No history - return top rated watches
    return watches
      .filter(w => w.id !== currentWatchId)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }

  // Analyze preferences
  const categoryCount: Record<string, number> = {};
  const brandCount: Record<string, number> = {};
  const priceRangeCount: Record<string, number> = {};

  history.forEach(entry => {
    categoryCount[entry.category] = (categoryCount[entry.category] || 0) + 1;
    brandCount[entry.brand] = (brandCount[entry.brand] || 0) + 1;
    priceRangeCount[entry.priceRange] = (priceRangeCount[entry.priceRange] || 0) + 1;
  });

  const preferredCategory = Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)[0]?.[0];
  const preferredBrand = Object.entries(brandCount)
    .sort(([, a], [, b]) => b - a)[0]?.[0];
  const preferredPriceRange = Object.entries(priceRangeCount)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  const viewedIds = new Set(history.map(h => h.watchId));
  if (currentWatchId) viewedIds.add(currentWatchId);

  // Score each watch based on preference match
  const scored = watches
    .filter(w => !viewedIds.has(w.id))
    .map(w => {
      let score = 0;
      if (w.category === preferredCategory) score += 3;
      if (w.brand === preferredBrand) score += 2;
      if (getPriceRange(w.price) === preferredPriceRange) score += 2;
      score += w.rating; // Add base rating
      return { watch: w, score };
    })
    .sort((a, b) => b.score - a.score);

  // If not enough unviewed watches, include viewed ones too
  if (scored.length < 3) {
    const remaining = watches
      .filter(w => w.id !== currentWatchId && !scored.find(s => s.watch.id === w.id))
      .sort((a, b) => b.rating - a.rating);
    return [...scored.map(s => s.watch), ...remaining].slice(0, 3);
  }

  return scored.slice(0, 3).map(s => s.watch);
}

export function getUserPreferenceSummary(language: 'en' | 'ar'): string | null {
  const history = getBrowsingHistory();
  if (history.length < 2) return null;

  const categoryCount: Record<string, number> = {};
  history.forEach(e => {
    categoryCount[e.category] = (categoryCount[e.category] || 0) + 1;
  });

  const topCategory = Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  if (!topCategory) return null;

  if (language === 'ar') {
    return `بناءً على تصفحك، يبدو أنك مهتم بساعات ${topCategory}`;
  }
  return `Based on your browsing, you seem interested in ${topCategory}`;
}
