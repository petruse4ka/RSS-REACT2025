import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.scss';
import AppWrapper from './components/providers/app-wrapper';

if (import.meta.env.DEV) {
  import('./__tests__/mocks/browser.ts');
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <AppWrapper />
    </StrictMode>
  );
}
