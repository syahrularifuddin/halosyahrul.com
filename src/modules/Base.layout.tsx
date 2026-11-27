import { PropsWithChildren } from 'react';

import TopLoader from '@/packages/components/base/Loaders/TopLoader';
import CommandPalette from '@/packages/components/layouts/CommandPalette/CommandPalette';
import Footer from '@/packages/components/layouts/Footer/Footer';
import Header from '@/packages/components/layouts/Header/Header';
import AppThemeInitializer from '@/packages/libs/AppTheme/AppThemeInitializer';

function BaseLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col pb-24 md:pb-0">
      <TopLoader height={3} showShadow />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <CommandPalette />
      <AppThemeInitializer />
    </div>
  );
}

export default BaseLayout;
