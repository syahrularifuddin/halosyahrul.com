import { ReactNode } from 'react';

import NextLink from '@/packages/components/base/Navigations/NextLink';

interface Props {
  title: string;
  /** hand-written note next to the title */
  hand?: ReactNode;
  description: string;
  linkLabel: string;
  linkHref: string;
}

/** Title and summary on the left, the "see all" link as a small card on the right */
function SectionHead({ title, hand, description, linkLabel, linkHref }: Props) {
  return (
    <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h2 className="font-display text-[30px] font-extrabold leading-none tracking-[-0.03em] sm:text-[40px]">
          {title}
          {hand}
        </h2>
        <p className="mt-2.5 text-[15px] text-muted">{description}</p>
      </div>
      <NextLink
        withCurrentLocale
        href={linkHref}
        className="whitespace-nowrap rounded-2xl bg-card px-4 py-2.5 text-sm font-semibold shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
      >
        {linkLabel}
      </NextLink>
    </div>
  );
}

export default SectionHead;
