import { locales } from '@/locale';
import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';

export function useLocale() {
  const { language } = useContext(LanguageContext);
  return locales[language];
}
