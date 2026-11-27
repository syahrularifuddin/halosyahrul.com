import { Briefcase, FileText, Mail } from 'lucide-react';

import { AUTHOR_EMAIL, AUTHOR_GITHUB, AUTHOR_LINKEDIN } from '@/configs/author';
import IconGithub from '@/designs/icons/logo/github.svg';

const LINK = 'flex items-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-semibold transition-all duration-200';
const SOLID = `${LINK} bg-hero-content text-hero hover:-translate-y-0.5`;
const OUTLINE = `${LINK} border border-hero-content/40 hover:bg-hero-content/10`;

/** The ways to reach the author, as buttons on the About panel */
function ProfileInfo() {
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <a href="/resume" target="_blank" rel="noopener noreferrer" className={SOLID} data-umami-event="about_resume">
        <FileText aria-hidden size={16} />
        Resume
      </a>
      <a
        href={`https://github.com/${AUTHOR_GITHUB}`}
        target="_blank"
        rel="noopener noreferrer"
        className={OUTLINE}
        data-umami-event="about_portfolio"
      >
        <IconGithub aria-hidden width={16} height={16} />
        GitHub
      </a>
      {!!AUTHOR_LINKEDIN && (
        <a
          href={`https://linkedin.com/in/${AUTHOR_LINKEDIN}`}
          target="_blank"
          rel="noopener noreferrer"
          className={OUTLINE}
          data-umami-event="about_careers"
        >
          <Briefcase aria-hidden size={16} />
          LinkedIn
        </a>
      )}
      {!!AUTHOR_EMAIL && (
        <a href={`mailto:${AUTHOR_EMAIL}`} className={OUTLINE} data-umami-event="about_contact">
          <Mail aria-hidden size={16} />
          Email
        </a>
      )}
    </div>
  );
}

export default ProfileInfo;
