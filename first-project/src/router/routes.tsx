import { createBrowserRouter } from 'react-router-dom';
import App from '../app';
import HomePage from '../pages/homepage';
import About from '../pages/about';
import Error404 from '../pages/error-404';

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
      },
      {
        path: ':page/:id',
        Component: HomePage,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: '404',
        Component: Error404,
      },
      {
        path: '*',
        Component: Error404,
      },
    ],
  },
]);
