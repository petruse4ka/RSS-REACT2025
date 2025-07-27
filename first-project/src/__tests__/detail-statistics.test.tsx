import { render, screen } from '@/__tests__/test-utils/test-utils';
import DetailStatistics from '../components/card-detail/detail-statistics';

const mockStats = {
  likes: 1234,
  downloads: 567,
  views: 8901,
};

test('DetailStatistics component renders correctly', () => {
  render(<DetailStatistics stats={mockStats} />);

  expect(screen.getByText('1,234')).toBeInTheDocument();
  expect(screen.getByText('567')).toBeInTheDocument();
  expect(screen.getByText('8,901')).toBeInTheDocument();
});
