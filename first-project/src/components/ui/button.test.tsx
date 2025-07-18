import { render, screen } from '@/tests/test-utils/test-utils';
import Button from './button';

test('Button renders with default styling and text', () => {
  render(
    <Button
      type="button"
      onClick={() => {}}
      className="bg-blue-500 hover:bg-blue-600"
      text="Test button"
      dataTestId="test-button"
    />
  );

  const button = screen.getByTestId('test-button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveTextContent('Test button');
  expect(button).toHaveClass('bg-blue-500', 'hover:bg-blue-600');
});
