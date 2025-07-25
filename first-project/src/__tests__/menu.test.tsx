import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import Menu from '../components/menu/menu';
import { MENU_TEXTS } from '@/constants';

test('Menu component renders with homepage and about links', () => {
  render(<Menu />);

  const homepageLink = screen.getByTestId('menu-homepage-link');
  expect(homepageLink).toBeInTheDocument();
  expect(homepageLink).toHaveTextContent(MENU_TEXTS.HOMEPAGE);

  const aboutLink = screen.getByTestId('menu-about-link');
  expect(aboutLink).toBeInTheDocument();
  expect(aboutLink).toHaveTextContent(MENU_TEXTS.ABOUT);
});

test('Menu component renders burger menu', () => {
  render(<Menu />);

  const burgerMenu = screen.getByTestId('burger-menu');
  expect(burgerMenu).toBeInTheDocument();
});

test('Burger menu toggles mobile menu when clicked', () => {
  render(<Menu />);

  const burgerMenu = screen.getByTestId('burger-menu');

  expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

  fireEvent.click(burgerMenu);

  const mobileMenu = screen.getByTestId('mobile-menu');
  expect(mobileMenu).toBeInTheDocument();

  const mobileHomepageLink = screen.getByTestId('mobile-menu-homepage-link');
  const mobileAboutLink = screen.getByTestId('mobile-menu-about-link');

  expect(mobileHomepageLink).toBeInTheDocument();
  expect(mobileHomepageLink).toHaveTextContent(MENU_TEXTS.HOMEPAGE);

  expect(mobileAboutLink).toBeInTheDocument();
  expect(mobileAboutLink).toHaveTextContent(MENU_TEXTS.ABOUT);

  fireEvent.click(burgerMenu);

  expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
});

test('Menu component handles window resize correctly', () => {
  render(<Menu />);

  const burgerMenu = screen.getByTestId('burger-menu');

  expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

  fireEvent.click(burgerMenu);
  expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024,
  });

  fireEvent.resize(window);

  expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
});
