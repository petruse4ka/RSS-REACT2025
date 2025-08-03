import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import Toggle from '@/components/ui/toggle';

const toggleProps = {
  leftIcon: '/left-icon.png',
  rightIcon: '/right-icon.png',
  leftTitle: 'Left Option',
  rightTitle: 'Right Option',
  onToggle: vi.fn(),
};

test('Toggle renders with left side active', () => {
  render(<Toggle {...toggleProps} isActive={true} activeSide="left" dataTestId="toggle-button" />);

  const toggle = screen.getByTestId('toggle-button');
  expect(toggle).toBeInTheDocument();

  const indicator = screen.getByTestId('toggle-indicator');
  expect(indicator).toBeInTheDocument();
  expect(indicator).toHaveClass('translate-x-1');
});

test('Toggle renders with right side active', () => {
  render(<Toggle {...toggleProps} isActive={true} activeSide="right" dataTestId="toggle-button" />);

  const toggle = screen.getByTestId('toggle-button');
  expect(toggle).toBeInTheDocument();

  const indicator = screen.getByTestId('toggle-indicator');
  expect(indicator).toBeInTheDocument();
  expect(indicator).toHaveClass('translate-x-8');
});

test('Toggle calls onToggle when clicked', () => {
  const mockOnToggle = vi.fn();

  render(
    <Toggle
      {...toggleProps}
      onToggle={mockOnToggle}
      isActive={false}
      activeSide="left"
      dataTestId="toggle-button"
    />
  );

  const toggle = screen.getByTestId('toggle-button');
  fireEvent.click(toggle);

  expect(mockOnToggle).toHaveBeenCalledTimes(1);
});
