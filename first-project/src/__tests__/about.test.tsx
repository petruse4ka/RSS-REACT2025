import { render, screen } from '@/__tests__/test-utils/test-utils';
import About from '../pages/about';
import { useLocale } from '@/hooks/use-locale';

test('About page renders with all sections', () => {
  render(<About />);

  const aboutPage = screen.getByTestId('about-page');
  expect(aboutPage).toBeInTheDocument();

  const header = screen.getByTestId('about-header');
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent(useLocale().about.title);
  expect(header).toHaveTextContent(useLocale().about.subtitle);

  const aboutAuthorImage = screen.getByTestId('about-author-image');
  expect(aboutAuthorImage).toBeInTheDocument();

  const aboutAuthorDescription = screen.getByTestId('about-author-description');
  expect(aboutAuthorDescription).toBeInTheDocument();
  expect(aboutAuthorDescription).toHaveTextContent(useLocale().about.backgroundDescription[0]);
  expect(aboutAuthorDescription).toHaveTextContent(useLocale().about.backgroundDescription[1]);
  expect(aboutAuthorDescription).toHaveTextContent(useLocale().about.backgroundDescription[2]);

  const contacts = screen.getByTestId('contacts');
  expect(contacts).toBeInTheDocument();

  const aboutSchool = screen.getByTestId('about-school');
  expect(aboutSchool).toBeInTheDocument();
});
