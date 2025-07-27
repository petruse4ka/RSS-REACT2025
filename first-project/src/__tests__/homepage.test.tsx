import { render, screen, fireEvent, waitFor } from '@/__tests__/test-utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/homepage';
import App from '@/app';
import Error404 from '../pages/error-404';

const memoryRouter = (initialEntries = ['/']) => {
  return createMemoryRouter(
    [
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
                Component: HomePage,
              },
            ],
          },
          {
            path: '*',
            Component: Error404,
          },
        ],
      },
    ],
    {
      initialEntries,
    }
  );
};

test('HomePage component renders with search and main components', () => {
  const testRouter = memoryRouter();
  render(<RouterProvider router={testRouter} />);

  const search = screen.getByTestId('search');
  expect(search).toBeInTheDocument();

  const main = screen.getByTestId('main');
  expect(main).toBeInTheDocument();
});

test('HomePage handles invalid page parameter', async () => {
  const testRouter = memoryRouter(['/test']);
  render(<RouterProvider router={testRouter} />);

  await waitFor(() => {
    expect(testRouter.state.location.pathname).toBe('/404');
  });
});

test('HomePage resets to page 1 when searching', async () => {
  const testRouter = memoryRouter(['/5']);
  render(<RouterProvider router={testRouter} />);

  const searchInput = screen.getByTestId('search-input');
  const searchButton = screen.getByTestId('search-button');

  fireEvent.change(searchInput, { target: { value: 'new test query' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(testRouter.state.location.pathname).toBe('/1');
  });
});

test('HomePage updates URL with new page parameter', async () => {
  const testRouter = memoryRouter(['/1']);
  render(<RouterProvider router={testRouter} />);

  const searchInput = screen.getByTestId('search-input');
  const searchButton = screen.getByTestId('search-button');

  fireEvent.change(searchInput, { target: { value: 'test query' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const paginator = screen.queryByTestId('paginator');
    expect(paginator).toBeInTheDocument();
  });

  const nextButton = screen.getByTestId('next-button');
  expect(nextButton).not.toBeDisabled();
  fireEvent.click(nextButton);

  await waitFor(() => {
    expect(testRouter.state.location.pathname).toBe('/2');
  });
});
