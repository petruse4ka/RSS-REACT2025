import { useLocale } from '@/hooks/use-locale';
import { useContext } from 'react';
import { ThemeContext } from '@/context/theme-context';
import Toggle from '../ui/toggle';
import sunIcon from '@/assets/icons/sun.png';
import moonIcon from '@/assets/icons/moon.png';

export default function ThemeSwitcher() {
  const translations = useLocale();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Toggle
      isActive={theme === 'dark'}
      onToggle={handleToggle}
      leftIcon={sunIcon.src}
      rightIcon={moonIcon.src}
      leftTitle={translations.theme.light}
      rightTitle={translations.theme.dark}
      activeSide="right"
      dataTestId="theme-switcher"
    />
  );
}
