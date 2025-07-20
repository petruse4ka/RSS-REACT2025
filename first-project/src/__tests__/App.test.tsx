import { render, screen } from '@/__tests__/test-utils/test-utils';
import App from '../app-new';

test('App component renders with search and main components', () => {
  render(<App />);

  const search = screen.getByTestId('search');
  expect(search).toBeInTheDocument();

  const main = screen.getByTestId('main');
  expect(main).toBeInTheDocument();
});
