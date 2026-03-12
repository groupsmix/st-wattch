import { useState, useEffect } from 'react';
import { List } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <div
      className={`rounded-xl border p-4 mb-8 ${
        theme === 'dark'
          ? 'bg-dark-card border-dark-border'
          : 'bg-light-secondary border-light-border'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-playfair font-semibold text-lg w-full"
      >
        <List className="w-5 h-5 text-gold" />
        Table of Contents
      </button>
      {isOpen && (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm py-1 pl-4 border-l-2 transition-colors ${
                  activeId === item.id
                    ? 'border-gold text-gold font-medium'
                    : theme === 'dark'
                    ? 'border-dark-border text-gray-400 hover:text-gold hover:border-gold/50'
                    : 'border-light-border text-gray-500 hover:text-gold hover:border-gold/50'
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
