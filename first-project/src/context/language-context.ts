import { createContext } from 'react';
import type { Locale } from '../locale/index';

type LanguageContextType = {
  language: Locale;
  setLanguage: (language: Locale) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});
