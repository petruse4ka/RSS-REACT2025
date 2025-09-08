import type { ReactNode } from 'react';
import { LanguageContext } from '@/context/language-context';
import { ThemeContext } from '@/context/theme-context';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function AllTheProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <LanguageContext value={{ language: 'en', setLanguage: () => {} }}>
        <ThemeContext value={{ theme: 'light', setTheme: () => {} }}>{children}</ThemeContext>
      </LanguageContext>
    </Provider>
  );
}
