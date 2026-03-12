import { ExternalLink } from 'lucide-react';

interface AffiliateButtonProps {
  url: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function AffiliateButton({
  url,
  text = 'Check Best Price on Amazon',
  size = 'md',
  fullWidth = false,
}: AffiliateButtonProps) {
  const sizeClasses = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow sponsored"
      className={`inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-dark font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:scale-105 ${
        sizeClasses[size]
      } ${fullWidth ? 'w-full' : ''}`}
    >
      {text}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}
