import { render, screen } from '@/__tests__/test-utils/test-utils';
import Contacts from '../components/contacts/contacts';
import { CONTACTS_TEXTS } from '@/constants';
import { CONTACTS_DATA } from '@/data';

test('Contacts component renders with all contact links', () => {
  render(<Contacts />);

  const heading = screen.getByTestId('contacts');
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(CONTACTS_TEXTS.TITLE);

  const contactLinks = screen.getAllByTestId('contact-link');
  expect(contactLinks).toHaveLength(4);

  expect(contactLinks[0]).toHaveAttribute('href', CONTACTS_DATA[0].href);
  expect(contactLinks[0]).toHaveTextContent(CONTACTS_DATA[0].contactInfo);

  expect(contactLinks[1]).toHaveAttribute('href', CONTACTS_DATA[1].href);
  expect(contactLinks[1]).toHaveTextContent(CONTACTS_DATA[1].contactInfo);

  expect(contactLinks[2]).toHaveAttribute('href', CONTACTS_DATA[2].href);
  expect(contactLinks[2]).toHaveTextContent(CONTACTS_DATA[2].contactInfo);

  expect(contactLinks[3]).toHaveAttribute('href', CONTACTS_DATA[3].href);
  expect(contactLinks[3]).toHaveTextContent(CONTACTS_DATA[3].contactInfo);
});
