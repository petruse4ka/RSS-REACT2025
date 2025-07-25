import { render, screen } from '@/__tests__/test-utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Error404 from '../pages/error-404';
import { ERROR_404_TEXTS } from '../constants';
import App from '@/app';

const memoryRouter = () => {
  return createMemoryRouter([
    {
      path: '/',
      Component: App,
      children: [
        {
          index: true,
          Component: Error404,
        },
      ],
    },
  ]);
};

test('Error404 component renders 404 error page with all elements', () => {
  const testRouter = memoryRouter();
  render(<RouterProvider router={testRouter} />);

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

  const button = screen.getByTestId('return-homepage-button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(ERROR_404_TEXTS.BUTTON);
});
