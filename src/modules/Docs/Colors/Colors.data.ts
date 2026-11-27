/** the soft tokens of globals.css (`--hs-*`), with the Tailwind name each is exposed as */
export const SOFT_TOKENS = [
  { token: 'hs-card', utility: 'bg-card' },
  { token: 'hs-line', utility: 'border-line' },
  { token: 'hs-muted', utility: 'text-muted' },
  { token: 'hs-brand-soft', utility: 'bg-brand-soft' },
  { token: 'hs-teal', utility: 'text-teal' },
  { token: 'hs-teal-soft', utility: 'bg-teal-soft' },
  { token: 'hs-rose', utility: 'text-rose' },
  { token: 'hs-rose-soft', utility: 'bg-rose-soft' },
  { token: 'hs-lilac', utility: 'text-lilac' },
  { token: 'hs-lilac-soft', utility: 'bg-lilac-soft' },
  { token: 'hs-terminal', utility: 'bg-terminal' }
] as const;

/** the daisyUI tokens worth comparing side by side */
export const BASE_TOKENS = [
  'color-base-100',
  'color-base-200',
  'color-base-300',
  'color-base-content',
  'color-primary',
  'color-secondary',
  'color-accent',
  'color-error'
] as const;

/**
 * Text-on-background pairs that the site really uses. `fg`/`bg` are token names;
 * `fixedFg` is a literal colour for text that is not a token (the terminal text).
 */
export const CONTRAST_PAIRS: { label: string; fg: string; bg: string; fixedFg?: string }[] = [
  { label: 'body text on page', fg: 'color-base-content', bg: 'color-base-100' },
  { label: 'body text on card', fg: 'color-base-content', bg: 'hs-card' },
  { label: 'muted text on page', fg: 'hs-muted', bg: 'color-base-100' },
  { label: 'muted text on card', fg: 'hs-muted', bg: 'hs-card' },
  { label: 'brand link on page', fg: 'color-primary', bg: 'color-base-100' },
  { label: 'button text on primary', fg: 'color-primary-content', bg: 'color-primary' },
  { label: 'text on secondary', fg: 'color-secondary-content', bg: 'color-secondary' },
  { label: 'text on accent', fg: 'color-accent-content', bg: 'color-accent' },
  { label: 'teal tag', fg: 'hs-teal', bg: 'hs-teal-soft' },
  { label: 'lilac tag', fg: 'hs-lilac', bg: 'hs-lilac-soft' },
  { label: 'rose note', fg: 'hs-rose', bg: 'hs-rose-soft' },
  { label: 'body text on rose-soft', fg: 'color-base-content', bg: 'hs-rose-soft' },
  { label: 'body text on brand-soft', fg: 'color-base-content', bg: 'hs-brand-soft' },
  { label: 'terminal text #E9F0EA', fg: 'terminal-text', bg: 'hs-terminal', fixedFg: '#E9F0EA' }
];
