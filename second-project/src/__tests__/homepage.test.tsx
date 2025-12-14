import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import HomePage from '@/pages/homepage';
import type { ReactNode } from 'react';

vi.mock('@/components/ui/modal', () => ({
  default: ({
    isOpen,
    onClose,
    title,
    children,
    dataTestId,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    dataTestId?: string;
  }) =>
    isOpen ? (
      <div data-testid={dataTestId} role="dialog">
        <h2>{title}</h2>
        <button onClick={onClose} data-testid="modal-close">
          Close
        </button>
        {children}
      </div>
    ) : null,
}));

test('HomePage renders with two buttons', () => {
  render(<HomePage />);

  expect(screen.getByTestId('uncontrolled-form-btn')).toBeInTheDocument();
  expect(screen.getByTestId('react-hook-form-btn')).toBeInTheDocument();
});

test('Clicking uncontrolled form button opens modal', () => {
  render(<HomePage />);

  const button = screen.getByTestId('uncontrolled-form-btn');
  fireEvent.click(button);

  expect(screen.getByTestId('uncontrolled-form-modal')).toBeInTheDocument();
});

test('Clicking React Hook Form button opens modal', () => {
  render(<HomePage />);

  const button = screen.getByTestId('react-hook-form-btn');
  fireEvent.click(button);

  expect(screen.getByTestId('reactHookForm-form-modal')).toBeInTheDocument();
});

test('Modal state is properly managed', () => {
  render(<HomePage />);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  fireEvent.click(screen.getByTestId('uncontrolled-form-btn'));
  expect(screen.getByTestId('uncontrolled-form-modal')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('modal-close'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  fireEvent.click(screen.getByTestId('react-hook-form-btn'));
  expect(screen.getByTestId('reactHookForm-form-modal')).toBeInTheDocument();
});
