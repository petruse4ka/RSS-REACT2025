import { createBrowserRouter } from 'react-router-dom';
import App from '../app';
import HomePage from '@/pages/homepage';
import Error404 from '@/pages/error-404';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'error404',
        Component: Error404,
      },
      {
        path: '*',
        Component: Error404,
      },
    ],
  },
]);
