import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import AppWrapper from './providers/app-provider';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <AppWrapper />
    </StrictMode>
  );
}
