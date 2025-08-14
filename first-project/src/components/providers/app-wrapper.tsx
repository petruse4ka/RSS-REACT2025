'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { LanguageContext } from '@/context/language-context.ts';
import { ThemeContext } from '@/context/theme-context.ts';
import { getDefaultLanguage } from '@/utils/get-default-language.ts';
import { getDefaultTheme } from '@/utils/get-default-theme.ts';
import { store } from '@/store/store.ts';

interface Props {
  children: ReactNode;
}

export default function AppWrapper({ children }: Props) {
  const [language, setLanguage] = useState(getDefaultLanguage());
  const [theme, setTheme] = useState(getDefaultTheme());

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Provider store={store}>
      <LanguageContext value={{ language, setLanguage }}>
        <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>
      </LanguageContext>
    </Provider>
  );
}
