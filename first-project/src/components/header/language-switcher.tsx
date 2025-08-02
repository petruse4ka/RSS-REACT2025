import { useLocale } from '@/hooks/use-locale';
import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import Toggle from '../ui/toggle';
import ukFlagIcon from '@/assets/icons/uk-flag.png';
import ruFlagIcon from '@/assets/icons/ru-flag.png';

export default function LanguageSwitcher() {
  const translations = useLocale();
  const { language, setLanguage } = useContext(LanguageContext);

  const handleToggle = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <Toggle
      isActive={language === 'ru'}
      onToggle={handleToggle}
      leftIcon={ukFlagIcon}
      rightIcon={ruFlagIcon}
      leftTitle={translations.language.en}
      rightTitle={translations.language.ru}
      activeSide="right"
      dataTestId="language-switcher"
    />
  );
}
