import { render, screen, waitFor } from '@/__tests__/test-utils/test-utils';
import { vi } from 'vitest';
import CardDetail from '../components/card-detail/card-detail';
import { mockCards } from './mocks/handlers';
import { en } from '@/locale/en';
import type { CardData } from '@/types/interfaces';

const mockHandleDetailsClose = vi.fn();

const mockCardData: CardData[] = mockCards.map((card) => ({
  id: card.id,
  imageUrl: card.urls.regular,
  title: card.alt_description || 'No title',
  description: card.description || 'No description',
}));

test('CardDetail component renders card details correctly', async () => {
  render(
    <CardDetail cardIndex={1} cards={mockCardData} handleDetailsClose={mockHandleDetailsClose} />
  );

  await waitFor(() => {
    expect(screen.getByTestId('card-detail')).toBeInTheDocument();
  });

  expect(screen.getByTestId('detail-header')).toBeInTheDocument();
  expect(screen.getByTestId('detail-image')).toBeInTheDocument();
  expect(screen.getByTestId('detail-description')).toBeInTheDocument();
  expect(screen.getByTestId('author-image')).toBeInTheDocument();
  expect(screen.getByTestId('author-name')).toBeInTheDocument();
  expect(screen.getByTestId('likes-count')).toBeInTheDocument();
  expect(screen.getByTestId('downloads-count')).toBeInTheDocument();
  expect(screen.getByTestId('views-count')).toBeInTheDocument();
});

test('CardDetail component handles card not found error', async () => {
  const invalidCardData: CardData[] = [
    {
      id: 'invalid-id',
      imageUrl: 'https://test.com/image.jpg',
      title: 'Test Card',
      description: 'Test Description',
    },
  ];

  render(
    <CardDetail cardIndex={1} cards={invalidCardData} handleDetailsClose={mockHandleDetailsClose} />
  );

  await waitFor(() => {
    expect(screen.getByTestId('close-detail-button')).toBeInTheDocument();
  });

  expect(screen.getByText(en.error.fetchError)).toBeInTheDocument();
});

test('CardDetail component handles 403 rate limit error', async () => {
  const errorCardData: CardData[] = [
    {
      id: 'simulated-error-403',
      imageUrl: 'https://test.com/error.jpg',
      title: 'Error Card',
      description: 'This will cause a 403 error',
    },
  ];

  render(
    <CardDetail cardIndex={1} cards={errorCardData} handleDetailsClose={mockHandleDetailsClose} />
  );

  await waitFor(() => {
    expect(screen.getByTestId('close-detail-button')).toBeInTheDocument();
  });

  expect(screen.getByText(en.error.rateLimitError)).toBeInTheDocument();
});
