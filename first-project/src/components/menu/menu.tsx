import { useState, useEffect } from 'react';
import { MENU_TEXTS } from '@/constants';
import MenuItem from './menu-item';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
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

  const handleWindowResize = () => {
    if (window.innerWidth >= 768 && isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav data-testid="menu" className="hidden items-center gap-6 md:flex">
        <MenuItem dataTestId="menu-homepage-link" to="/">
          {MENU_TEXTS.HOMEPAGE}
        </MenuItem>
        <MenuItem dataTestId="menu-about-link" to="/about">
          {MENU_TEXTS.ABOUT}
        </MenuItem>
      </nav>

      <div
        data-testid="burger-menu"
        className="relative z-[100] flex cursor-pointer flex-col items-center justify-center gap-2 md:hidden"
        onClick={toggleMenu}
      >
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
            isMenuOpen ? 'translate-y-1.5 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
            isMenuOpen ? '-translate-y-1 -rotate-45' : ''
          }`}
        />
      </div>

      {isMenuOpen && (
        <nav
          data-testid="mobile-menu"
          className="absolute inset-0 flex items-center justify-center bg-indigo-900"
        >
          <div className="flex flex-col items-center gap-8">
            <MenuItem dataTestId="mobile-menu-homepage-link" to="/" onClick={closeMenu}>
              {MENU_TEXTS.HOMEPAGE}
            </MenuItem>
            <MenuItem dataTestId="mobile-menu-about-link" to="/about" onClick={closeMenu}>
              {MENU_TEXTS.ABOUT}
            </MenuItem>
          </div>
        </nav>
      )}
    </>
  );
}
