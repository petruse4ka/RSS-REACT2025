import { render, screen } from '@/__tests__/test-utils/test-utils';
import Header from '../components/header/header';

test('Header component renders with logo and menu', () => {
  render(<Header />);

  const logo = screen.getByTestId('header-logo');
  expect(logo).toBeInTheDocument();

  const menu = screen.getByTestId('menu');
  expect(menu).toBeInTheDocument();
});
