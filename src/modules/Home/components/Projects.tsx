import ProjectCard from '@/modules/Portfolio/components/ProjectCard';
import { PROJECTS } from '@/modules/Portfolio/Portfolio.data';
import { I18nLocales } from '@/packages/libs/I18n/interface';

import withHomeLocales from '../Home.locales';
import SectionHead from './SectionHead';

interface Props {
  lang: I18nLocales;
}

/** "Things I'm building": the first project is the wide card, the rest sit in two columns under it */
function Projects({ lang }: Props) {
  const content = withHomeLocales(lang);
  const [featured, ...others] = PROJECTS.filter((project) => project.home);

  return (
    <section className="mb-[88px]">
      <SectionHead
        title={content.buildingTitle}
        description={content.buildingDesc}
        linkLabel={content.fullPortfolio}
        linkHref="/portfolio"
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ProjectCard project={featured} lang={lang} variant="feature" className="md:col-span-2" />
        {others.map((project) => (
          <ProjectCard key={project.id} project={project} lang={lang} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
