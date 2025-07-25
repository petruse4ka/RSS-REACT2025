import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import Error404 from '../pages/error-404';
import { ERROR_404_TEXTS } from '../constants';

Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

beforeEach(() => {
  window.location.href = '';
});

test('Error404 component renders 404 error page with all elements', () => {
  render(<Error404 />);

  const errorPage = screen.getByTestId('404-error-page');
  expect(errorPage).toBeInTheDocument();

  const title = screen.getByTestId('404-error-title');
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent(ERROR_404_TEXTS.TITLE);

  const image = screen.getByTestId('404-error-image');
  expect(image).toBeInTheDocument();

  const description = screen.getByTestId('404-error-description');
  expect(description).toBeInTheDocument();
  expect(description).toHaveTextContent(ERROR_404_TEXTS.DESCRIPTION);

  const button = screen.getByTestId('404-error-button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(ERROR_404_TEXTS.BUTTON);
});

test('Error404 componentbutton navigates to homepage when clicked', () => {
  render(<Error404 />);

  const button = screen.getByTestId('404-error-button');
  fireEvent.click(button);

  expect(window.location.href).toBe('/');
});
