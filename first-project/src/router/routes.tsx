import { createBrowserRouter } from 'react-router-dom';
import App from '../app';
import HomePage from '../pages/homepage';
import About from '../pages/about';
import Error404 from '../pages/error-404';
import CardDetailPage from '../pages/card-detail';

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
        path: ':page',
        Component: HomePage,
        children: [
          {
            path: ':id',
            Component: CardDetailPage,
          },
        ],
      },
      {
        path: 'about',
        Component: About,
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
