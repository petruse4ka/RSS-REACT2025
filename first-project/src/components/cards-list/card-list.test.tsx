import { render, screen, waitForElementToBeRemoved } from '@/tests/test-utils/test-utils';
import Main from '../main/main';
import CardsList from './cards-list';
import { ERROR_TEXTS } from '@/constants';
import { mockCardData } from '@/tests/mocks/handlers';

test('Main component does not render cards list when loading state is true and renders it when loading is false', async () => {
  render(<Main searchQuery="test" />);

  expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId('main-loader'));

  expect(screen.getByTestId('cards-list')).toBeInTheDocument();
});

test('Main component does not render cards list when error state is true and renders error message', async () => {
  render(<Main searchQuery="simulated-error-404" />);

  expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId('main-loader'));

  expect(screen.queryByTestId('cards-list')).not.toBeInTheDocument();
  expect(screen.getByTestId('list-error-message')).toBeInTheDocument();
  expect(screen.getByTestId('list-error-message')).toHaveTextContent(ERROR_TEXTS.FETCH_ERROR);
});

test('CardsList renders correct number of card items with correct data', () => {
  render(<CardsList cards={[mockCardData]} />);

  const cardsList = screen.getByTestId('cards-list');
  expect(cardsList).toBeInTheDocument();

  const cardItems = screen.getAllByTestId('card-item');
  expect(cardItems).toHaveLength([mockCardData].length);

  const firstCard = [mockCardData][0];
  const firstCardItem = cardItems[0];

  expect(firstCardItem).toHaveTextContent(firstCard.title);
  expect(firstCardItem).toHaveTextContent(firstCard.description);

  const firstCardImage = firstCardItem.querySelector('img');
  expect(firstCardImage).toHaveAttribute('src', firstCard.imageUrl);
  expect(firstCardImage).toHaveAttribute('alt', firstCard.title);
});

test('CardsList renders empty when no cards provided', () => {
  render(<CardsList cards={[]} />);

  const cardsList = screen.getByTestId('cards-list');
  expect(cardsList).toBeInTheDocument();

  const cardItems = screen.queryAllByTestId('card-item');
  expect(cardItems).toHaveLength(0);
});
