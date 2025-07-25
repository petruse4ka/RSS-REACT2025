import { CONTACTS_TEXTS } from '@/constants';
import Contact from './contact';
import { CONTACTS_DATA } from '@/data';

export default function Contacts() {
  return (
    <section data-testid="contacts" className="mt-16">
      <h3 className="mb-8 text-center text-3xl font-semibold text-cyan-300">
        {CONTACTS_TEXTS.TITLE}
      </h3>
      <div data-testid="contacts-list" className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        {CONTACTS_DATA.map((contact, index) => (
          <Contact
            key={index}
            href={contact.href}
            imageSrc={contact.imageSrc}
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
