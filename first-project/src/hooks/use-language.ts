import { useContext } from 'react';
import { LanguageContext } from '@/context/context';

export function useLanguage() {
  return useContext(LanguageContext);
}
