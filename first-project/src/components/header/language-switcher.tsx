import { useTranslations } from 'next-intl';
import Toggle from '../ui/toggle';
import ukFlagIcon from '@/assets/icons/uk-flag.png';
import ruFlagIcon from '@/assets/icons/ru-flag.png';

export default function LanguageSwitcher() {
  const t = useTranslations();

  const handleToggle = () => {
    console.log('language switched');
  };

  return (
    <Toggle
      isActive={true}
      onToggle={handleToggle}
      leftIcon={ukFlagIcon.src}
      rightIcon={ruFlagIcon.src}
      leftTitle={t('language.en')}
      rightTitle={t('language.ru')}
      activeSide="right"
      dataTestId="language-switcher"
    />
  );
}
