import { render, screen, waitForElementToBeRemoved } from '@/__tests__/test-utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Main from '../components/main/main';
import { en } from '@/locale/en';
import App from '@/app';
import HomePage from '@/pages/homepage';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const memoryRouter = () => {
  return createMemoryRouter([
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
  ]);
};

const defaultProps = {
  searchQuery: 'test',
  currentPage: 1,
  handlePageChange: vi.fn(),
  handleCardClick: vi.fn(),
  cards: [],
  totalItems: 0,
  isLoading: true,
  isError: false,
  errorMessage: '',
};

test('Main component renders loader when loading state is true and removes it when loading is false', async () => {
  const { rerender } = render(<Main {...defaultProps} isCardDetailOpen={false} />);

  expect(screen.getByTestId('main-loader')).toBeInTheDocument();
  expect(screen.queryByTestId('error-button')).not.toBeInTheDocument();

  rerender(
    <Main
      {...defaultProps}
      isLoading={false}
      cards={[{ id: '1', imageUrl: 'test.jpg', title: 'Test', description: 'Test description' }]}
      totalItems={1}
      isCardDetailOpen={false}
    />
  );

  expect(screen.getByTestId('cards-list')).toBeInTheDocument();
  expect(screen.queryByTestId('main-loader')).not.toBeInTheDocument();
});

test('Main component does not render cards list when loading state is true and renders it when loading is false', async () => {
  const { rerender } = render(<Main {...defaultProps} isCardDetailOpen={false} />);

  expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();

  rerender(
    <Main
      {...defaultProps}
      isLoading={false}
      cards={[{ id: '1', imageUrl: 'test.jpg', title: 'Test', description: 'Test description' }]}
      totalItems={1}
      isCardDetailOpen={false}
    />
  );

  expect(screen.getByTestId('cards-list')).toBeInTheDocument();
});

test('Main component receives searchQuery prop from App after mounting and does not render cards list when error state is true and renders error message', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  localStorageMock.getItem.mockReturnValue('simulated-error-404');

  const testRouter = memoryRouter();
  render(<RouterProvider router={testRouter} />);

  expect(screen.getByTestId('main-loader')).toBeInTheDocument();
  expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId('main-loader'));

  expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();
  expect(screen.getByTestId('list-error-message')).toBeInTheDocument();
  expect(screen.getByTestId('list-error-message')).toHaveTextContent(en.error.fetchError);
});
