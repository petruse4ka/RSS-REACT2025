import { render, screen } from '@/__tests__/test-utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import MenuItem from '../components/menu/menu-item';

const memoryRouter = () => {
  return createMemoryRouter([
    {
      path: '/',
      element: (
        <MenuItem to="/" dataTestId="menu-item-link">
          <span>Home</span>
        </MenuItem>
      ),
    },
  ]);
};

test('MenuItem component renders with link', () => {
  const testRouter = memoryRouter();
  render(<RouterProvider router={testRouter} />);

  const link = screen.getByTestId('menu-item-link');
  expect(link).toBeInTheDocument();

  const text = screen.getByText('Home');
  expect(text).toBeInTheDocument();
});
