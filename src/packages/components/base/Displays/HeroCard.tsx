import type { PropsWithChildren } from 'react';

import cn from '@/designs/utils/cn';

interface Props {
  className?: string;
}

/** The card long-form content sits in: About, Now and the body of a post. */
function HeroCard({ className, children }: PropsWithChildren<Props>) {
  return (
    <div className={cn(['rounded-[28px] bg-card p-6 shadow-soft sm:p-9 lg:p-12', className])}>
      {children}
    </div>
  );
}

export default HeroCard;
