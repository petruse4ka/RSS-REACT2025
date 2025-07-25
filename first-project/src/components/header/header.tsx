import { Link } from 'react-router-dom';
import { HEADER_TEXTS } from '@/constants';
import Menu from '@/components/menu/menu';
import logoImage from '@/assets/images/logo.png';

export default function Header() {
  return (
    <header data-testid="header" className="w-full bg-indigo-900 py-4 text-white">
      <div className="container mx-auto flex items-center justify-between px-5 md:px-20">
        <Link
          data-testid="header-logo"
          to="/"
          className="flex items-center gap-3 transition-all duration-300 hover:text-cyan-300"
        >
          <img src={logoImage} alt="Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">{HEADER_TEXTS.LOGO}</h1>
        </Link>
        <Menu />
      </div>
    </header>
  );
}
