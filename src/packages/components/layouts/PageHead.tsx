import type { PropsWithChildren, ReactNode } from 'react';

import cn from '@/designs/utils/cn';

interface Props {
  title: string;
  description?: string;
  /** small line above the title: a hand note, a date, a tag */
  eyebrow?: ReactNode;
  /** right column of the panel: a portrait, a cover image */
  aside?: ReactNode;
  /** leave room at the bottom for content placed with `on-panel-edge` */
  overlap?: boolean;
  className?: string;
}

/**
 * The deep-green panel that opens every inner page, the same one the Home hero
 * uses. Children go under the description (buttons, a search field, meta).
 */
function PageHead({ title, description, eyebrow, aside, overlap, className, children }: PropsWithChildren<Props>) {
  return (
    <div className={cn(['wide-container pt-1', className])}>
      <header
        className={cn([
          'rounded-[32px] bg-hero px-6 pt-9 text-hero-content sm:px-10 lg:rounded-[40px] lg:px-14 lg:pt-12',
          overlap ? 'pb-28 lg:pb-36' : 'pb-9 lg:pb-12'
        ])}
      >
        <div className={cn(['grid grid-cols-1 items-center gap-9', aside && 'lg:grid-cols-[1.35fr_1fr] lg:gap-10'])}>
          <div className="min-w-0">
            {eyebrow && <div className="mb-2 font-hand text-[22px] leading-none text-hero-note sm:text-2xl">{eyebrow}</div>}
            <h1 className="text-balance font-display text-[34px] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[54px]">
              {title}
            </h1>
            {description && <p className="mt-4 max-w-[600px] text-[17px] opacity-85 lg:text-lg">{description}</p>}
            {children}
          </div>
          {aside}
        </div>
      </header>
    </div>
  );
}

export default PageHead;
