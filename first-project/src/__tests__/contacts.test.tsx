import { render, screen } from '@/__tests__/test-utils/test-utils';
import Contacts from '../components/contacts/contacts';
import { CONTACTS_TEXTS, CONTACTS_URLS } from '@/constants';

test('Contacts component renders with all contact links', () => {
  render(<Contacts />);

  const heading = screen.getByTestId('contacts');
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(CONTACTS_TEXTS.TITLE);

  const contactLinks = screen.getAllByTestId('contact-link');
  expect(contactLinks).toHaveLength(4);

  expect(contactLinks[0]).toHaveAttribute('href', CONTACTS_URLS.LINKEDIN);
  expect(contactLinks[0]).toHaveTextContent(CONTACTS_TEXTS.LINKEDIN_NAME);

  expect(contactLinks[1]).toHaveAttribute('href', CONTACTS_URLS.GITHUB);
  expect(contactLinks[1]).toHaveTextContent(CONTACTS_TEXTS.GITHUB_NAME);

  expect(contactLinks[2]).toHaveAttribute('href', CONTACTS_URLS.EMAIL);
  expect(contactLinks[2]).toHaveTextContent(CONTACTS_TEXTS.EMAIL_ADDRESS);

  expect(contactLinks[3]).toHaveAttribute('href', CONTACTS_URLS.DISCORD);
  expect(contactLinks[3]).toHaveTextContent(CONTACTS_TEXTS.DISCORD_NAME);
});
