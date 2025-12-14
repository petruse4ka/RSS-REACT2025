import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import Modal from '@/components/ui/modal';

beforeEach(() => {
  if (!document.getElementById('modal-root')) {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
  }
});

afterEach(() => {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

const Props = {
  isOpen: true,
  onClose: vi.fn(),
  children: <div data-testid="modal-content">Modal content</div>,
  dataTestId: 'test-modal',
};

test('Modal renders when isOpen is true', () => {
  render(<Modal {...Props} />);

  const modal = screen.getByTestId('test-modal');
  expect(modal).toBeInTheDocument();
  expect(screen.getByTestId('modal-content')).toBeInTheDocument();
});

test('Modal does not render when isOpen is false', () => {
  render(<Modal {...Props} isOpen={false} />);

  expect(screen.queryByTestId('test-modal')).not.toBeInTheDocument();
  expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
});

test('Modal renders with title when provided', () => {
  render(<Modal {...Props} title="Test Modal Title" />);

  const title = screen.getByText('Test Modal Title');
  expect(title).toBeInTheDocument();
  expect(title).toHaveAttribute('id', 'form-modal');
});

test('Modal does not render title when not provided', () => {
  render(<Modal {...Props} />);

  expect(screen.queryByRole('heading')).not.toBeInTheDocument();
});

test('Modal has proper accessibility attributes', () => {
  render(<Modal {...Props} title="Test Modal" />);

  const modalDialog = screen.getByRole('dialog');
  expect(modalDialog).toHaveAttribute('aria-modal', 'true');
  expect(modalDialog).toHaveAttribute('aria-labelledby', 'form-modal');
  expect(modalDialog).toHaveAttribute('tabIndex', '-1');
});

test('Modal calls onClose when close button is clicked', () => {
  const mockOnClose = vi.fn();
  render(<Modal {...Props} onClose={mockOnClose} title="Test Modal" />);

  const closeButton = screen.getByTestId('modal-close-btn');
  fireEvent.click(closeButton);

  expect(mockOnClose).toHaveBeenCalledTimes(1);
});

test('Modal calls onClose when ESC key is pressed', () => {
  const mockOnClose = vi.fn();
  render(<Modal {...Props} onClose={mockOnClose} />);

  fireEvent.keyDown(document, { key: 'Escape' });

  expect(mockOnClose).toHaveBeenCalledTimes(1);
});

test('Modal does not call onClose when other keys are pressed', () => {
  const mockOnClose = vi.fn();
  render(<Modal {...Props} onClose={mockOnClose} />);

  fireEvent.keyDown(document, { key: 'Enter' });

  expect(mockOnClose).not.toHaveBeenCalled();
});

test('Modal renders children content correctly', () => {
  render(<Modal {...Props} />);

  expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  expect(screen.getByText('Modal content')).toBeInTheDocument();
});
