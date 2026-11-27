'use client';

import { ArrowRight } from 'lucide-react';
import { useMemo } from 'react';

import NextLink from '@/packages/components/base/Navigations/NextLink';
import dt from '@/packages/libs/DayJS/dt';
import useLangugage from '@/packages/libs/I18n/i18n.client';
import createContentLocales from '@/packages/libs/I18n/locales';

export interface NotFoundPost {
  title: string;
  slug: string;
  date: string;
  readTime: string;
}

interface Props {
  postsByLanguage: Record<string, NotFoundPost[]>;
}

const withLocales = createContentLocales({
  title: {
    en: 'Page Not Found',
    id: 'Halaman Tidak Ditemukan'
  },
  line: {
    en: 'This page wandered off, or never existed. Probably a link I broke along the way.',
    id: 'Halaman ini hilang, atau memang tidak pernah ada. Mungkin link yang saya rusak di tengah jalan.'
  },
  button: {
    en: 'Go Home',
    id: 'Kembali ke Beranda'
  },
  latest: {
    en: 'Or read something recent',
    id: 'Atau baca tulisan terbaru'
  }
});

function NotFoundView({ postsByLanguage }: Props) {
  const language = useLangugage();
  const locales = useMemo(() => withLocales(language), [language]);
  const posts = postsByLanguage[language] ?? [];

  return (
    <div className="wide-container min-h-[70vh] pt-5 text-base-content">
      <div className="rounded-[32px] bg-hero px-6 pb-28 pt-12 text-center text-hero-content lg:rounded-[40px] lg:pb-36 lg:pt-16">
        <p className="font-display text-[96px] font-extrabold leading-none tracking-[-0.04em] sm:text-[140px]">
          <span className="relative inline-block">
            <span aria-hidden className="absolute inset-x-[-0.08em] bottom-[0.1em] h-[0.34em] -rotate-1 rounded-[0.08em] bg-hero-mark" />
            <span className="relative">404</span>
          </span>
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">{locales.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-[17px] opacity-85">{locales.line}</p>
        <NextLink
          withCurrentLocale
          href="/"
          className="mt-7 inline-block rounded-2xl bg-hero-content px-[22px] py-3 text-[15px] font-semibold text-hero transition-transform duration-200 hover:-translate-y-0.5"
        >
          {locales.button}
        </NextLink>
      </div>

      {posts.length > 0 && (
        <section className="on-panel-edge" aria-labelledby="not-found-latest">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-[28px] bg-card shadow-soft">
            <h2 id="not-found-latest" className="px-6 pt-5 font-hand text-[22px] leading-none text-brand">
              {locales.latest}
            </h2>
            <ul className="mt-2 divide-y divide-line">
              {posts.map((post) => (
                <li key={post.slug}>
                  <NextLink
                    withCurrentLocale
                    href={`/blog/${post.slug}`}
                    className="group flex items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-base-100"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg font-bold leading-snug">{post.title}</p>
                      <p className="mt-1 font-mono text-xs text-muted">
                        {dt(post.date).format('MMM DD, YYYY')} · {post.readTime}
                      </p>
                    </div>
                    <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-base-content" />
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default NotFoundView;
