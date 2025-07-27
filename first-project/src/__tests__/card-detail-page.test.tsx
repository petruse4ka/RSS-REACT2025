import { render, screen, waitFor } from '@/__tests__/test-utils/test-utils';
import { vi } from 'vitest';
import CardDetailPage from '../pages/card-detail';
import { mockCards } from './mocks/handlers';

const mockHandleDetailsClose = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => ({
      cards: mockCards,
      cardIndex: 1,
      handleDetailsClose: mockHandleDetailsClose,
    }),
  };
});

test('CardDetailPage component renders card details correctly', async () => {
  render(<CardDetailPage />);

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
