import { render, screen } from '@/__tests__/test-utils/test-utils';
import Menu from '../components/menu/menu';

test('Menu component renders with homepage and about links', () => {
  render(<Menu />);

  const homepageLink = screen.getByTestId('menu-homepage-link');
  expect(homepageLink).toBeInTheDocument();

  const aboutLink = screen.getByTestId('menu-about-link');
  expect(aboutLink).toBeInTheDocument();
});
