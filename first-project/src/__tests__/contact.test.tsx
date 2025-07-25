import { render, screen } from '@/__tests__/test-utils/test-utils';
import Contact from '../components/contacts/contact';

test('Contact component renders with correct props', () => {
  render(
    <Contact
      href="https://test-url-for-testing-purposes.com"
      imageSrc="/test-icon.png"
      alt="Test icon"
      contactInfo="Test Info"
      contactType="Test Type"
      target="_blank"
      rel="noopener noreferrer"
    />
  );

  const link = screen.getByTestId('contact-link');
  expect(link).toHaveAttribute('href', 'https://test-url-for-testing-purposes.com');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');

  const name = screen.getByTestId('contact-info');
  expect(name).toBeInTheDocument();
  expect(name).toHaveTextContent('Test Info');

  const label = screen.getByTestId('contact-type');
  expect(label).toBeInTheDocument();
  expect(label).toHaveTextContent('Test Type');

  const icon = screen.getByTestId('contact-image');
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute('src', '/test-icon.png');
  expect(icon).toHaveAttribute('alt', 'Test icon');
});
