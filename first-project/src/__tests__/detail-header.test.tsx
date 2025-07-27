import { render, screen } from '@/__tests__/test-utils/test-utils';
import DetailHeader from '../components/card-detail/detail-header';

const mockHandleClose = () => {};

test('DetailHeader component renders correctly', () => {
  render(<DetailHeader handleClose={mockHandleClose} />);

  expect(screen.getByTestId('detail-header')).toBeInTheDocument();
  expect(screen.getByTestId('detail-title')).toBeInTheDocument();
  expect(screen.getByTestId('close-detail-button')).toBeInTheDocument();
});
