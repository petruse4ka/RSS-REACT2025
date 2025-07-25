import linkedinIcon from '@/assets/images/contacts/linkedin.png';
import githubIcon from '@/assets/images/contacts/github.png';
import emailIcon from '@/assets/images/contacts/email.png';
import discordIcon from '@/assets/images/contacts/discord.png';
import { CONTACTS_TEXTS, CONTACTS_URLS } from '@/constants';

export const CONTACTS_DATA = [
  {
    href: CONTACTS_URLS.LINKEDIN,
    imageSrc: linkedinIcon,
    alt: 'LinkedIn logo',
    contactInfo: CONTACTS_TEXTS.LINKEDIN_NAME,
    contactType: CONTACTS_TEXTS.LINKEDIN_LABEL,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    href: CONTACTS_URLS.GITHUB,
    imageSrc: githubIcon,
    alt: 'GitHub logo',
    contactInfo: CONTACTS_TEXTS.GITHUB_NAME,
    contactType: CONTACTS_TEXTS.GITHUB_LABEL,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    href: CONTACTS_URLS.EMAIL,
    imageSrc: emailIcon,
    alt: 'Email logo',
    contactInfo: CONTACTS_TEXTS.EMAIL_ADDRESS,
    contactType: CONTACTS_TEXTS.EMAIL_LABEL,
  },
  {
    href: CONTACTS_URLS.DISCORD,
    imageSrc: discordIcon,
    alt: 'Discord logo',
    contactInfo: CONTACTS_TEXTS.DISCORD_NAME,
    contactType: CONTACTS_TEXTS.DISCORD_LABEL,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];
