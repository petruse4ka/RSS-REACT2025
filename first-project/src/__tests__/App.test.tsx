import { render, screen } from '@/__tests__/test-utils/test-utils';
import App from '../app';

test('App component renders with homepage component', () => {
  render(<App />);

  const homepage = screen.getByTestId('homepage');
  expect(homepage).toBeInTheDocument();

  const header = screen.getByTestId('header');
  expect(header).toBeInTheDocument();

  const footer = screen.getByTestId('footer');
  expect(footer).toBeInTheDocument();
});
