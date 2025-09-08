import type { Locale } from '../locale/index';

export default function getDefaultLanguage(): Locale {
  if (typeof window !== 'undefined' && navigator.language) {
    const browserLanguage = navigator.language.toLowerCase();
    return browserLanguage.startsWith('ru') ? 'ru' : 'en';
  }
  return 'en';
}
