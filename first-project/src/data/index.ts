import linkedinIcon from '@/assets/images/contacts/linkedin.png';
import githubIcon from '@/assets/images/contacts/github.png';
import emailIcon from '@/assets/images/contacts/email.png';
import discordIcon from '@/assets/images/contacts/discord.png';
import { CONTACTS_URLS, CONTACTS_DATA } from '@/constants';
import { useTranslations } from 'next-intl';

export function getContactsData(t: ReturnType<typeof useTranslations>) {
  return [
    {
      href: CONTACTS_URLS.LINKEDIN,
      imageSrc: linkedinIcon,
      alt: 'LinkedIn logo',
      contactInfo: t('contacts.linkedinName'),
      contactType: t('contacts.linkedinLabel'),
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      href: CONTACTS_URLS.GITHUB,
      imageSrc: githubIcon,
      alt: 'GitHub logo',
      contactInfo: CONTACTS_DATA.GITHUB_NAME,
      contactType: t('contacts.githubLabel'),
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      href: CONTACTS_URLS.EMAIL,
      imageSrc: emailIcon,
      alt: 'Email logo',
      contactInfo: CONTACTS_DATA.EMAIL_ADDRESS,
      contactType: t('contacts.emailLabel'),
    },
    {
      href: CONTACTS_URLS.DISCORD,
      imageSrc: discordIcon,
      alt: 'Discord logo',
      contactInfo: CONTACTS_DATA.DISCORD_NAME,
      contactType: t('contacts.discordLabel'),
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];
}
