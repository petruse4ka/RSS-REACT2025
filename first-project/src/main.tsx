import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@/styles/index.scss';
import { router } from './router/routes.tsx';

// if (import.meta.env.DEV) {
//   import('./__tests__/mocks/browser.ts');
// }

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
