import { locales } from '@/locale';

export function useLocale() {
  const locale = 'ru';
  return locales[locale];
}
