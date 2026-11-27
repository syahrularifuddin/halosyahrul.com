import { NextPageProps } from '@/@types/global';
import ContentParser from '@/modules/Content/components/ContentParser';
import ContentInteraction from '@/modules/Content/components/Interaction';
import { getContentMultiLanguage } from '@/modules/Content/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import PageHead from '@/packages/components/layouts/PageHead';
import dt from '@/packages/libs/DayJS/dt';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

import withNowLocales from './Now.locales';

export async function generateNowPathsWithLang() {
  return Object.keys(I18n).map(lang => ({ lang }));
}

export async function generateNowPathsDefault() {
  return [{}];
}

async function NowPage(props: NextPageProps) {
  const params = await props.params;
  const lang = params?.lang || getDefaultLanguage();
  const markdownContent = await getContentMultiLanguage('now', lang);
  const locales = withNowLocales(lang as I18nLocales);
  const { currently, date } = markdownContent.meta;

  return (
    <div className="flex min-h-screen flex-col text-base-content">
      <PageHead
        overlap
        eyebrow={<>{locales.lastUpdated}: <time dateTime={date}>{dt(date).format('MMM DD, YYYY')}</time></>}
        title={markdownContent.meta.title}
        description={markdownContent.meta.description}
      >
        {currently && (
          <p className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-hero-content px-4 py-3 text-[15px] text-hero">
            <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-hero-mark" />
            <span><span className="font-semibold">{locales.currentlyLabel}:</span> {currently}</span>
          </p>
        )}
      </PageHead>

      <section className="wide-container">
        <div className="on-panel-edge">
          <HeroCard className="mx-auto max-w-3xl">
            <ContentParser className="[&_h2]:mt-10 [&_h2]:border-t [&_h2]:border-line [&_h2]:pt-8 [&_h2:first-child]:mt-0 [&_h2:first-child]:border-0 [&_h2:first-child]:pt-0">
              {markdownContent.content}
            </ContentParser>
          </HeroCard>
        </div>
      </section>
      <ContentInteraction
        path="now"
        identifier="now"
        meta={markdownContent.meta}
      />
    </div>
  );
}

export default NowPage;
