import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import Checkbox from '@/components/ui/checkbox';

test('Checkbox renders unchecked by default', () => {
  const mockOnChange = vi.fn();
  render(<Checkbox checked={false} onChange={mockOnChange} dataTestId="card-checkbox" />);

  const checkbox = screen.getByTestId('card-checkbox');
  expect(checkbox).toBeInTheDocument();

  const svg = checkbox.querySelector('svg');
  expect(svg).not.toBeInTheDocument();
});

test('Checkbox renders checked state correctly', () => {
  const mockOnChange = vi.fn();
  render(<Checkbox checked={true} onChange={mockOnChange} dataTestId="card-checkbox" />);

  const checkbox = screen.getByTestId('card-checkbox');
  expect(checkbox).toBeInTheDocument();

  const svg = checkbox.querySelector('svg');
  expect(svg).toBeInTheDocument();
});

test('Checkbox calls onChange with true when unchecked when clicked', () => {
  const mockOnChange = vi.fn();
  render(<Checkbox checked={false} onChange={mockOnChange} dataTestId="card-checkbox" />);

  const checkbox = screen.getByTestId('card-checkbox');
  fireEvent.click(checkbox);

  expect(mockOnChange).toHaveBeenCalledWith(true);
  expect(mockOnChange).toHaveBeenCalledTimes(1);
});

test('Checkbox calls onChange with false when checked and clicked', () => {
  const mockOnChange = vi.fn();
  render(<Checkbox checked={true} onChange={mockOnChange} dataTestId="card-checkbox" />);

  const checkbox = screen.getByTestId('card-checkbox');
  fireEvent.click(checkbox);

  expect(mockOnChange).toHaveBeenCalledWith(false);
  expect(mockOnChange).toHaveBeenCalledTimes(1);
});
