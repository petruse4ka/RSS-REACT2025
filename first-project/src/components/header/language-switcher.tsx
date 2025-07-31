import { useState } from 'react';
import { useLocale } from '@/hooks/use-locale';
import Toggle from '../ui/toggle';
import ukFlagIcon from '@/assets/icons/uk-flag.png';
import ruFlagIcon from '@/assets/icons/ru-flag.png';

export default function LanguageSwitcher() {
  const [isActive, setIsActive] = useState(false);
  const translations = useLocale();

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <Toggle
      isActive={isActive}
      onToggle={handleToggle}
      leftIcon={ukFlagIcon}
      rightIcon={ruFlagIcon}
      leftTitle={translations.language.en}
      rightTitle={translations.language.ru}
      activeSide="right"
    />
  );
}
