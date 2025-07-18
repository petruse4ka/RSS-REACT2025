import { render, screen, waitForElementToBeRemoved } from '@/tests/test-utils/test-utils';
import Loader from './loader';
import { SEARCH_TEXTS } from '@/constants';
import Main from '../main/main';

test('Loader renders with default styling and text', () => {
  render(
    <Loader
      classNameSpinner="border-cyan-500"
      classNameText="text-cyan-500"
      text={SEARCH_TEXTS.LOADING}
      dataTestId="loader"
    />
  );

  const loader = screen.getByTestId('loader');
  expect(loader).toBeInTheDocument();

  const spinner = screen.getByTestId('loader-spinner');
  expect(spinner).toHaveClass('border-cyan-500');

  const text = screen.getByTestId('loader-text');
  expect(text).toHaveTextContent(SEARCH_TEXTS.LOADING);
  expect(text).toHaveClass('text-cyan-500');
});

test('Main component renders loader when loading state is true and removes it when loading is false', async () => {
  render(<Main searchQuery="test" />);

  expect(screen.getByTestId('main-loader')).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId('main-loader'));

  expect(screen.getByTestId('cards-list')).toBeInTheDocument();
  expect(screen.queryByTestId('main-loader')).not.toBeInTheDocument();
});
