import { render, screen } from '@/__tests__/test-utils/test-utils';
import CardItem from '@/components/cards-list/card';
import { mockCardData, incompleteCardData } from '@/__tests__/mocks/handlers';

test('CardItem displays item name and description correctly', () => {
  render(<CardItem card={mockCardData} />);

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
  render(<CardItem card={incompleteCardData} />);

  const cardItem = screen.getByTestId('card-item');
  const image = cardItem.querySelector('img');

  expect(image).toHaveAttribute(
    'src',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTc5MDd8MHwxfHNlYXJjaHw2fHxtb3VudGFpbnN8ZW58MHx8fHwxNzUyNjMwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  );
  expect(image).toHaveAttribute('alt', '');

  expect(screen.getByText('Test description')).toBeInTheDocument();
});
