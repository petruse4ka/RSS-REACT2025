import { MENU_TEXTS } from '@/constants';
import MenuItem from './menu-item';

export default function Menu() {
  return (
    <nav data-testid="menu" className="flex items-center gap-6">
      <MenuItem dataTestId="menu-homepage-link" href="/">
        {MENU_TEXTS.HOMEPAGE}
      </MenuItem>
      <MenuItem dataTestId="menu-about-link" href="/about">
        {MENU_TEXTS.ABOUT_US}
      </MenuItem>
    </nav>
  );
}
