import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { useLocale } from '@/hooks/use-locale';
import App from '@/app';
import HomePage from '@/pages/homepage';

const memoryRouter = () => {
  return createMemoryRouter([
    {
      path: '/',
      Component: App,
      children: [
        {
          index: true,
          Component: HomePage,
        },
      ],
    },
  ]);
};

test('Menu component renders with homepage and about links', () => {
  const testRouter = memoryRouter();
  render(<RouterProvider router={testRouter} />);

  const homepageLink = screen.getByTestId('menu-homepage-link');
  expect(homepageLink).toBeInTheDocument();
  expect(homepageLink).toHaveTextContent(useLocale().menu.homepage);

  const aboutLink = screen.getByTestId('menu-about-link');
  expect(aboutLink).toBeInTheDocument();
  expect(aboutLink).toHaveTextContent(useLocale().menu.about);
});

test('Menu component renders burger menu', () => {
  const testRouter = memoryRouter();
  render(<RouterProvider router={testRouter} />);

  const burgerMenu = screen.getByTestId('burger-menu');
  expect(burgerMenu).toBeInTheDocument();
});

test('Burger menu toggles mobile menu when clicked', () => {
  const testRouter = memoryRouter();
  render(<RouterProvider router={testRouter} />);

  const burgerMenu = screen.getByTestId('burger-menu');

  expect(screen.queryByTestId('mobile-menu')).toBeInTheDocument();
  const mobileMenu = screen.getByTestId('mobile-menu');
  expect(mobileMenu).toHaveClass('opacity-0');
  expect(mobileMenu).toHaveClass('pointer-events-none');

  fireEvent.click(burgerMenu);

  expect(mobileMenu).toBeInTheDocument();
  expect(mobileMenu).toHaveClass('opacity-100');
  expect(mobileMenu).toHaveClass('pointer-events-auto');

  const mobileHomepageLink = screen.getByTestId('mobile-menu-homepage-link');
  const mobileAboutLink = screen.getByTestId('mobile-menu-about-link');

  expect(mobileHomepageLink).toBeInTheDocument();
  expect(mobileHomepageLink).toHaveTextContent(useLocale().menu.homepage);

  expect(mobileAboutLink).toBeInTheDocument();
  expect(mobileAboutLink).toHaveTextContent(useLocale().menu.about);

  fireEvent.click(burgerMenu);

  expect(screen.queryByTestId('mobile-menu')).toBeInTheDocument();
  expect(mobileMenu).toHaveClass('opacity-0');
  expect(mobileMenu).toHaveClass('pointer-events-none');
});

test('Menu component handles window resize correctly', () => {
  const testRouter = memoryRouter();
  render(<RouterProvider router={testRouter} />);

  const burgerMenu = screen.getByTestId('burger-menu');

  expect(screen.queryByTestId('mobile-menu')).toBeInTheDocument();
  const mobileMenu = screen.getByTestId('mobile-menu');
  expect(mobileMenu).toHaveClass('opacity-0');
  expect(mobileMenu).toHaveClass('pointer-events-none');

  fireEvent.click(burgerMenu);
  expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  expect(mobileMenu).toHaveClass('opacity-100');
  expect(mobileMenu).toHaveClass('pointer-events-auto');

  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024,
  });

  fireEvent.resize(window);

  expect(screen.queryByTestId('mobile-menu')).toBeInTheDocument();
  expect(mobileMenu).toHaveClass('opacity-0');
  expect(mobileMenu).toHaveClass('pointer-events-none');
});
