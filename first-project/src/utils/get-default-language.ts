export function getDefaultLanguage(): 'en' | 'ru' {
  if (typeof window !== 'undefined' && navigator.language) {
    const browserLanguage = navigator.language.toLowerCase();
    return browserLanguage.startsWith('ru') ? 'ru' : 'en';
  }
  return 'en';
}
