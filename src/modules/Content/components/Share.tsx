'use client';

import { Image as IconImage } from 'lucide-react';
import { FunctionComponent, SVGProps, useCallback, useMemo, useState } from 'react';

import { BASE_URL } from '@/configs/sites';
import IconCopy from '@/designs/icons/logo/copy.svg';
import IconFacebook from '@/designs/icons/logo/facebook.svg';
import IconLinkedin from '@/designs/icons/logo/linkedin.svg';
import IconTelegram from '@/designs/icons/logo/telegram.svg';
import IconTumblr from '@/designs/icons/logo/tumblr.svg';
import IconTwitter from '@/designs/icons/logo/twitter.svg';
import IconWhatsapp from '@/designs/icons/logo/whatsapp.svg';
import cn from '@/designs/utils/cn';
import { ContentMeta } from '@/modules/Content/services/content-parser';
import useClipboard from '@/packages/hooks/useClipboard';
import useLangugage from '@/packages/libs/I18n/i18n.client';
import createContentLocales from '@/packages/libs/I18n/locales';
import createPopup from '@/packages/utils/helpers/createPopup';
import { dasherize } from '@/packages/utils/helpers/string';

import ShareImageModal from './ShareImageModal';

interface Props {
  path: string;
  meta: ContentMeta;
}

interface SocialShare {
  label: string;
  logo: FunctionComponent<SVGProps<SVGSVGElement>>;
};

const SHARE_BUTTON = 'grid h-12 w-12 cursor-pointer place-items-center rounded-2xl bg-card text-base-content shadow-soft transition-transform duration-200 hover:-translate-y-1';

const socialShares: SocialShare[] = [
  {
    label: 'Share on Facebook',
    logo: IconFacebook
  },
  {
    label: 'Share on Linkedin',
    logo: IconLinkedin
  },
  {
    logo: IconTwitter,
    label: 'Share on Twitter'
  },
  {
    logo: IconTumblr,
    label: 'Share on Tumblr'
  },
  {
    logo: IconWhatsapp,
    label: 'Share on Whatsapp'
  },
  {
    logo: IconTelegram,
    label: 'Share on Telegram'
  }
];

const withLocales = createContentLocales({
  share: {
    en: 'Share',
    id: 'Bagikan'
  },
  copied: {
    en: 'Copied!',
    id: 'Tersalin!'
  },
  copy: {
    en: 'Copy Link',
    id: 'Salin Tautan'
  },
  shareImage: {
    en: 'Share image',
    id: 'Bagikan gambar'
  }
});

/** share images exist for blog posts only: `{lang}/blog/{slug}` */
const BLOG_POST_PATH = /^[a-z]{2}\/blog\/([^/]+)$/;

function ContentShare(props: Props) {
  const { path, meta } = props;
  const { title, description, tags = [] } = meta;

  const language = useLangugage();
  const locales = useMemo(() => withLocales(language), [language]);

  const url = useMemo(() => `${BASE_URL}/${path}`, [path]);
  const { isCopied, copyHandler } = useClipboard(url);
  const [isImageOpen, setImageOpen] = useState(false);
  const postSlug = useMemo(() => BLOG_POST_PATH.exec(path)?.[1], [path]);
  const umamiSuffix = dasherize(path.replace(/\//g, '-'));

  const socialShareUrl = useMemo(() => {
    const url = `${BASE_URL}/${path}`;
    const encodedDesc = encodeURIComponent(description);
    const encodedTitle = encodeURIComponent(title);
    const hastags = tags.reduce((acc, cur) => `${acc}%23${cur.replace(/\s+/g, '_')} `, '').trim();
    return {
      'facebook': `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=%22${encodedDesc}%22%0A%0A${tags}`,
      'linkedin': `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      'twitter': `https://twitter.com/intent/tweet?text=%22${encodedDesc}%22%20${url}%20%0A%0A${hastags}`,
      'tumblr': `https://www.tumblr.com/widgets/share/tool/preview?posttype=link&canonicalUrl=${url}&title=${encodedTitle}&caption=${encodedDesc}`,
      'whatsapp': `https://api.whatsapp.com/send?text=%22${encodedDesc}%22%0A%0A${url}`,
      'telegram': `https://telegram.me/share/url?url=${url}&text=%0A%22${encodedDesc}%22`
    };
  }, [description, path, tags, title]);

  const onShare = useCallback((social: SocialShare) => () => {
    const socialId = social.label.substring(9).toLocaleLowerCase();
     
    const shareUrl = (socialShareUrl as any)[socialId] || null;
    if (shareUrl) {
      createPopup({
        url: shareUrl,
        title: social.label,
        w: 600,
        h: 600
      });
    }
    return false;
  }, [socialShareUrl]);

  return (
    <div className="mt-10 base-container">
      <h4 className="mb-3 text-center font-hand text-[22px] text-brand">
        {locales.share}
      </h4>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <button
          type="button"
          aria-label={isCopied ? locales.copied : locales.copy}
          onClick={copyHandler}
          data-umami-event={`content_share-copy_${dasherize(path.replace(/\//g, '-'))}`}
          className={cn([SHARE_BUTTON, isCopied && 'bg-brand-soft text-brand'])}
        >
          {isCopied ? <span className="text-sm font-bold">✓</span> : <IconCopy className="h-5 w-5" />}
        </button>
        {socialShares.map((social) => (
          <button
            type="button"
            aria-label={social.label}
            key={social.label}
            onClick={onShare(social)}
            data-umami-event={`content_share-${dasherize(social.label.substring(9))}_${dasherize(path.replace(/\//g, '-'))}`}
            className={SHARE_BUTTON}
          >
            <social.logo className="h-5 w-5" />
          </button>
        ))}
        {postSlug && (
          <button
            type="button"
            aria-label={locales.shareImage}
            title={locales.shareImage}
            onClick={() => setImageOpen(true)}
            aria-haspopup="dialog"
            data-umami-event={`content_share-image_${umamiSuffix}`}
            className={SHARE_BUTTON}
          >
            <IconImage className="h-5 w-5" aria-hidden />
          </button>
        )}
      </div>
      {postSlug && (
        <ShareImageModal
          open={isImageOpen}
          onClose={() => setImageOpen(false)}
          path={path}
          slug={postSlug}
          url={url}
          title={title}
          language={language}
          umamiSuffix={umamiSuffix}
        />
      )}
    </div>
  );
};

export default ContentShare;
