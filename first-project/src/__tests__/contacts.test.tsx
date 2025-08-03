import { render, screen } from '@/__tests__/test-utils/test-utils';
import Contacts from '../components/contacts/contacts';
import { en } from '@/locale/en';
import { getContactsData } from '@/data';

test('Contacts component renders with all contact links', () => {
  render(<Contacts />);

  const heading = screen.getByTestId('contacts');
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(en.contacts.title);

  const contactLinks = screen.getAllByTestId('contact-link');
  expect(contactLinks).toHaveLength(4);

  expect(contactLinks[0]).toHaveAttribute('href', getContactsData(en)[0].href);
  expect(contactLinks[0]).toHaveTextContent(getContactsData(en)[0].contactInfo);

  expect(contactLinks[1]).toHaveAttribute('href', getContactsData(en)[1].href);
  expect(contactLinks[1]).toHaveTextContent(getContactsData(en)[1].contactInfo);

  expect(contactLinks[2]).toHaveAttribute('href', getContactsData(en)[2].href);
  expect(contactLinks[2]).toHaveTextContent(getContactsData(en)[2].contactInfo);

  expect(contactLinks[3]).toHaveAttribute('href', getContactsData(en)[3].href);
  expect(contactLinks[3]).toHaveTextContent(getContactsData(en)[3].contactInfo);
});
