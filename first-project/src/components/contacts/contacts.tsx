import linkedinIcon from '@/assets/images/contacts/linkedin.png';
import githubIcon from '@/assets/images/contacts/github.png';
import emailIcon from '@/assets/images/contacts/email.png';
import discordIcon from '@/assets/images/contacts/discord.png';
import { CONTACTS_TEXTS, CONTACTS_URLS } from '@/constants';
import Contact from './contact';

export default function Contacts() {
  return (
    <section data-testid="contacts" className="mt-16">
      <h3 className="mb-8 text-center text-3xl font-semibold text-cyan-300">
        {CONTACTS_TEXTS.TITLE}
      </h3>
      <div data-testid="contacts-list" className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        <Contact
          href={CONTACTS_URLS.LINKEDIN}
          imageSrc={linkedinIcon}
          alt="LinkedIn logo"
          contactInfo={CONTACTS_TEXTS.LINKEDIN_NAME}
          contactType={CONTACTS_TEXTS.LINKEDIN_LABEL}
          target="_blank"
          rel="noopener noreferrer"
        />

        <Contact
          href={CONTACTS_URLS.GITHUB}
          imageSrc={githubIcon}
          alt="GitHub logo"
          contactInfo={CONTACTS_TEXTS.GITHUB_NAME}
          contactType={CONTACTS_TEXTS.GITHUB_LABEL}
          target="_blank"
          rel="noopener noreferrer"
        />

        <Contact
          href={CONTACTS_URLS.EMAIL}
          imageSrc={emailIcon}
          alt="Email logo"
          contactInfo={CONTACTS_TEXTS.EMAIL_ADDRESS}
          contactType={CONTACTS_TEXTS.EMAIL_LABEL}
        />

        <Contact
          href={CONTACTS_URLS.DISCORD}
          imageSrc={discordIcon}
          alt="Discord logo"
          contactInfo={CONTACTS_TEXTS.DISCORD_NAME}
          contactType={CONTACTS_TEXTS.DISCORD_LABEL}
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </section>
  );
}
