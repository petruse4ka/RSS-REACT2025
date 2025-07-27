import { render, screen } from '@/__tests__/test-utils/test-utils';
import DetailAuthor from '../components/card-detail/detail-author';

const mockAuthor = {
  name: 'Test Name',
  username: 'test-username',
  bio: 'Test bio',
  profileImage: 'https://test.com/test.jpg',
};

test('DetailAuthor component renders correctly', () => {
  render(<DetailAuthor author={mockAuthor} />);

  expect(screen.getByTestId('author-image')).toBeInTheDocument();
  expect(screen.getByText('Test Name')).toBeInTheDocument();
  expect(screen.getByText('@test-username')).toBeInTheDocument();
  expect(screen.getByText('Test bio')).toBeInTheDocument();
});
