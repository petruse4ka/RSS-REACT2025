import { render, screen } from '@/__tests__/test-utils/test-utils';
import AppWrapper from '@/components/providers/app-wrapper';

test('AppWrapper renders the App component', () => {
  render(<AppWrapper />);
  expect(screen.getByTestId('homepage')).toBeInTheDocument();
});
