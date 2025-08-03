import { render, screen } from '@/__tests__/test-utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from '../app';
import HomePage from '../pages/homepage';

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

test('App component renders with homepage component', () => {
  const testRouter = memoryRouter();
  render(<RouterProvider router={testRouter} />);

  const homepage = screen.getByTestId('homepage');
  expect(homepage).toBeInTheDocument();

  const header = screen.getByTestId('header');
  expect(header).toBeInTheDocument();

  const footer = screen.getByTestId('footer');
  expect(footer).toBeInTheDocument();

  const selectedCards = screen.queryByTestId('selected-cards');
  expect(selectedCards).toBeInTheDocument();
  expect(selectedCards).toHaveClass('opacity-0');
});
