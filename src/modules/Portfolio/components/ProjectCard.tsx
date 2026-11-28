import cn from '@/designs/utils/cn';
import Emphasis from '@/packages/components/base/Displays/Emphasis';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import { I18nLocales } from '@/packages/libs/I18n/interface';

import type { Project, ProjectTone } from '../Portfolio.data';
import ChatLoop from './ChatLoop';

interface Props {
  project: Project;
  lang: I18nLocales;
  /** `feature` is the wide Home card: colour block beside the body, larger title, chat mock */
  variant?: 'feature' | 'standard';
  className?: string;
}

const TONES: Record<ProjectTone, { block: string; link: string }> = {
  brand: { block: 'bg-brand-soft text-brand', link: 'text-brand' },
  teal: { block: 'bg-teal-soft text-teal', link: 'text-teal' },
  rose: { block: 'bg-rose-soft text-rose', link: 'text-rose' },
  lilac: { block: 'bg-lilac-soft text-lilac', link: 'text-lilac' }
};

/**
 * A project as a card with a colour block: the block carries the tag and the
 * title in large type, the body the summary, the stack and the link. The
 * `feature` card puts the block beside the body, the others put it on top.
 */
function ProjectCard({ project, lang, variant = 'standard', className }: Props) {
  const { tone, tag, title, summary, chips, link, chat, location } = project;
  const isFeature = variant === 'feature';
  const linkClassName = cn(['mt-auto pt-2 font-mono text-sm font-medium [overflow-wrap:anywhere] hover:underline underline-offset-4', TONES[tone].link]);

  return (
    <article
      className={cn([
        'group/card relative flex flex-col overflow-hidden rounded-[28px] bg-card shadow-soft',
        isFeature && 'md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]',
        className
      ])}
    >
      <div className={cn(['flex flex-col justify-between gap-8 p-7', isFeature && 'md:p-9', TONES[tone].block])}>
        <div className="flex items-center justify-between gap-3 font-mono text-xs font-medium">
          <span>{tag}</span>
          {location && <span>{location[lang]}</span>}
        </div>
        <h3
          className={cn([
            'font-display font-extrabold tracking-[-0.03em]',
            isFeature ? 'text-[34px] leading-[1.02] sm:text-5xl' : 'text-[28px] leading-[1.05]'
          ])}
        >
          {title[lang]}
        </h3>
      </div>

      <div className={cn(['flex flex-1 flex-col gap-4 p-7', isFeature && 'md:p-9'])}>
        <p className={cn(['text-muted', isFeature ? 'text-[17px]' : 'text-[15px]'])}>
          <Emphasis text={summary[lang]} />
        </p>

        {isFeature && chat && chat.length > 0 && <ChatLoop chats={chat} lang={lang} />}

        {chips && chips.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip} className="rounded-lg bg-base-100 px-2.5 py-1 font-mono text-xs font-medium text-muted">
                {chip}
              </li>
            ))}
          </ul>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            data-umami-event={`project_${project.id}_live`}
          >
            {lang === 'id' ? 'Buka proyek ↗' : 'Visit project ↗'}
          </a>
        )}

        {!link ? (
          <span className="mt-auto pt-2 font-mono text-sm font-medium text-muted">internal</span>
        ) : link.target.type === 'external' ? (
          <a
            href={link.target.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            data-umami-event={`project_${project.id}`}
          >
            {link.label[lang]}
          </a>
        ) : (
          <NextLink
            withCurrentLocale
            href={link.target.path[lang]}
            className={linkClassName}
            data-umami-event={`project_${project.id}`}
          >
            {link.label[lang]}
          </NextLink>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
