import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import Search from '../components/search/search-new';
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
  render(<Search onSearch={mockSearchCallback} />);

  const input = screen.getByTestId('search-input');
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('placeholder', SEARCH_TEXTS.PLACEHOLDER);
  expect(input).toHaveValue('');

  const button = screen.getByTestId('search-button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(SEARCH_TEXTS.BUTTON);
});

test('Search component displays previously saved search term from localStorage on mount', () => {
  const savedQuery = 'mountain';

  localStorageMock.getItem.mockReturnValue(savedQuery);

  const mockSearchCallback = vi.fn();
  render(<Search onSearch={mockSearchCallback} />);

  const input = screen.getByTestId('search-input');
  expect(input).toHaveValue(savedQuery);
});

test('Search component updates input value when user types', () => {
  const savedQuery = 'mountain';

  localStorageMock.getItem.mockReturnValue(savedQuery);

  const mockSearchCallback = vi.fn();
  render(<Search onSearch={mockSearchCallback} />);

  const input = screen.getByTestId('search-input');
  expect(input).toHaveValue(savedQuery);

  fireEvent.change(input, { target: { value: 'new test query' } });

  expect(input).toHaveValue('new test query');
});

test('Search component calls onSearch callback with trimmed correct parameters when button is clicked and updates localStorage', () => {
  const mockSearchCallback = vi.fn();
  render(<Search onSearch={mockSearchCallback} />);

  const input = screen.getByTestId('search-input');
  const button = screen.getByTestId('search-button');

  fireEvent.change(input, { target: { value: '  untrimmed query  ' } });
  fireEvent.click(button);

  expect(mockSearchCallback).toHaveBeenCalledWith('untrimmed query');
  expect(localStorageMock.setItem).toHaveBeenCalledWith(
    'konstantinFirstReactProjectSearchQuery',
    'untrimmed query'
  );
});

test('Search component calls onSearch callback with trimmed correct parameters when Enter key is pressed and updates localStorage', () => {
  const mockSearchCallback = vi.fn();
  render(<Search onSearch={mockSearchCallback} />);

  const input = screen.getByTestId('search-input');

  fireEvent.change(input, { target: { value: '  untrimmed query  ' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(mockSearchCallback).toHaveBeenCalledWith('untrimmed query');
  expect(localStorageMock.setItem).toHaveBeenCalledWith(
    'konstantinFirstReactProjectSearchQuery',
    'untrimmed query'
  );
});
