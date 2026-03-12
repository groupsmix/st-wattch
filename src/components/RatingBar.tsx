import { useTheme } from '../context/ThemeContext';

interface RatingBarProps {
  label: string;
  score: number;
  maxScore?: number;
}

export default function RatingBar({ label, score, maxScore = 10 }: RatingBarProps) {
  const { theme } = useTheme();
  const percentage = (score / maxScore) * 100;

  return (
    <div className="flex items-center gap-4">
      <span className={`text-sm font-medium w-24 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </span>
      <div className={`flex-1 h-3 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-dark-border' : 'bg-gray-200'}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold transition-all duration-1000"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-bold text-gold w-12 text-right">{score}/{maxScore}</span>
    </div>
  );
}
