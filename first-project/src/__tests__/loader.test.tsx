import { render, screen } from '@/__tests__/test-utils/test-utils';
import Loader from '@/components/ui/loader';
import { useLocale } from '@/hooks/use-locale';

test('Loader renders with default styling and text', () => {
  render(
    <Loader
      classNameSpinner="border-cyan-500"
      classNameText="text-cyan-500"
      text={useLocale().search.loading}
      dataTestId="loader"
    />
  );

  const loader = screen.getByTestId('loader');
  expect(loader).toBeInTheDocument();

  const spinner = screen.getByTestId('loader-spinner');
  expect(spinner).toHaveClass('border-cyan-500');

  const text = screen.getByTestId('loader-text');
  expect(text).toHaveTextContent(useLocale().search.loading);
  expect(text).toHaveClass('text-cyan-500');
});
