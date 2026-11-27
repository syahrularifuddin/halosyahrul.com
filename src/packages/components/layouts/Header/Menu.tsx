'use client';

import { Briefcase, Clock, Home, PenTool, Search, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

import cn from '@/designs/utils/cn';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import useLangugage from '@/packages/libs/I18n/i18n.client';

import useCommandPalette from '../CommandPalette/useCommandPalette';

/** a square control inside the header island */
export const ISLAND_BUTTON = 'grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl text-base-content transition-colors duration-200 hover:bg-base-200';

const menuItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { label: 'Blog', href: '/blog', icon: PenTool },
  { label: 'Now', href: '/now', icon: Clock },
  { label: 'About', href: '/about', icon: User }
];

/** Whether `route` (a menu route, without language prefix) is the page being viewed */
function useIsActiveRoute() {
  const pathname = usePathname();
  const currentLang = useLangugage();

  return (route: string): boolean => {
    if (route === '/') {
      return pathname === '/' || pathname === `/${currentLang}` || pathname === '/en' || pathname === '/id';
    }
    return pathname?.includes(route) || false;
  };
}

/** Text navigation inside the header island, from the `md` breakpoint up */
export function DesktopMenu() {
  const isActiveRoute = useIsActiveRoute();

  return (
    <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
      {menuItems.map((item) => {
        const isActive = isActiveRoute(item.href);

        return (
          <NextLink
            key={item.href}
            withCurrentLocale
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn([
              'rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors duration-200',
              isActive ? 'bg-base-content text-base-100' : 'text-muted hover:bg-base-200 hover:text-base-content'
            ])}
          >
            {item.label}
          </NextLink>
        );
      })}
    </nav>
  );
}

/**
 * Tab bar docked to the bottom of the screen below the `md` breakpoint: the
 * five destinations stay one thumb tap away, no menu to open.
 */
export function MobileTabBar() {
  const isActiveRoute = useIsActiveRoute();

  return (
    <nav
      aria-label="Main"
      className="floating-glass fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 grid grid-cols-5 gap-1 rounded-[22px] p-1.5 md:hidden"
    >
      {menuItems.map((item) => {
        const isActive = isActiveRoute(item.href);
        return (
          <NextLink
            key={item.href}
            withCurrentLocale
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn([
              'flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold leading-none transition-colors duration-200',
              isActive ? 'bg-base-content text-base-100' : 'text-muted'
            ])}
          >
            <item.icon aria-hidden className="h-5 w-5" />
            {item.label}
          </NextLink>
        );
      })}
    </nav>
  );
}

/** Opens the same palette as Cmd+K */
export function SearchButton() {
  const { setIsOpen } = useCommandPalette();
  const lang = useLangugage();
  const label = lang === 'id' ? 'Cari (Ctrl+K)' : 'Search (Ctrl+K)';

  return (
    <button type="button" onClick={() => setIsOpen(true)} aria-label={label} title={label} className={ISLAND_BUTTON}>
      <Search aria-hidden className="h-[18px] w-[18px]" />
    </button>
  );
}
