import { ArrowRight } from 'lucide-react';

import Emphasis from '@/packages/components/base/Displays/Emphasis';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import { I18nLocales } from '@/packages/libs/I18n/interface';

import withHomeLocales from '../Home.locales';
import HeroPortrait from './HeroPortrait';
import HeroTerminal from './HeroTerminal';

interface Props {
  lang: I18nLocales;
  /** From the Now page frontmatter, so updating Now updates the hero */
  currently?: string;
}

/** Marker swipe behind the accent words of the headline */
function MarkerSwipe() {
  return <span aria-hidden className="pointer-events-none absolute inset-x-[-0.1em] bottom-[0.06em] h-[0.46em] -rotate-1 rounded-[0.12em] bg-hero-mark" />;
}

const PILL = 'absolute z-10 flex items-center gap-2 whitespace-nowrap rounded-2xl bg-card px-[11px] py-[7px] text-xs font-semibold text-base-content shadow-soft sm:px-3.5 sm:py-2.5 sm:text-[13px]';
const PILL_SMALL = 'block font-mono text-[11px] font-normal text-muted';

/**
 * The hero is one deep-green panel: the greeting and headline on the left, the
 * portrait with its status pills on the right. The terminal and the "currently"
 * card sit on the panel's bottom edge, half on it and half on the page.
 */
function Hero({ lang, currently }: Props) {
  const content = withHomeLocales(lang);

  return (
    <section className="pb-16 pt-1 lg:pb-24">
      <div className="rounded-[32px] bg-hero px-6 pb-28 pt-9 text-hero-content sm:px-10 lg:rounded-[40px] lg:px-14 lg:pb-32 lg:pt-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div>
            <span className="font-hand text-[24px] leading-none text-hero-note sm:text-[26px]">{content.greeting}</span>
            <h1 className="mb-5 mt-2 font-display text-[40px] font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[66px]">
              {content.headlineStart}
              <span className="relative inline-block whitespace-nowrap">
                <MarkerSwipe />
                <span className="relative">{content.headlineAccent}</span>
              </span>
            </h1>
            <p className="max-w-[520px] text-[17px] opacity-85 lg:text-lg [&_a]:text-hero-content [&_b]:text-hero-content">
              <Emphasis text={content.lead} />
            </p>
            <div className="mt-[30px] flex flex-wrap gap-3">
              <NextLink
                withCurrentLocale
                href="/portfolio"
                className="rounded-2xl bg-hero-content px-[22px] py-3 text-[15px] font-semibold text-hero transition-transform duration-200 hover:-translate-y-0.5"
                data-umami-event="homepage_see-work"
              >
                {content.seeWork}
              </NextLink>
              <NextLink
                withCurrentLocale
                href="/blog"
                className="rounded-2xl border border-hero-content/40 px-[22px] py-3 text-[15px] font-semibold transition-colors duration-200 hover:bg-hero-content/10"
                data-umami-event="homepage_see-blog"
              >
                {content.readBlog}
              </NextLink>
            </div>
          </div>

          {/* Portrait: the status pills sit on its edges, the face stays clear */}
          <div className="relative flex flex-col items-center justify-self-center">
            <HeroPortrait
              lang={lang}
              alt={content.portraitAlt}
              moodLabel={content.moodLabel}
              moodHint={content.moodHint}
              pillClassName={PILL}
              pillSmallClassName={PILL_SMALL}
            />

            <div className={`${PILL} bottom-9 right-[-30px] lg:right-[-44px]`}>
              <span aria-hidden>☕</span>
              <div>
                {content.statusPlace}
                <small className={PILL_SMALL}>UTC+7</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* on the panel's bottom edge: the terminal, and what the Now page says */}
      <div className="on-panel-edge grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1fr] lg:gap-5">
        <HeroTerminal lang={lang} currently={currently} className="h-[188px] w-full rounded-3xl px-5 py-4 lg:h-[188px] lg:w-full" />
        {currently && (
          <NextLink
            withCurrentLocale
            href="/now"
            className="lift group flex min-h-[150px] flex-col justify-between gap-4 rounded-3xl bg-card p-6 shadow-soft"
            data-umami-event="homepage_currently"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-muted">
              <span className="h-2 w-2 shrink-0 rounded-full bg-teal shadow-[0_0_0_4px_var(--hs-teal-soft)]" />
              {content.currentlyLabel}
            </span>
            <span className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-[28px]">{currently}</span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-brand">
              Now
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </NextLink>
        )}
      </div>
    </section>
  );
}

export default Hero;
