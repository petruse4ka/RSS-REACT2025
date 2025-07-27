import { render, screen } from '@/__tests__/test-utils/test-utils';
import About from '../pages/about';
import { ABOUT_TEXTS } from '@/constants';

test('About page renders with all sections', () => {
  render(<About />);

  const aboutPage = screen.getByTestId('about-page');
  expect(aboutPage).toBeInTheDocument();

  const header = screen.getByTestId('about-header');
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent(ABOUT_TEXTS.TITLE);
  expect(header).toHaveTextContent(ABOUT_TEXTS.SUBTITLE);

  const aboutAuthorImage = screen.getByTestId('about-author-image');
  expect(aboutAuthorImage).toBeInTheDocument();

  const aboutAuthorDescription = screen.getByTestId('about-author-description');
  expect(aboutAuthorDescription).toBeInTheDocument();
  expect(aboutAuthorDescription).toHaveTextContent(ABOUT_TEXTS.BACKGROUND_DESCRIPTION[0]);
  expect(aboutAuthorDescription).toHaveTextContent(ABOUT_TEXTS.BACKGROUND_DESCRIPTION[1]);
  expect(aboutAuthorDescription).toHaveTextContent(ABOUT_TEXTS.BACKGROUND_DESCRIPTION[2]);

  const contacts = screen.getByTestId('contacts');
  expect(contacts).toBeInTheDocument();

  const aboutSchool = screen.getByTestId('about-school');
  expect(aboutSchool).toBeInTheDocument();
});
