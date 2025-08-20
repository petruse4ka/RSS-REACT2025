import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/routes.tsx';
import { LanguageContext } from '@/context/language-context.ts';
import { ThemeContext } from '@/context/theme-context.ts';
import { getDefaultLanguage } from '@/utils/get-default-language.ts';
import { getDefaultTheme } from '@/utils/get-default-theme.ts';

export default function AppWrapper() {
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
    <LanguageContext value={{ language, setLanguage }}>
      <ThemeContext value={{ theme, setTheme }}>
        <RouterProvider router={router} />
      </ThemeContext>
    </LanguageContext>
  );
}
