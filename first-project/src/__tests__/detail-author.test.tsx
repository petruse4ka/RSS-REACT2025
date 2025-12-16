import { render, screen } from '@/__tests__/test-utils/test-utils';
import DetailAuthor from '../components/card-detail/detail-author';
import { en } from '@/locale/en';

const mockAuthor = {
  name: 'Test Name',
  username: 'test-username',
  bio: 'Test bio',
  profileImage: 'https://test.com/test.jpg',
};

const mockAuthorWithMissingData = {
  name: '',
  username: '',
  bio: '',
  profileImage: 'https://test.com/test.jpg',
};

test('DetailAuthor component renders correctly', () => {
  render(<DetailAuthor author={mockAuthor} />);

  expect(screen.getByTestId('author-image')).toBeInTheDocument();
  expect(screen.getByText('Test Name')).toBeInTheDocument();
  expect(screen.getByText('@test-username')).toBeInTheDocument();
  expect(screen.getByText('Test bio')).toBeInTheDocument();
});

test('DetailAuthor component renders fallback values when author data is missing', () => {
  render(<DetailAuthor author={mockAuthorWithMissingData} />);

  expect(screen.getByTestId('author-image')).toBeInTheDocument();
  expect(screen.getByText(en.cardDetail.unknownAuthor)).toBeInTheDocument();
  expect(screen.getByText(`@${en.cardDetail.unknownUsername}`)).toBeInTheDocument();
  expect(screen.getByText(en.cardDetail.noBio)).toBeInTheDocument();
});
