import { render, screen } from '@/__tests__/test-utils/test-utils';
import Contacts from '../components/contacts/contacts';
import { useLocale } from '@/hooks/use-locale';
import { getContactsData } from '@/data';

test('Contacts component renders with all contact links', () => {
  render(<Contacts />);

  const heading = screen.getByTestId('contacts');
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(useLocale().contacts.title);

  const contactLinks = screen.getAllByTestId('contact-link');
  expect(contactLinks).toHaveLength(4);

  expect(contactLinks[0]).toHaveAttribute('href', getContactsData(useLocale())[0].href);
  expect(contactLinks[0]).toHaveTextContent(getContactsData(useLocale())[0].contactInfo);

  expect(contactLinks[1]).toHaveAttribute('href', getContactsData(useLocale())[1].href);
  expect(contactLinks[1]).toHaveTextContent(getContactsData(useLocale())[1].contactInfo);

  expect(contactLinks[2]).toHaveAttribute('href', getContactsData(useLocale())[2].href);
  expect(contactLinks[2]).toHaveTextContent(getContactsData(useLocale())[2].contactInfo);

  expect(contactLinks[3]).toHaveAttribute('href', getContactsData(useLocale())[3].href);
  expect(contactLinks[3]).toHaveTextContent(getContactsData(useLocale())[3].contactInfo);
});
