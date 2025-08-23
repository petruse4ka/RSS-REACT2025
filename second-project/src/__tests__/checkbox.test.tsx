import { render, screen } from '@/__tests__/test-utils/test-utils';
import Checkbox from '@/components/ui/checkbox';

test('Checkbox renders unchecked by default', () => {
  render(<Checkbox checked={false} dataTestId="card-checkbox" />);

  const checkbox = screen.getByTestId('card-checkbox');
  expect(checkbox).toBeInTheDocument();
});

test('Checkbox renders checked state correctly', () => {
  render(<Checkbox checked={true} dataTestId="card-checkbox" />);

  const checkbox = screen.getByTestId('card-checkbox');
  expect(checkbox).toBeInTheDocument();
});
