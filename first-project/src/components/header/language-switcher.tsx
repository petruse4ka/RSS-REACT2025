'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import Toggle from '../ui/toggle';
import ukFlagIcon from '@/assets/icons/uk-flag.png';
import ruFlagIcon from '@/assets/icons/ru-flag.png';

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  const handleToggle = () => {
    const newLocale = locale === 'en' ? 'ru' : 'en';
    switchLocale(newLocale);
  };

  const isEnglish = locale === 'en';

  return isEnglish ? (
    <Toggle
      isActive={!isEnglish}
      onToggle={handleToggle}
      leftIcon={ukFlagIcon.src}
      rightIcon={ruFlagIcon.src}
      leftTitle={t('language.en')}
      rightTitle={t('language.ru')}
      activeSide={isEnglish ? 'right' : 'left'}
      dataTestId="language-switcher"
    />
  ) : (
    <Toggle
      isActive={!isEnglish}
      onToggle={handleToggle}
      leftIcon={ukFlagIcon.src}
      rightIcon={ruFlagIcon.src}
      leftTitle={t('language.en')}
      rightTitle={t('language.ru')}
      activeSide={isEnglish ? 'left' : 'right'}
      dataTestId="language-switcher"
    />
  );
}
