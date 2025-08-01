import { LanguageContext } from '@/context/language-context';
import { ThemeContext } from '@/context/theme-context';

export default function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext value={{ language: 'en', setLanguage: () => {} }}>
      <ThemeContext value={{ theme: 'light', setTheme: () => {} }}>{children}</ThemeContext>
    </LanguageContext>
  );
}
