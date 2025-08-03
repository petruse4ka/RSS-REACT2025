import linkedinIcon from '@/assets/images/contacts/linkedin.png';
import githubIcon from '@/assets/images/contacts/github.png';
import emailIcon from '@/assets/images/contacts/email.png';
import discordIcon from '@/assets/images/contacts/discord.png';
import { CONTACTS_URLS, CONTACTS_DATA } from '@/constants';
import type { Translations } from '@/locale';

export function getContactsData(translations: Translations) {
  return [
    {
      href: CONTACTS_URLS.LINKEDIN,
      imageSrc: linkedinIcon,
      alt: 'LinkedIn logo',
      contactInfo: translations.contacts.linkedinName,
      contactType: translations.contacts.linkedinLabel,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      href: CONTACTS_URLS.GITHUB,
      imageSrc: githubIcon,
      alt: 'GitHub logo',
      contactInfo: CONTACTS_DATA.GITHUB_NAME,
      contactType: translations.contacts.githubLabel,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      href: CONTACTS_URLS.EMAIL,
      imageSrc: emailIcon,
      alt: 'Email logo',
      contactInfo: CONTACTS_DATA.EMAIL_ADDRESS,
      contactType: translations.contacts.emailLabel,
    },
    {
      href: CONTACTS_URLS.DISCORD,
      imageSrc: discordIcon,
      alt: 'Discord logo',
      contactInfo: CONTACTS_DATA.DISCORD_NAME,
      contactType: translations.contacts.discordLabel,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];
}
