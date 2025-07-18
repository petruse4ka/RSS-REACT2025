import { render, screen } from '@/tests/test-utils/test-utils';
import App from '../App';

test('App component renders with search and main components', () => {
  render(<App />);

  const search = screen.getByTestId('search');
  expect(search).toBeInTheDocument();

  const main = screen.getByTestId('main');
  expect(main).toBeInTheDocument();
});
