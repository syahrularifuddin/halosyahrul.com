import { ArrowRight } from 'lucide-react';

import cn from '@/designs/utils/cn';
import type { ContentMeta } from '@/modules/Content/services/content-parser';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import dt from '@/packages/libs/DayJS/dt';

interface Props {
  post: ContentMeta;
  className?: string;
}

/**
 * A post as one row of the Home "Latest writing" list: the date as a small
 * calendar tile, the title and summary, the tag. The whole row is the link.
 */
function PostCard({ post, className }: Props) {
  const tag = post.tags?.find((item) => item.toLowerCase() !== 'featured');
  const date = dt(post.date);

  return (
    <article className={cn(['group relative flex items-center gap-4 p-5 transition-colors duration-200 hover:bg-base-100 sm:gap-6 sm:p-6', className])}>
      <time
        dateTime={post.date}
        className="flex h-[60px] w-[60px] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl bg-lilac-soft leading-none text-lilac"
      >
        <span className="font-display text-[22px] font-extrabold">{date.format('DD')}</span>
        <span className="font-mono text-[11px] font-medium">{date.format('MMM YY')}</span>
      </time>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.01em] sm:text-[22px]">
          {/* stretched link: the whole row is the click target */}
          <NextLink
            withCurrentLocale
            href={`/blog/${post.slugOriginal}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </NextLink>
        </h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-muted">{post.description}</p>
      </div>
      {tag && (
        <span className="hidden rounded-lg bg-base-100 px-2.5 py-1 font-mono text-xs font-medium text-muted group-hover:bg-card sm:inline">
          #{tag}
        </span>
      )}
      <span className="hidden font-mono text-xs text-muted md:inline">
        {Math.max(1, Math.ceil(post.readTime.minutes))} min
      </span>
      <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-base-content" />
    </article>
  );
}

export default PostCard;
