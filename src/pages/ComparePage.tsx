import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { watches, getWatchById } from '../data/watches';
import { Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ComparePage() {
  const { t } = useTheme();
  const [watch1Id, setWatch1Id] = useState<string>('');
  const [watch2Id, setWatch2Id] = useState<string>('');

  const watch1 = watch1Id ? getWatchById(watch1Id) : undefined;
  const watch2 = watch2Id ? getWatchById(watch2Id) : undefined;

  const getComparisonVerdict = () => {
    if (!watch1 || !watch2) return '';
    if (watch1.price < watch2.price && watch1.rating >= watch2.rating) {
      return `The ${watch1.name} offers better value with a lower price and equal or higher rating. It's the smart choice for budget-conscious buyers.`;
    }
    if (watch2.price < watch1.price && watch2.rating >= watch1.rating) {
      return `The ${watch2.name} offers better value with a lower price and equal or higher rating. It's the smart choice for budget-conscious buyers.`;
    }
    if (watch1.rating > watch2.rating) {
      return `The ${watch1.name} has a higher rating (${watch1.rating} vs ${watch2.rating}), but the ${watch2.name} may offer specific features that suit your needs better. Consider what matters most to you.`;
    }
    if (watch2.rating > watch1.rating) {
      return `The ${watch2.name} has a higher rating (${watch2.rating} vs ${watch1.rating}), but the ${watch1.name} may offer specific features that suit your needs better. Consider what matters most to you.`;
    }
    return `Both watches are excellent choices with very similar ratings. Your decision should come down to personal style preference and specific feature requirements.`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {t.compare.title}
          </h1>
          <div className="h-1 w-16 bg-amber-500 rounded mt-2" />
          <p className="text-gray-600 dark:text-gray-400 mt-3">{t.compare.subtitle}</p>
        </div>

        {/* Selection */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-10">
          <select
            value={watch1Id}
            onChange={(e) => setWatch1Id(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
          >
            <option value="">{t.compare.selectWatch} 1</option>
            {watches.map(w => (
              <option key={w.id} value={w.id} disabled={w.id === watch2Id}>
                {w.brand} - {w.name} (${w.price})
              </option>
            ))}
          </select>

          <div className="text-center">
            <span className="px-4 py-2 bg-amber-500 text-white font-bold rounded-full text-sm">
              {t.compare.vs}
            </span>
          </div>

          <select
            value={watch2Id}
            onChange={(e) => setWatch2Id(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
          >
            <option value="">{t.compare.selectWatch} 2</option>
            {watches.map(w => (
              <option key={w.id} value={w.id} disabled={w.id === watch1Id}>
                {w.brand} - {w.name} (${w.price})
              </option>
            ))}
          </select>
        </div>

        {/* Comparison Content */}
        {watch1 && watch2 ? (
          <div>
            {/* Watch Cards Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[watch1, watch2].map(watch => (
                <Link
                  key={watch.id}
                  to={`/review/${watch.id}`}
                  className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-amber-500/50 transition-all group"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={watch.image}
                      alt={watch.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div>
                      <p className="text-amber-500 text-xs font-semibold uppercase">{watch.brand}</p>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors">
                        {watch.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">{renderStars(watch.rating)}</div>
                        <span className="text-sm text-gray-500">{watch.rating}</span>
                      </div>
                      <p className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                        ${watch.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* AI Verdict */}
            <div className="mb-10 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-amber-700 dark:text-amber-400">
                  {t.compare.aiVerdict}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {getComparisonVerdict()}
              </p>
            </div>

            {/* Specs Comparison Table */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t.compare.specifications}
              </h3>
              <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="grid grid-cols-3 bg-gray-100 dark:bg-gray-800 p-4 font-semibold text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Spec</span>
                  <span className="text-gray-900 dark:text-white text-center">{watch1.brand}</span>
                  <span className="text-gray-900 dark:text-white text-center">{watch2.brand}</span>
                </div>

                {/* Rows */}
                {[
                  ['Price', `$${watch1.price}`, `$${watch2.price}`],
                  ['Rating', `${watch1.rating}/5`, `${watch2.rating}/5`],
                  ['Movement', watch1.movement, watch2.movement],
                  ['Case Size', watch1.caseDiameter, watch2.caseDiameter],
                  ['Water Resistance', watch1.waterResistance, watch2.waterResistance],
                  ['Crystal', watch1.crystal, watch2.crystal],
                  ['Strap', watch1.strapMaterial, watch2.strapMaterial],
                  ...Object.keys(watch1.specifications)
                    .filter(k => !['Movement', 'Case Diameter', 'Water Resistance', 'Crystal'].includes(k))
                    .map(k => [k, watch1.specifications[k] || '-', watch2.specifications[k] || '-']),
                ].map(([label, val1, val2], i) => (
                  <div
                    key={label}
                    className={`grid grid-cols-3 p-4 text-sm ${
                      i % 2 === 0
                        ? 'bg-white dark:bg-gray-900'
                        : 'bg-gray-50 dark:bg-gray-800/50'
                    }`}
                  >
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{label}</span>
                    <span className="text-gray-900 dark:text-white text-center">{val1}</span>
                    <span className="text-gray-900 dark:text-white text-center">{val2}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons Comparison */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[watch1, watch2].map(watch => (
                <div key={watch.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">{watch.name}</h4>
                  <div className="mb-4">
                    <h5 className="text-green-600 dark:text-green-400 font-semibold text-sm mb-2">
                      {t.review.pros}
                    </h5>
                    <ul className="space-y-1">
                      {watch.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-green-500">+</span> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-red-600 dark:text-red-400 font-semibold text-sm mb-2">
                      {t.review.cons}
                    </h5>
                    <ul className="space-y-1">
                      {watch.cons.map((con, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-red-500">-</span> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⌚</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t.compare.selectBoth}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
