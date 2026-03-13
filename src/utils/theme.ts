/**
 * Theme utility to reduce repetitive theme === 'dark' ? ... : ... patterns.
 * Usage: cn(theme, 'dark-class', 'light-class')
 */
export function cn(theme: string, dark: string, light: string): string {
  return theme === 'dark' ? dark : light;
}
