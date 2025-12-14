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
      className="dark:text-shamrock-400 dark:border-shamrock-400 border-scooter-500 text-scooter-500 w-full border-b bg-zinc-50 px-5 py-4 lg:px-20 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-4 flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
          <Link
            data-testid="header-logo"
            to="/"
            className="dark:hover:text-shamrock-500 hover:text-scooter-400 flex items-end gap-3 transition-colors duration-300"
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
