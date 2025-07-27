import { render, screen } from '@/__tests__/test-utils/test-utils';
import DetailPhoto from '../components/card-detail/detail-photo';

const mockProps = {
  imageUrl: 'https://test.com/test.jpg',
  title: 'Test Title',
  description: 'Test Description',
};

test('DetailPhoto component renders correctly', () => {
  render(<DetailPhoto {...mockProps} />);

  expect(screen.getByTestId('detail-image')).toBeInTheDocument();
  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
});
