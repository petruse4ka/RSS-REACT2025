import { render, screen } from '@/tests/test-utils/test-utils';
import CardsList from './cards-list';
import { mockCardData } from '@/tests/mocks/handlers';

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
