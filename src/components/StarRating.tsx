import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
}

export default function StarRating({ rating, size = 16, showNumber = false }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-gold text-gold" />
        ))}
        {hasHalf && <StarHalf size={size} className="fill-gold text-gold" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-gray-600" />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-semibold text-gold ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
