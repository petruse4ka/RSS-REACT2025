import { render, screen } from '@/__tests__/test-utils/test-utils';
import HomePage from '../pages/homepage';

test('HomePage component renders with search and main components', () => {
  render(<HomePage />);

  const search = screen.getByTestId('search');
  expect(search).toBeInTheDocument();

  const main = screen.getByTestId('main');
  expect(main).toBeInTheDocument();
});
