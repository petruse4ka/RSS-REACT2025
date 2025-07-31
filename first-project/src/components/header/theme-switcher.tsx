import { useState } from 'react';
import { useLocale } from '@/hooks/use-locale';
import Toggle from '../ui/toggle';
import sunIcon from '@/assets/icons/sun.png';
import moonIcon from '@/assets/icons/moon.png';

export default function ThemeSwitcher() {
  const [isActive, setIsActive] = useState(true);
  const translations = useLocale();

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <Toggle
      isActive={isActive}
      onToggle={handleToggle}
      leftIcon={sunIcon}
      rightIcon={moonIcon}
      leftTitle={translations.theme.light}
      rightTitle={translations.theme.dark}
      activeSide="right"
    />
  );
}
