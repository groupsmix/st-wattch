import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import StarRating from './StarRating';
import { useTheme } from '../context/ThemeContext';

interface ProductCardProps {
  name: string;
  brand: string;
  image: string;
  rating: number;
  price: number | string;
  badge?: string;
  slug?: string;
  affiliateUrl?: string;
}

export default function ProductCard({
  name,
  brand,
  image,
  rating,
  price,
  badge,
  slug,
  affiliateUrl = '#',
}: ProductCardProps) {
  const { theme } = useTheme();
  const priceStr = typeof price === 'number' ? `$${price}` : price;

  return (
    <div
      className={`group rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1 ${
        theme === 'dark'
          ? 'bg-dark-card border-dark-border'
          : 'bg-white border-light-border'
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={`${brand} ${name}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-gold text-dark text-xs font-bold px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className={`text-xs uppercase tracking-wider mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
          {brand}
        </p>
        {slug ? (
          <Link to={`/review/${slug}`}>
            <h3 className="font-playfair text-lg font-semibold mb-2 group-hover:text-gold transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
        ) : (
          <h3 className="font-playfair text-lg font-semibold mb-2 line-clamp-2">{name}</h3>
        )}

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={rating} size={14} />
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            ({rating.toFixed(1)})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gold">{priceStr}</span>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow sponsored"
            className="flex items-center gap-1 bg-gold hover:bg-gold-light text-dark text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Check Price
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
