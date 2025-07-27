import { render, screen } from '@/__tests__/test-utils/test-utils';
import Footer from '../components/footer/footer';

test('Footer component renders with copyright and github link', () => {
  render(<Footer />);

  const copyright = screen.getByTestId('footer-copyright');
  expect(copyright).toBeInTheDocument();

  const githubLink = screen.getByTestId('footer-github-link');
  expect(githubLink).toBeInTheDocument();
});
