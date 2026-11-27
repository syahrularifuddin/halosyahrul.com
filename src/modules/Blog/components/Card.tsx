import { ArrowRight, Star } from 'lucide-react';

import cn from '@/designs/utils/cn';
import type { ContentMeta } from '@/modules/Content/services/content-parser';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import dt from '@/packages/libs/DayJS/dt';

export interface BlogCardProps {
  blog: ContentMeta;
  className?: string;
  isFeatured?: boolean;
}

const TONES = [
  'bg-lilac-soft text-lilac',
  'bg-teal-soft text-teal',
  'bg-brand-soft text-brand',
  'bg-rose-soft text-rose'
];

/**
 * A post in the blog grid: a colour block with the date tile and the first tag,
 * then the title, the summary and the read time. The tone follows the date, so
 * a post keeps its colour wherever it lands in the grid.
 */
function BlogCard({ blog, className, isFeatured }: BlogCardProps) {
  const date = dt(blog.date);
  const tag = blog.tags?.find((item) => item.toLowerCase() !== 'featured');

  return (
    <article className={cn(['lift group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-card shadow-soft', className])}>
      <div className={cn(['flex items-start justify-between gap-3 p-5', TONES[date.date() % TONES.length]])}>
        <time
          dateTime={blog.date}
          className="flex h-[60px] w-[60px] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl bg-card leading-none shadow-soft"
        >
          <span className="font-display text-[22px] font-extrabold">{date.format('DD')}</span>
          <span className="font-mono text-[11px] font-medium">{date.format('MMM YY')}</span>
        </time>
        <span className="flex items-center gap-1.5 font-mono text-xs font-medium">
          {isFeatured && <Star aria-label="Featured" className="h-3.5 w-3.5 fill-current" />}
          {tag && `#${tag}`}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h2 className="font-display text-[22px] font-bold leading-snug tracking-[-0.01em]">
          {/* stretched link: the whole card is the click target */}
          <NextLink
            withCurrentLocale
            href={`/blog/${blog.slugOriginal}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {blog.title}
          </NextLink>
        </h2>
        <p className="line-clamp-3 text-[15px] text-muted">{blog.description}</p>
        <div className="mt-auto flex items-center justify-between pt-4 font-mono text-xs text-muted">
          <span>{blog.readTime.text}</span>
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-base-content" />
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
