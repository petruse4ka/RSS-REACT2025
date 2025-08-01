import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { LanguageContext } from '@/context/language-context';
import { ThemeContext } from '@/context/theme-context';
import { localStorageMock } from '../mocks/localStorageMock';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <LanguageContext value={{ language: 'en', setLanguage: () => {} }}>
      <ThemeContext value={{ theme: 'light', setTheme: () => {} }}>{children}</ThemeContext>
    </LanguageContext>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const setLocalStorageMock = () => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
};

export * from '@testing-library/react';
export { customRender as render, setLocalStorageMock };
