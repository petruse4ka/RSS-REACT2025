import { render, screen } from '@/__tests__/test-utils/test-utils';
import AboutSchool from '../components/about/about-school';
import { en } from '@/locale/en';
import { RS_SCHOOL_URL } from '@/constants';

test('AboutSchool component renders with RS School information', () => {
  render(<AboutSchool />);

  const heading = screen.getByTestId('about-school-title');
  expect(heading).toBeInTheDocument();

  const description = screen.getByTestId('about-school-description');
  expect(description).toBeInTheDocument();
  expect(description).toHaveTextContent(en.about.learningJourneyDescription);

  const button = screen.getByTestId('about-school-button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(en.about.rsSchoolButton);

  const logo = screen.getByTestId('about-school-logo');
  expect(logo).toBeInTheDocument();

  const link = screen.getByTestId('about-school-link');
  expect(link).toHaveAttribute('href', RS_SCHOOL_URL);
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});
