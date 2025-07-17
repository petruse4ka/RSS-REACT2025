import { render, screen, fireEvent } from '@/tests/test-utils/test-utils';
import ErrorBoundary from './error-boundary';
import { ERROR_TEXTS } from '@/constants';
import Main from '../main/main';

const ThrowError = ({ error = false }: { error?: boolean }) => {
  if (error) {
    throw new Error('Test error');
  }
  return <div data-testid="normal-content">Children Component</div>;
};

test('ErrorBoundary renders children when there is no error', () => {
  render(
    <ErrorBoundary
      texts={{
        title: ERROR_TEXTS.TITLE,
        message: ERROR_TEXTS.DESCRIPTION,
        buttonText: ERROR_TEXTS.REFRESH_BUTTON,
      }}
    >
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByTestId('normal-content')).toBeInTheDocument();
  expect(screen.getByText('Children Component')).toBeInTheDocument();
});

test('ErrorBoundary catches errors and renders fallback UI when there is an error in child components', () => {
  render(
    <ErrorBoundary
      texts={{
        title: ERROR_TEXTS.TITLE,
        message: ERROR_TEXTS.DESCRIPTION,
        buttonText: ERROR_TEXTS.REFRESH_BUTTON,
      }}
    >
      <ThrowError error={true} />
    </ErrorBoundary>
  );

  expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  expect(screen.getByTestId('error-title')).toBeInTheDocument();
  expect(screen.getByTestId('error-message')).toBeInTheDocument();
  expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
  expect(screen.getByTestId('error-title')).toHaveTextContent(ERROR_TEXTS.TITLE);
  expect(screen.getByTestId('error-message')).toHaveTextContent(ERROR_TEXTS.DESCRIPTION);
  expect(screen.getByTestId('refresh-button')).toHaveTextContent(ERROR_TEXTS.REFRESH_BUTTON);
});

test('ErrorBoundary logs error to console when error occurs', () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  render(
    <ErrorBoundary
      texts={{
        title: ERROR_TEXTS.TITLE,
        message: ERROR_TEXTS.DESCRIPTION,
        buttonText: ERROR_TEXTS.REFRESH_BUTTON,
      }}
    >
      <ThrowError error={true} />
    </ErrorBoundary>
  );

  expect(consoleErrorSpy).toHaveBeenCalled();

  consoleErrorSpy.mockRestore();
});

test('Error button triggers error when clicked', async () => {
  render(
    <ErrorBoundary
      texts={{
        title: ERROR_TEXTS.TITLE,
        message: ERROR_TEXTS.DESCRIPTION,
        buttonText: ERROR_TEXTS.REFRESH_BUTTON,
      }}
    >
      <Main searchQuery="" />
    </ErrorBoundary>
  );

  const errorButton = await screen.findByTestId('error-button');
  fireEvent.click(errorButton);

  expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  expect(screen.getByTestId('error-title')).toHaveTextContent(ERROR_TEXTS.TITLE);
  expect(screen.getByTestId('error-message')).toHaveTextContent(ERROR_TEXTS.DESCRIPTION);
});
