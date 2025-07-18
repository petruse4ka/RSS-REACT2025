import { render, screen } from '@/tests/test-utils/test-utils';
import Loader from './loader';
import { SEARCH_TEXTS } from '@/constants';

test('Loader renders with default styling and text', () => {
  const props = {
    classNameSpinner: 'border-cyan-500',
    classNameText: 'text-cyan-500',
    text: SEARCH_TEXTS.LOADING,
    dataTestId: 'loader',
  };

  render(<Loader {...props} />);

  const loader = screen.getByTestId('loader');
  expect(loader).toBeInTheDocument();

  const spinner = screen.getByTestId('loader-spinner');
  expect(spinner).toHaveClass('border-cyan-500');

  const text = screen.getByTestId('loader-text');
  expect(text).toHaveTextContent(SEARCH_TEXTS.LOADING);
});
