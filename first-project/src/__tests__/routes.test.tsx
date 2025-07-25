import { render, screen } from '@/__tests__/test-utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { router } from '../router/routes';

const memoryRouter = (initialRoute: string) => {
  return createMemoryRouter(router.routes, {
    initialEntries: [initialRoute],
  });
};

test('Router renders homepage at root path', () => {
  const testRouter = memoryRouter('/');
  render(<RouterProvider router={testRouter} />);

  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('menu')).toBeInTheDocument();
  expect(screen.getByTestId('header-logo')).toBeInTheDocument();
  expect(screen.getByTestId('homepage')).toBeInTheDocument();
  expect(screen.getByTestId('footer')).toBeInTheDocument();
});

test('Router renders about page at /about path', () => {
  const testRouter = memoryRouter('/about');
  render(<RouterProvider router={testRouter} />);

  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('menu')).toBeInTheDocument();
  expect(screen.getByTestId('about-page')).toBeInTheDocument();
});

test('Router renders 404 page for invalid routes', () => {
  const testRouter = memoryRouter('/random-error-url');
  render(<RouterProvider router={testRouter} />);

  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('menu')).toBeInTheDocument();
  expect(screen.getByTestId('404-error-page')).toBeInTheDocument();
});
