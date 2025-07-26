import { render, screen, fireEvent, waitFor } from '@/__tests__/test-utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/homepage';
import App from '@/app';

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

test('HomePage handles invalid page parameter', () => {
  const testRouter = memoryRouter(['/?page=test']);
  render(<RouterProvider router={testRouter} />);

  expect(testRouter.state.location.search).toBe('?page=test');
});

test('HomePage resets to page 1 when searching', async () => {
  const testRouter = memoryRouter(['/?page=5']);
  render(<RouterProvider router={testRouter} />);

  const searchInput = screen.getByTestId('search-input');
  const searchButton = screen.getByTestId('search-button');

  fireEvent.change(searchInput, { target: { value: 'new test query' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(testRouter.state.location.search).toBe('?page=1');
  });
});

test('HomePage updates URL with new page parameter', async () => {
  const testRouter = memoryRouter(['/?page=1']);
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
    const currentSearch = testRouter.state.location.search;
    expect(currentSearch).toBe('?page=2');
  });
});
