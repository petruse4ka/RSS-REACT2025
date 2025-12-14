import { render, screen } from '@/__tests__/test-utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
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

test('Header component renders with logo and menu', () => {
  const testRouter = memoryRouter();
  render(<RouterProvider router={testRouter} />);

  const logo = screen.getByTestId('header-logo');
  expect(logo).toBeInTheDocument();

  const themeSwitcher = screen.getByTestId('theme-switcher');
  expect(themeSwitcher).toBeInTheDocument();

  const languageSwitcher = screen.getByTestId('language-switcher');
  expect(languageSwitcher).toBeInTheDocument();
});
