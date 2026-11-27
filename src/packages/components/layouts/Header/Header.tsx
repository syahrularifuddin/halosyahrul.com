'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import { SITE_NAME } from '@/configs/sites';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import { APP_THEME_SELECTION_ENABLED } from '@/packages/libs/AppTheme/constants';
import useLangugage from '@/packages/libs/I18n/i18n.client';
import { I18n } from '@/packages/libs/I18n/interface';

import AppThemeSelector from './AppThemeSelector';
import BackButton from './BackButton';
import LanguageSelector from './LanguageSelector';
import { DesktopMenu, MobileTabBar, SearchButton } from './Menu';

export default function Header() {
  const lang = useLangugage();

  // the root layout is rendered once without the language of the route, so
  // <html lang> is corrected here, on load and on every language switch
  useEffect(() => {
    document.documentElement.lang = I18n[lang].replace('_', '-').toLowerCase();
  }, [lang]);

  return (
    <>
      {/* one island floats over the page: name, destinations and controls share it */}
      <header className="pointer-events-none sticky top-0 z-40">
        <div className="wide-container py-3 md:py-[18px]">
          <div className="floating-glass pointer-events-auto flex h-[52px] items-center gap-1 rounded-[20px] pl-1.5 pr-1.5 md:h-[58px] md:pl-2.5 md:pr-2">
            <BackButton />
            <NextLink
              withCurrentLocale
              href="/"
              className="mr-auto flex min-w-0 items-center gap-2.5 rounded-xl py-1 pr-3 font-display text-lg font-bold tracking-tight"
            >
              <Image
                src="/android-chrome-192x192.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-[11px]"
              />
              <span className="truncate">{SITE_NAME}</span>
            </NextLink>

            <DesktopMenu />
            <span aria-hidden className="mx-1.5 hidden h-6 w-px bg-line md:block" />
            <SearchButton />
            <LanguageSelector />
            {APP_THEME_SELECTION_ENABLED && <AppThemeSelector />}
          </div>
        </div>
      </header>
      <MobileTabBar />
    </>
  );
}
