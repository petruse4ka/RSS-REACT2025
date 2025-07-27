import { render } from '@/__tests__/test-utils/test-utils';
import DetailStatistics from '../components/card-detail/detail-statistics';

const mockStats = {
  likes: 1234,
  downloads: 567,
  views: 8901,
};

test('DetailStatistics component renders correctly', () => {
  const toLocaleStringSpy = vi.spyOn(Number.prototype, 'toLocaleString');

  render(<DetailStatistics stats={mockStats} />);

  expect(toLocaleStringSpy).toHaveBeenCalledTimes(3);
  expect(toLocaleStringSpy).toHaveBeenCalledWith();
  expect(toLocaleStringSpy.mock.instances[0]).toBe(mockStats.likes);
  expect(toLocaleStringSpy.mock.instances[1]).toBe(mockStats.downloads);
  expect(toLocaleStringSpy.mock.instances[2]).toBe(mockStats.views);

  toLocaleStringSpy.mockRestore();
});
