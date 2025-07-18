import { render, screen, waitForElementToBeRemoved } from '@/tests/test-utils/test-utils';
import Main from '../main/main';
import { ERROR_TEXTS } from '@/constants';

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

test('Main component does not render cards list and error button when error state is true and renders error message', async () => {
  render(<Main searchQuery="simulated-error-404" />);

  expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();
  expect(screen.queryByTestId('error-button')).not.toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId('main-loader'));

  expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();
  expect(screen.getByTestId('list-error-message')).toBeInTheDocument();
  expect(screen.getByTestId('list-error-message')).toHaveTextContent(ERROR_TEXTS.FETCH_ERROR);
  expect(screen.queryByTestId('error-button')).toBeInTheDocument();
});
