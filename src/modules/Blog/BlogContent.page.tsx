import { NextPageProps } from '@/@types/global';
import withBlogContentLocales from '@/modules/Blog/BlogContent.locales';
import BlogContentInfo from '@/modules/Blog/components/ContentInfo';
import BlogContentSlugInitializer from '@/modules/Blog/components/ContentSlugInitializer';
import ReadingProgress from '@/modules/Blog/components/ReadingProgress';
import SeriesNav from '@/modules/Blog/components/SeriesNav';
import TableOfContents from '@/modules/Blog/components/TableOfContents';
import { getTableOfContents } from '@/modules/Blog/services/toc';
import ContentParser from '@/modules/Content/components/ContentParser';
import ContentInteraction from '@/modules/Content/components/Interaction';
import { getAllBlogPaths, getContent, getSeriesParts } from '@/modules/Content/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import Image from '@/packages/components/base/Displays/Image';
import PageHead from '@/packages/components/layouts/PageHead';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

interface Params {
  slug: string;
}

interface ParamsWithLang extends Params {
  lang: string;
}

export async function generateBlogPathsWithLang() {
  const paths = await getAllBlogPaths();
  return paths;
}

export async function generateBlogPathsDefault() {
  const paths = await generateBlogPathsWithLang();
  return paths.reduce((acc, path) => {
    if (path.lang === getDefaultLanguage()) {
      acc.push({ slug: path.slug });
    }
    return acc;
  }, [] as { slug: string }[]);
}

async function BlogContentPage({ params }: NextPageProps<ParamsWithLang|Params>) {
  const resolvedParams = await params;

  const lang = 'lang' in resolvedParams
    ? resolvedParams.lang
    : getDefaultLanguage();

  const slug = resolvedParams.slug;
  const content = await getContent(slug, lang);
  const seriesParts = await getSeriesParts(content.meta, lang);
  const toc = getTableOfContents(content.source);
  const labels = withBlogContentLocales(lang);
  // TableOfContents renders nothing below two headings
  const hasToc = toc.length >= 2;

  return (
    <>
      <BlogContentSlugInitializer contentSlug={content.meta.slug} />
      <ReadingProgress targetId="post-body" />
      <div className="flex min-h-screen flex-col text-base-content">
        <PageHead
          overlap
          eyebrow={<BlogContentInfo className="justify-start font-mono text-[13px]" meta={content.meta} />}
          title={content.meta.title}
          description={content.meta.description}
          aside={content.meta.image && (
            <Image
              src={content.meta.image}
              alt=""
              className="aspect-[4/3] w-full rounded-[28px] object-cover"
              wrapperClassName="flex! w-full"
            />
          )}
        />

        <section className="wide-container">
          <div className={['on-panel-edge', hasToc && 'xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:items-start xl:gap-5'].filter(Boolean).join(' ')}>
            <HeroCard className={hasToc ? undefined : 'mx-auto max-w-3xl'}>
              <SeriesNav
                className="mb-6"
                current={content.meta}
                parts={seriesParts}
                labels={labels}
              />
              <div id="post-body">
                <ContentParser>
                  {content.content}
                </ContentParser>
              </div>
            </HeroCard>
            {hasToc && (
              <aside className="sticky top-28 hidden max-h-[calc(100vh-9rem)] overflow-y-auto rounded-3xl bg-card p-5 shadow-soft xl:block">
                <TableOfContents items={toc} title={labels.toc} />
              </aside>
            )}
          </div>
        </section>
        <ContentInteraction
          meta={content.meta}
          identifier={`${lang}_${content.meta.slugOriginal}`}
          path={`${lang}/blog/${content.meta.slugOriginal}`}
        />
      </div>
    </>
  );
}

export default BlogContentPage;
