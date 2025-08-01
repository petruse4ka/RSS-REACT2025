import { Provider } from 'react-redux';
import { LanguageContext } from '@/context/language-context';
import { ThemeContext } from '@/context/theme-context';
import { store } from '@/store/store';

export default function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LanguageContext value={{ language: 'en', setLanguage: () => {} }}>
        <ThemeContext value={{ theme: 'light', setTheme: () => {} }}>{children}</ThemeContext>
      </LanguageContext>
    </Provider>
  );
}
