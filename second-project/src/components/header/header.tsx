import { Link } from 'react-router-dom';
import ThemeSwitcher from './theme-switcher';
import LanguageSwitcher from './language-switcher';
import { useLocale } from '@/hooks/use-locale';
import logoImage from '@/assets/images/logo.png';

export default function Header() {
  const translations = useLocale();

  return (
    <header
      data-testid="header"
      className="w-full bg-white px-5 py-4 text-cyan-400 lg:px-20 dark:bg-indigo-900 dark:text-yellow-300"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-4 flex items-center justify-between">
          <Link
            data-testid="header-logo"
            to="/"
            className="flex items-center gap-3 transition-all duration-300 hover:text-yellow-300 dark:hover:text-cyan-400"
          >
            <img src={logoImage} alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold">{translations.header.logo}</h1>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
