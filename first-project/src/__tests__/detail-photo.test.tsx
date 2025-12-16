import { render, screen } from '@/__tests__/test-utils/test-utils';
import DetailPhoto from '../components/card-detail/detail-photo';
import { en } from '@/locale/en';

const mockProps = {
  imageUrl: 'https://test.com/test.jpg',
  title: 'Test Title',
  description: 'Test Description',
};

const mockPropsWithMissingData = {
  imageUrl: 'https://test.com/test.jpg',
  title: '',
  description: '',
};

test('DetailPhoto component renders correctly', () => {
  render(<DetailPhoto {...mockProps} />);

  expect(screen.getByTestId('detail-image')).toBeInTheDocument();
  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
});

test('DetailPhoto component renders fallback values when title and description are missing', () => {
  render(<DetailPhoto {...mockPropsWithMissingData} />);

  expect(screen.getByTestId('detail-image')).toBeInTheDocument();
  expect(screen.getByText(en.cardDetail.untitled)).toBeInTheDocument();
  expect(screen.getByText(en.cardDetail.noDescription)).toBeInTheDocument();
});
