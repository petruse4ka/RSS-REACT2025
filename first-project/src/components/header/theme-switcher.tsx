import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import Toggle from '../ui/toggle';
import sunIcon from '@/assets/icons/sun.png';
import moonIcon from '@/assets/icons/moon.png';

export default function ThemeSwitcher() {
  const translations = useLocale();
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Toggle
      isActive={theme === 'dark'}
      onToggle={handleToggle}
      leftIcon={sunIcon}
      rightIcon={moonIcon}
      leftTitle={translations.theme.light}
      rightTitle={translations.theme.dark}
      activeSide="right"
    />
  );
}
