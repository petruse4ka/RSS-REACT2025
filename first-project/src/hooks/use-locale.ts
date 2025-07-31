import { locales } from '@/locale';
import { useLanguage } from '@/hooks/use-language';

export function useLocale() {
  const { language } = useLanguage();
  return locales[language];
}
