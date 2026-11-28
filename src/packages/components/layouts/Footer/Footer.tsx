import { AUTHOR_EMAIL, AUTHOR_GITHUB, AUTHOR_NAME } from '@/configs/author';
import { BASE_URL, SITE_NAME } from '@/configs/sites';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import SocialLinks from '@/packages/components/layouts/Footer/SocialLinks';

const currentYear = new Date().getFullYear();

const SITE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Now', href: '/now' },
  { label: 'About', href: '/about' }
];

const MORE_LINKS = [
  { label: 'RSS feed', href: `${BASE_URL}/rss/feed.xml` },
  { label: 'Sitemap', href: `${BASE_URL}/sitemap.xml` },
  { label: 'Source code', href: `https://github.com/${AUTHOR_GITHUB}/halosyahrul.com` }
];

const COLUMN_TITLE = 'mb-3 font-mono text-xs font-medium opacity-70';
const COLUMN_LINK = 'inline-block py-1 font-semibold underline-offset-4 hover:underline';

/** The page closes the way it opens: a deep-green panel, here with the sign-off and every link */
function Footer() {
  return (
    <footer className="wide-container mt-20 pb-6 md:pb-10">
      <div className="rounded-[32px] bg-hero px-7 py-10 text-hero-content sm:px-10 lg:rounded-[40px] lg:px-14 lg:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <span className="font-hand text-[22px] text-hero-note">sampai jumpa lagi!</span>
            <p className="mb-6 mt-1 font-display text-4xl font-extrabold leading-none tracking-[-0.03em] sm:text-5xl">{SITE_NAME}</p>
            <a
              href={`mailto:${AUTHOR_EMAIL}`}
              className="mb-5 inline-block text-lg font-semibold underline decoration-hero-note/70 decoration-2 underline-offset-4 transition hover:text-hero-note"
            >
              {AUTHOR_EMAIL}
            </a>
            <SocialLinks />
          </div>

          <nav aria-label="Site">
            <h2 className={COLUMN_TITLE}>Site</h2>
            <ul>
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <NextLink withCurrentLocale href={link.href} className={COLUMN_LINK}>{link.label}</NextLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="More">
            <h2 className={COLUMN_TITLE}>More</h2>
            <ul>
              <li>
                <NextLink withCurrentLocale href="/docs" className={COLUMN_LINK}>Docs</NextLink>
              </li>
              {MORE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={COLUMN_LINK}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-hero-content/20 pt-5 text-sm">
          <span className="opacity-75">&copy; {currentYear} {AUTHOR_NAME}</span>
          <a href="#" className="font-semibold underline-offset-4 hover:underline">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
