import { render, screen } from '@/__tests__/test-utils/test-utils';
import MenuItem from '../components/menu/menu-item';

test('MenuItem component renders with link', () => {
  render(
    <MenuItem href="/" dataTestId="menu-item-link">
      <span>Home</span>
    </MenuItem>
  );

  const link = screen.getByTestId('menu-item-link');
  expect(link).toBeInTheDocument();

  const text = screen.getByText('Home');
  expect(text).toBeInTheDocument();
});
