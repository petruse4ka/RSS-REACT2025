import Contact from './contact';
import { getContactsData } from '@/data';
import { useTranslations } from 'next-intl';

export default function Contacts() {
  const t = useTranslations();
  const contactsData = getContactsData(t);

  return (
    <section data-testid="contacts" className="mt-16">
      <h3 className="mb-8 text-center text-3xl font-semibold text-fuchsia-400 dark:text-cyan-300">
        {t('contacts.title')}
      </h3>
      <div data-testid="contacts-list" className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        {contactsData.map((contact, index) => (
          <Contact
            key={index}
            href={contact.href}
            imageSrc={contact.imageSrc.src}
            alt={contact.alt}
            contactInfo={contact.contactInfo}
            contactType={contact.contactType}
            target={contact.target}
            rel={contact.rel}
          />
        ))}
      </div>
    </section>
  );
}
