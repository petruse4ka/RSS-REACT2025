import type { Locale } from '../locale/index';

export function getDefaultLanguage(): Locale {
  if (typeof window !== 'undefined' && navigator.language) {
    const browserLanguage = navigator.language.toLowerCase();
    return browserLanguage.startsWith('ru') ? 'ru' : 'en';
  }
  return 'en';
}
