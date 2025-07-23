import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import Search from '../components/search/search';
import { SEARCH_TEXTS } from '@/constants';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

beforeEach(() => {
  vi.clearAllMocks();
});

test('Search component renders with default styling and text and empty input when no saved term exists', () => {
  localStorageMock.getItem.mockReturnValue(null);

  const mockSearchCallback = vi.fn();
  render(<Search searchQuery="" onSearch={mockSearchCallback} />);

  const input = screen.getByTestId('search-input');
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('placeholder', SEARCH_TEXTS.PLACEHOLDER);
  expect(input).toHaveValue('');

  const button = screen.getByTestId('search-button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(SEARCH_TEXTS.BUTTON);
});

test('Search component displays search query from props', () => {
  const searchQuery = 'mountain';

  const mockSearchCallback = vi.fn();
  render(<Search searchQuery={searchQuery} onSearch={mockSearchCallback} />);

  const input = screen.getByTestId('search-input');
  expect(input).toHaveValue(searchQuery);
});

test('Search component updates input value when user types', () => {
  const searchQuery = 'mountain';

  const mockSearchCallback = vi.fn();
  render(<Search searchQuery={searchQuery} onSearch={mockSearchCallback} />);

  const input = screen.getByTestId('search-input');
  expect(input).toHaveValue(searchQuery);

  fireEvent.change(input, { target: { value: 'new test query' } });

  expect(input).toHaveValue('new test query');
});

test('Search component calls onSearch callback with trimmed correct parameters when button is clicked', () => {
  const mockSearchCallback = vi.fn();
  render(<Search searchQuery="" onSearch={mockSearchCallback} />);

  const input = screen.getByTestId('search-input');
  const button = screen.getByTestId('search-button');

  fireEvent.change(input, { target: { value: '  untrimmed query  ' } });
  fireEvent.click(button);

  expect(mockSearchCallback).toHaveBeenCalledWith('untrimmed query');
});

test('Search component calls onSearch callback with trimmed correct parameters when Enter key is pressed', () => {
  const mockSearchCallback = vi.fn();
  render(<Search searchQuery="" onSearch={mockSearchCallback} />);

  const input = screen.getByTestId('search-input');

  fireEvent.change(input, { target: { value: '  untrimmed query  ' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(mockSearchCallback).toHaveBeenCalledWith('untrimmed query');
});
