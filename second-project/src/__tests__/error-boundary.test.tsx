import { render, screen } from '@/__tests__/test-utils/test-utils';
import ErrorBoundary from '@/components/error-boundary/error-boundary';
import { en } from '@/locale/en';

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
        title: en.error.title,
        message: en.error.description,
        buttonText: en.error.refreshButton,
      }}
    >
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByTestId('normal-content')).toBeInTheDocument();
  expect(screen.getByText('Children Component')).toBeInTheDocument();
});

test('ErrorBoundary catches error and renders fallback UI when there is an error in child components', () => {
  render(
    <ErrorBoundary
      texts={{
        title: en.error.title,
        message: en.error.description,
        buttonText: en.error.refreshButton,
      }}
    >
      <ThrowError error={true} />
    </ErrorBoundary>
  );

  expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  expect(screen.getByTestId('error-title')).toBeInTheDocument();
  expect(screen.getByTestId('error-message')).toBeInTheDocument();
  expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
  expect(screen.getByTestId('error-title')).toHaveTextContent(en.error.title);
  expect(screen.getByTestId('error-message')).toHaveTextContent(en.error.description);
  expect(screen.getByTestId('refresh-button')).toHaveTextContent(en.error.refreshButton);
});

test('ErrorBoundary logs error to console when error occurs', () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  render(
    <ErrorBoundary
      texts={{
        title: en.error.title,
        message: en.error.description,
        buttonText: en.error.refreshButton,
      }}
    >
      <ThrowError error={true} />
    </ErrorBoundary>
  );

  expect(consoleErrorSpy).toHaveBeenCalled();

  consoleErrorSpy.mockRestore();
});
