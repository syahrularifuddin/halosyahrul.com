import { NextPageProps } from '@/@types/global';
import PageHead from '@/packages/components/layouts/PageHead';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

import ProjectCard from './components/ProjectCard';
import { PROJECTS, WORK } from './Portfolio.data';
import withPortfolioLocales from './Portfolio.locales';

export async function generatePortfolioPathsWithLang() {
  return Object.keys(I18n).map(lang => ({ lang }));
}

export async function generatePortfolioPathsDefault() {
  return [{}];
}

async function PortfolioPage(props: NextPageProps) {
  const params = await props.params;
  const lang = (params?.lang || getDefaultLanguage()) as I18nLocales;
  const content = withPortfolioLocales(lang);

  return (
    <div className="min-h-screen text-base-content">
      <PageHead title={content.title} description={content.desc} />
      <div className="wide-container pb-8 pt-12 md:pt-16">
        <section className="mb-16">
          <h2 className="font-display text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">{content.buildingTitle}</h2>
          <p className="mt-1.5 text-muted">{content.buildingDesc}</p>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        </section>

        {WORK.length > 0 && (<section>
          <h2 className="font-display text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[40px]">{content.workTitle}</h2>
          <p className="mt-1.5 text-muted">{content.workDesc}</p>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {WORK.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        </section>)}
      </div>
    </div>
  );
}

export default PortfolioPage;
