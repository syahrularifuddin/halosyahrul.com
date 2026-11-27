import { ArrowRight, Star } from 'lucide-react';

import cn from '@/designs/utils/cn';
import BlogContentInfo from '@/modules/Blog/components/ContentInfo';
import type { ContentMeta } from '@/modules/Content/services/content-parser';
import NextLink from '@/packages/components/base/Navigations/NextLink';

interface Props {
  blog: ContentMeta;
  readLabel: string;
  className?: string;
}

/** The featured post: a wide card, the title on a colour block beside the summary */
function FeaturedHero({ blog, readLabel, className }: Props) {
  return (
    <article
      className={cn([
        'lift group relative grid overflow-hidden rounded-[28px] bg-card shadow-soft md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]',
        className
      ])}
    >
      <div className="flex flex-col justify-between gap-10 bg-brand-soft p-7 text-brand md:p-9">
        <span className="flex items-center gap-1.5 font-mono text-xs font-medium">
          <Star aria-hidden className="h-3.5 w-3.5 fill-current" />
          Featured
        </span>
        <h2 className="font-display text-[32px] font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-[42px]">
          {/* stretched link: the whole card is the click target */}
          <NextLink
            withCurrentLocale
            href={`/blog/${blog.slugOriginal}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {blog.title}
          </NextLink>
        </h2>
      </div>
      <div className="flex flex-col gap-5 p-7 md:p-9">
        <p className="line-clamp-5 text-[17px] text-muted">{blog.description}</p>
        {blog.tags && blog.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {blog.tags.slice(0, 4).map((tag) => (
              <li key={tag} className="rounded-lg bg-base-100 px-2.5 py-1 font-mono text-xs font-medium text-muted">
                #{tag}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <BlogContentInfo meta={blog} className="justify-start font-mono text-muted" />
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            {readLabel}
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default FeaturedHero;
