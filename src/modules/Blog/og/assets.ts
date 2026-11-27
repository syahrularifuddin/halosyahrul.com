import Fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

/** the hero panel of the site: deep leaf, cream text, peach notes, orange marker */
export const OG_COLORS = {
  base: '#145C3D',
  content: '#F4F7F0',
  note: '#FFC79E',
  mark: '#C2531B',
  halo: '#F2996A'
};

const ROOT = process.cwd();
const ASSETS = path.join(ROOT, 'src/assets/og');

/** widest canvas a banner is drawn on; bigger sources are scaled down once */
const BANNER_WIDTH = 1200;

export interface OgAssets {
  avatar: string;
  fonts: {
    name: string;
    data: Buffer;
    weight: 500 | 800;
    style: 'normal';
  }[];
}

let assetsPromise: Promise<OgAssets> | null = null;

/** Avatar and fonts, read once per build worker and shared by every image */
export function loadOgAssets() {
  if (!assetsPromise) {
    assetsPromise = Promise.all([
      Fs.readFile(path.join(ASSETS, 'avatar-face.png')),
      Fs.readFile(path.join(ASSETS, 'Gabarito-800.ttf')),
      Fs.readFile(path.join(ASSETS, 'IBMPlexMono-500.ttf'))
    ]).then(([avatar, display, mono]) => ({
      avatar: `data:image/png;base64,${avatar.toString('base64')}`,
      fonts: [
        { name: 'Gabarito', data: display, weight: 800, style: 'normal' },
        { name: 'IBM Plex Mono', data: mono, weight: 500, style: 'normal' }
      ]
    }));
  }
  return assetsPromise;
}

const bannerCache = new Map<string, Promise<string | null>>();

async function bannerFileToDataUrl(file: string) {
  const jpeg = await sharp(file)
    .resize({ width: BANNER_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 88 })
    .toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
}

/**
 * The post cover from /public, scaled to the widest canvas and cached, so the
 * four images of a post decode it once. A post without a cover (or with a
 * remote or missing one) gets null, and the card draws the site mark instead.
 */
export function loadBanner(image?: string) {
  if (!image || /^https?:\/\//.test(image)) return Promise.resolve(null);
  const file = path.join(ROOT, 'public', image);
  let banner = bannerCache.get(file);
  if (!banner) {
    banner = bannerFileToDataUrl(file).catch(() => null);
    bannerCache.set(file, banner);
  }
  return banner;
}

/**
 * Glue the last two words with a no-break space so the title never ends on a
 * lone word. (satori's `textWrap: balance` narrows every line instead, and a
 * long title then runs past its line budget and gets cut.)
 */
export function keepLastWordsTogether(title: string) {
  return title.trim().replace(/\s+(\S+)$/, '\u00A0$1');
}
