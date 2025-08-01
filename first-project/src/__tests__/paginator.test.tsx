import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import Paginator from '../components/paginator/paginator';
import { CARDS_PER_PAGE } from '@/constants';
import { en } from '@/locale/en';

const mockHandlePageChange = vi.fn();

beforeEach(() => {
  mockHandlePageChange.mockClear();
});

test('Paginator renders with previous and next buttons', () => {
  render(<Paginator currentPage={2} totalItems={60} handlePageChange={mockHandlePageChange} />);

  expect(screen.getByTestId('paginator')).toBeInTheDocument();
  expect(screen.getByTestId('previous-button')).toBeInTheDocument();
  expect(screen.getByTestId('next-button')).toBeInTheDocument();
});

test('Paginator shows correct page information', () => {
  render(<Paginator currentPage={2} totalItems={90} handlePageChange={mockHandlePageChange} />);

  expect(screen.getByTestId('page-info')).toHaveTextContent(
    `2 ${en.paginator.of} ${Math.ceil(90 / CARDS_PER_PAGE)}`
  );
});

test('Paginator calls handlePageChange when buttons are clicked', () => {
  render(<Paginator currentPage={2} totalItems={90} handlePageChange={mockHandlePageChange} />);

  fireEvent.click(screen.getByTestId('previous-button'));
  expect(mockHandlePageChange).toHaveBeenCalledWith(1);

  fireEvent.click(screen.getByTestId('next-button'));
  expect(mockHandlePageChange).toHaveBeenCalledWith(3);
});

test('Paginator does not render when there is only one page', () => {
  render(<Paginator currentPage={1} totalItems={15} handlePageChange={mockHandlePageChange} />);

  expect(screen.queryByTestId('paginator')).not.toBeInTheDocument();
});
