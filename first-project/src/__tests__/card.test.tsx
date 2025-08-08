import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import CardItem from '@/components/cards-list/card';
import { mockCardData, incompleteCardData } from '@/__tests__/mocks/handlers';
import { en } from '@/locale/en';

test('CardItem displays item name and description correctly', () => {
  render(<CardItem card={mockCardData} cardIndex={0} handleCardClick={vi.fn()} />);

  expect(screen.getByTestId('card-item')).toBeInTheDocument();
  expect(screen.getByText('A MAN WALKING DOWN A DIRT ROAD NEXT TO A MOUNTAIN')).toBeInTheDocument();
  expect(screen.getByText('Author: NEOM (@neom)')).toBeInTheDocument();

  const cardItem = screen.getByTestId('card-item');
  const image = cardItem.querySelector('img');

  expect(image).toHaveAttribute(
    'src',
    'https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MXwxfHNlYXJjaHwxfHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  );
  expect(image).toHaveAttribute('alt', 'A MAN WALKING DOWN A DIRT ROAD NEXT TO A MOUNTAIN');
});

test('CardItem handles missing props gracefully', () => {
  render(<CardItem card={incompleteCardData} cardIndex={0} handleCardClick={vi.fn()} />);

  const cardItem = screen.getByTestId('card-item');
  const image = cardItem.querySelector('img');

  expect(image).toHaveAttribute(
    'src',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw2fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  );
  expect(image).toHaveAttribute('alt', en.cardDetail.untitled);

  expect(screen.getByText('Test description')).toBeInTheDocument();
});

test('CardItem calls handleCardClick when card is clicked', () => {
  const mockHandleCardClick = vi.fn();
  render(<CardItem card={mockCardData} cardIndex={0} handleCardClick={mockHandleCardClick} />);

  const cardItem = screen.getByTestId('card-item');
  fireEvent.click(cardItem);

  expect(mockHandleCardClick).toHaveBeenCalledWith(0);
});

test('CardItem does not call handleCardClick when not provided', () => {
  render(<CardItem card={mockCardData} cardIndex={0} />);

  const cardItem = screen.getByTestId('card-item');

  expect(() => fireEvent.click(cardItem)).not.toThrow();
});
