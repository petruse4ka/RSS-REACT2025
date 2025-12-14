import { en } from './en';
import { ru } from './ru';

export const locales = {
  en,
  ru,
} as const;

export type Translations = typeof locales.en | typeof locales.ru;

export type Locale = keyof typeof locales;
