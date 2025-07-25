import { render, screen } from '@/__tests__/test-utils/test-utils';
import AboutAuthor from '../components/about/about-author';
import { ABOUT_TEXTS } from '@/constants';

test('AboutAuthor component renders with author information', () => {
  render(<AboutAuthor />);

  const authorImage = screen.getByTestId('about-author-image');
  expect(authorImage).toBeInTheDocument();

  const description1 = screen.getByTestId('about-author-description-1');
  expect(description1).toBeInTheDocument();
  expect(description1).toHaveTextContent(ABOUT_TEXTS.BACKGROUND_DESCRIPTION_1);

  const description2 = screen.getByTestId('about-author-description-2');
  expect(description2).toBeInTheDocument();
  expect(description2).toHaveTextContent(ABOUT_TEXTS.BACKGROUND_DESCRIPTION_2);

  const description3 = screen.getByTestId('about-author-description-3');
  expect(description3).toBeInTheDocument();
  expect(description3).toHaveTextContent(ABOUT_TEXTS.BACKGROUND_DESCRIPTION_3);
});
