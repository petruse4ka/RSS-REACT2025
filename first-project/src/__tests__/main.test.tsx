import { render, screen, waitForElementToBeRemoved } from '@/__tests__/test-utils/test-utils';
import Main from '../components/main/main-new';
import { ERROR_TEXTS } from '@/constants';
import App from '@/app-new';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

test('Main component renders loader when loading state is true and removes it when loading is false', async () => {
  render(<Main searchQuery="test" />);

  expect(screen.getByTestId('main-loader')).toBeInTheDocument();
  expect(screen.queryByTestId('error-button')).not.toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId('main-loader'));

  expect(screen.getByTestId('cards-list')).toBeInTheDocument();
  expect(screen.queryByTestId('main-loader')).not.toBeInTheDocument();
  expect(screen.queryByTestId('error-button')).toBeInTheDocument();
});

test('Main component does not render cards list and error button when loading state is true and renders them when loading is false', async () => {
  render(<Main searchQuery="test" />);

  expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();
  expect(screen.queryByTestId('error-button')).not.toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId('main-loader'));

  expect(screen.getByTestId('cards-list')).toBeInTheDocument();
  expect(screen.queryByTestId('error-button')).toBeInTheDocument();
});

test('Main component receives searchQuery prop from App after mounting and does not render cards list and error button when error state is true and renders error message', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  localStorageMock.getItem.mockReturnValue('simulated-error-404');

  render(<App />);

  expect(screen.getByTestId('main-loader')).toBeInTheDocument();
  expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();
  expect(screen.queryByTestId('error-button')).not.toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId('main-loader'));

  expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();
  expect(screen.getByTestId('list-error-message')).toBeInTheDocument();
  expect(screen.getByTestId('list-error-message')).toHaveTextContent(ERROR_TEXTS.FETCH_ERROR);
  expect(screen.queryByTestId('error-button')).toBeInTheDocument();
});
