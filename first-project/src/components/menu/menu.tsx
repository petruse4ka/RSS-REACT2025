import { useState, useEffect } from 'react';
import { useLocale } from '@/hooks/use-locale';
import MenuItem from './menu-item';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translations = useLocale();

  const toggleMenu = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [isMenuOpen]);

  return (
    <>
      <nav data-testid="menu" className="hidden items-center gap-6 md:flex">
        <MenuItem dataTestId="menu-homepage-link" to="/">
          {translations.menu.homepage}
        </MenuItem>
        <MenuItem dataTestId="menu-about-link" to="/about">
          {translations.menu.about}
        </MenuItem>
      </nav>

      <div
        data-testid="burger-menu"
        className="grouprelative z-[100] flex cursor-pointer flex-col items-center justify-center gap-2 transition-all duration-300 md:hidden"
        onClick={toggleMenu}
      >
        <span
          className={`block h-0.5 w-6 bg-cyan-600 transition-all duration-300 dark:bg-white ${
            isMenuOpen ? 'translate-y-1.5 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-cyan-600 transition-all duration-300 dark:bg-white ${
            isMenuOpen ? '-translate-y-1 -rotate-45' : ''
          }`}
        />
      </div>

      <nav
        data-testid="mobile-menu"
        className={`absolute inset-0 z-[50] flex items-center justify-center bg-white transition-all duration-300 dark:bg-indigo-900 ${
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`flex flex-col items-center gap-8 transition-all duration-300 ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <MenuItem dataTestId="mobile-menu-homepage-link" to="/" onClick={closeMenu}>
            {translations.menu.homepage}
          </MenuItem>
          <MenuItem dataTestId="mobile-menu-about-link" to="/about" onClick={closeMenu}>
            {translations.menu.about}
          </MenuItem>
        </div>
      </nav>
    </>
  );
}
