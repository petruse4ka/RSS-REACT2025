import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { localStorageMock } from '../mocks/local-storage-mock';
import AllTheProviders from './all-the-providers';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const setLocalStorageMock = () => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
};

export * from '@testing-library/react';
export { customRender as render, setLocalStorageMock };
