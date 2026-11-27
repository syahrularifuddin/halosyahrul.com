import Image from 'next/image';

import { NextPageProps } from '@/@types/global';
import { AUTHOR_NAME } from '@/configs/author';
import ProfileInfo from '@/modules/About/components/ProfileInfo';
import ContentParser from '@/modules/Content/components/ContentParser';
import ContentInteraction from '@/modules/Content/components/Interaction';
import { getContentMultiLanguage } from '@/modules/Content/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import PageHead from '@/packages/components/layouts/PageHead';
import { I18n } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

export async function generateAboutPathsWithLang() {
  return Object.keys(I18n).map(lang => ({ lang }));
}

export async function generateAboutPathsDefault() {
  return [{}];
}

async function AboutPage(props: NextPageProps) {
  const params = await props.params;
  const lang = params?.lang || getDefaultLanguage();
  const markdownContent = await getContentMultiLanguage('about', lang);

  return (
    <div className="flex min-h-screen flex-col text-base-content">
      <PageHead
        overlap
        eyebrow={AUTHOR_NAME}
        title={markdownContent.meta.title}
        description={markdownContent.meta.description}
        aside={
          <Image
            src="/media/authors/avatar.png"
            alt={AUTHOR_NAME}
            width={240}
            height={240}
            priority
            className="h-[132px] w-[132px] justify-self-start rounded-[32px] border-[5px] border-card object-cover shadow-soft lg:h-[240px] lg:w-[240px] lg:justify-self-end lg:rounded-[44px] dark:border-[#1E2823]"
          />
        }
      >
        <ProfileInfo />
      </PageHead>

      <section className="wide-container">
        <div className="on-panel-edge">
          <HeroCard className="mx-auto max-w-3xl">
            <ContentParser>
              {markdownContent.content}
            </ContentParser>
          </HeroCard>
        </div>
      </section>
      <ContentInteraction
        path="about"
        identifier="about"
        meta={markdownContent.meta}
      />
    </div>
  );
}

export default AboutPage;
