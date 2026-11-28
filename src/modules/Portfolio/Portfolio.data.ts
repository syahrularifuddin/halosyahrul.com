import { I18nLocales } from '@/packages/libs/I18n/interface';

/** A string per supported language */
export type Localized = Record<I18nLocales, string>;

/** Colour pair of a project, taken from the theme tokens */
export type ProjectTone = 'brand' | 'teal' | 'rose' | 'lilac';

export interface ProjectLink {
  /** text of the link, e.g. `example.com` */
  label: Localized;
  /**
   * `external` opens in a new tab as is. `internal` is a path without language
   * prefix (the current language is added), so it can differ per language.
   */
  target: { type: 'external'; href: string } | { type: 'internal'; path: Localized };
}

export interface ProjectChat {
  user: Localized;
  agentName: string;
  agent: Localized;
  time: string;
}

export interface Project {
  id: string;
  tone: ProjectTone;
  /** small mono label above the title */
  tag: string;
  title: Localized;
  /** `**word**` is rendered bold */
  summary: Localized;
  chips?: string[];
  /** left out for work that has no public page: the card says `internal` */
  link?: ProjectLink;
  /** Public running application, alongside its source link. */
  liveUrl?: string;
  /** where the work was based, shown top right of the card (professional work) */
  location?: Localized;
  /** shown in "Things I'm building" on Home, in this order, the first one as the big card */
  home?: boolean;
  /** chat mock shown on the big Home card, played in a loop one scenario at a time */
  chat?: ProjectChat[];
}

/**
 * Everything the Portfolio page and the Home "Things I'm building" section
 * show. Add an entry here to add a card; there is no other file to touch.
 * Client work goes here too once it can be named.
 */
export const PROJECTS: Project[] = [
  {
    id: 'expense-tracker',
    liveUrl: 'https://expense.halosyahrul.com',
    tone: 'teal',
    tag: 'expense-tracker',
    title: {
      en: 'From inbox to insight.',
      id: 'Dari inbox menjadi insight.'
    },
    summary: {
      en: 'A production-minded personal finance app that turns bank and e-wallet notification emails into structured transactions. I designed the Rust API, PostgreSQL data model, authentication flow, and Next.js dashboard with a mock mode for fast, safe evaluation.',
      id: 'Aplikasi keuangan pribadi dengan pendekatan production-minded yang mengubah email notifikasi bank dan e-wallet menjadi transaksi terstruktur. Saya merancang API Rust, model data PostgreSQL, alur autentikasi, dan dashboard Next.js dengan mock mode untuk evaluasi yang cepat dan aman.'
    },
    chips: ['Rust', 'Axum', 'Next.js', 'PostgreSQL', 'Docker'],
    link: {
      label: { en: 'github.com/syahrularifuddin/expense-tracker ↗', id: 'github.com/syahrularifuddin/expense-tracker ↗' },
      target: { type: 'external', href: 'https://github.com/syahrularifuddin/expense-tracker' }
    }
  },
  {
    id: 'ig-grabber',
    liveUrl: 'https://ig.halosyahrul.com',
    tone: 'rose',
    tag: 'ig-grabber',
    title: {
      en: 'A resilient media pipeline.',
      id: 'Pipeline media yang tangguh.'
    },
    summary: {
      en: 'A full-stack media downloader built around the realities of modern web extraction: browser-like TLS/HTTP2 fingerprints, layered extraction strategies, session-aware access, and backend-proxied downloads that avoid browser CORS constraints.',
      id: 'Downloader media full-stack yang dibangun untuk menghadapi realitas ekstraksi web modern: fingerprint TLS/HTTP2 seperti browser, strategi ekstraksi berlapis, akses berbasis sesi, dan download melalui backend untuk menghindari batasan CORS browser.'
    },
    chips: ['Rust', 'Axum', 'Next.js', 'TypeScript', 'Docker'],
    link: {
      label: { en: 'github.com/syahrularifuddin/ig-grabber ↗', id: 'github.com/syahrularifuddin/ig-grabber ↗' },
      target: { type: 'external', href: 'https://github.com/syahrularifuddin/ig-grabber' }
    }
  },
  {
    id: 'note',
    liveUrl: 'https://note.halosyahrul.com',
    tone: 'lilac',
    tag: 'note.halosyahrul.com',
    title: {
      en: 'A notebook built to protect your thoughts.',
      id: 'Notebook yang menjaga ide Anda.'
    },
    summary: {
      en: 'A self-hosted, Notion-inspired notebook where reliability is a feature: block editing, nested pages, FTS5 search, conflict-aware saves, draft recovery, and security-conscious sessions and uploads.',
      id: 'Notebook self-hosted bergaya Notion dengan reliability sebagai fitur: block editing, nested pages, pencarian FTS5, penyimpanan yang sadar konflik, pemulihan draft, serta sesi dan upload yang memperhatikan keamanan.'
    },
    chips: ['Rust', 'SQLite', 'SvelteKit', 'Tiptap', 'Docker'],
    link: {
      label: { en: 'github.com/syahrularifuddin/note ↗', id: 'github.com/syahrularifuddin/note ↗' },
      target: { type: 'external', href: 'https://github.com/syahrularifuddin/note' }
    }
  },
  {
    id: 'halosyahrul',
    liveUrl: 'https://halosyahrul.com',
    tone: 'brand',
    tag: 'halosyahrul.com',
    title: {
      en: 'Personal Portfolio & Engineering Blog',
      id: 'Portofolio & Blog Engineering'
    },
    summary: {
      en: 'A bilingual portfolio and technical publishing platform built with **Next.js** and TypeScript. Owned end to end, from application development to containerized deployment on a self-managed VPS, with automated delivery through GitHub Actions.',
      id: 'Platform portofolio dan publikasi teknis bilingual berbasis **Next.js** dan TypeScript. Dikembangkan dan dikelola secara menyeluruh, dari pengembangan aplikasi hingga deployment berbasis container di VPS yang dikelola sendiri, dengan otomatisasi melalui GitHub Actions.'
    },
    chips: ['Next.js', 'Docker', 'GitHub Actions'],
    link: {
      label: { en: 'github.com/syahrularifuddin/halosyahrul.com ↗', id: 'github.com/syahrularifuddin/halosyahrul.com ↗' },
      target: { type: 'external', href: 'https://github.com/syahrularifuddin/halosyahrul.com' }
    },
    home: true
  }
];

/**
 * Professional work: products only, no company grouping.
 * TODO: add work you can name; while empty, the section is hidden.
 */
export const WORK: Project[] = [];
