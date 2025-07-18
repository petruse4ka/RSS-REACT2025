import { render, screen, waitForElementToBeRemoved } from '@/tests/test-utils/test-utils';
import Loader from './loader';
import { UNSPLASH_BASE_URL, SEARCH_TEXTS } from '@/constants';
import Main from '../main/main';
import { http, HttpResponse } from 'msw';
import { server } from '@/tests/mocks/node';
import { mockCards } from '@/tests/mocks/handlers';

test('Loader renders with default styling and text', () => {
  const props = {
    classNameSpinner: 'border-cyan-500',
    classNameText: 'text-cyan-500',
    text: SEARCH_TEXTS.LOADING,
    dataTestId: 'loader',
  };

  render(<Loader {...props} />);

  const loader = screen.getByTestId('loader');
  expect(loader).toBeInTheDocument();

  const spinner = screen.getByTestId('loader-spinner');
  expect(spinner).toHaveClass('border-cyan-500');

  const text = screen.getByTestId('loader-text');
  expect(text).toHaveTextContent(SEARCH_TEXTS.LOADING);
  expect(text).toHaveClass('text-cyan-500');
});

test('Main component renders loader when loading state is true and removes it when loading is false', async () => {
  server.use(
    http.get(`${UNSPLASH_BASE_URL}/search/photos`, async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return HttpResponse.json({
        results: mockCards,
        total: mockCards.length,
        total_pages: 1,
      });
    })
  );

  render(<Main searchQuery="test" />);

  expect(screen.getByTestId('main-loader')).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId('main-loader'));

  expect(screen.getByTestId('cards-list')).toBeInTheDocument();
  expect(screen.queryByTestId('main-loader')).not.toBeInTheDocument();
});
