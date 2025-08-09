import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.scss';
import AppWrapper from './components/providers/app-wrapper';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <AppWrapper />
    </StrictMode>
  );
}
