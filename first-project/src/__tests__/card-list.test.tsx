import { render, screen } from '@/__tests__/test-utils/test-utils';
import CardsList from '../components/cards-list/cards-list';
import { mockCardData } from '@/__tests__/mocks/handlers';
import { useLocale } from '@/hooks/use-locale';

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

test('CardsList renders error message when no cards provided', () => {
  render(<CardsList cards={[]} />);

  const errorMessage = screen.getByTestId('list-error-message');
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent(useLocale().error.fetchError);

  const cardsList = screen.queryByTestId('cards-list');
  expect(cardsList).not.toBeInTheDocument();
});
