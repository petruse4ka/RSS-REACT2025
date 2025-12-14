import { render, screen } from '@/__tests__/test-utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Error404 from '@/pages/error-404';
import type { ReactElement } from 'react';

const renderWithRouter = (component: ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

test('Error404 shows return homepage button', () => {
  renderWithRouter(<Error404 />);

  const button = screen.getByTestId('return-homepage-button');
  expect(button).toBeInTheDocument();
});

test('Error404 displays 404 error image', () => {
  renderWithRouter(<Error404 />);

  const image = screen.getByTestId('404-error-image');
  expect(image).toBeInTheDocument();
});
