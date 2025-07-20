import { render, screen } from '@/__tests__/test-utils/test-utils';
import Input from '@/components/ui/input';

test('Input renders with default styling and props', () => {
  render(
    <Input
      type="text"
      placeholder="Test placeholder"
      value="Test value"
      onChange={() => {}}
      className="border-gray-300 focus:border-cyan-500"
      dataTestId="test-input"
    />
  );

  const input = screen.getByTestId('test-input');
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('type', 'text');
  expect(input).toHaveAttribute('placeholder', 'Test placeholder');
  expect(input).toHaveValue('Test value');
  expect(input).toHaveClass('border-gray-300', 'focus:border-cyan-500');
});
