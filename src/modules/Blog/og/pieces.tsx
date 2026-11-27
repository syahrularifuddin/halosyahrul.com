/* eslint-disable @next/next/no-img-element -- satori renders these to an image, there is no DOM for next/image */
import type { CSSProperties } from 'react';

import { SITE_DOMAIN, SITE_NAME } from '@/configs/sites';

import { OG_COLORS } from './assets';

/** a full-canvas layer; satori has no `inset` */
export function layer(width: number, height: number): CSSProperties {
  return { position: 'absolute', top: 0, left: 0, width, height, display: 'flex' };
}

interface BannerProps {
  /** null when the post has no cover: the site mark is drawn instead */
  src: string | null;
  width: number;
  height: number;
  /** CSS gradient laid over the cover, ending in the base colour where the cover ends */
  fade: string;
}

/** Cover photo with its fade, anchored to the top of the canvas; without a cover, the site mark */
export function Banner({ src, width, height, fade }: BannerProps) {
  if (!src) {
    const size = Math.round(Math.min(width * 0.3, height * 0.45));
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ position: 'absolute', top: Math.round(height * 0.14), right: Math.round(width * 0.08), transform: 'rotate(6deg)' }}
      >
        <rect width="100" height="100" rx="26" fill="rgba(244,247,240,0.1)" />
        <circle cx="50" cy="50" r="16" fill={OG_COLORS.content} />
        <path d="M26 100 a24 24 0 0 1 48 0 z" fill={OG_COLORS.content} />
        <ellipse cx="50" cy="26" rx="23" ry="7.5" fill="none" stroke={OG_COLORS.halo} strokeWidth="5" />
      </svg>
    );
  }
  return (
    <div style={layer(width, height)}>
      <img alt="" src={src} width={width} height={height} style={{ ...layer(width, height), objectFit: 'cover' }} />
      <div style={{ ...layer(width, height), backgroundImage: fade }} />
    </div>
  );
}

interface LockupProps {
  /** avatar side; the type scales from it */
  size: number;
  avatar: string;
  nameSize: number;
  domainSize: number;
  /** dark plate behind the lockup, for when it sits on the cover */
  pill?: boolean;
  nameColor?: string;
  domainColor?: string;
}

/** Avatar with SITE_NAME over SITE_DOMAIN: the brand mark on every image */
export function Lockup(props: LockupProps) {
  const { size, avatar, nameSize, domainSize, pill = false, nameColor = OG_COLORS.content, domainColor = OG_COLORS.note } = props;
  const gap = Math.round(size * 0.24);
  const pad = Math.round(size * 0.17);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        ...(pill ? {
          background: 'rgba(15,21,18,0.55)',
          borderRadius: Math.round(size * 0.45),
          padding: `${pad}px ${Math.round(pad * 2.3)}px ${pad}px ${pad}px`
        } : {})
      }}
    >
      <img
        alt=""
        src={avatar}
        width={size}
        height={size}
        style={{ width: size, height: size, borderRadius: Math.round(size * 0.3), border: `3px solid ${OG_COLORS.note}` }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: gap }}>
        <div style={{ display: 'flex', fontFamily: 'Gabarito', fontWeight: 800, fontSize: nameSize, lineHeight: 1.1, color: nameColor }}>
          {SITE_NAME}
        </div>
        <div style={{ display: 'flex', marginTop: 4, fontFamily: 'IBM Plex Mono', fontWeight: 500, fontSize: domainSize, lineHeight: 1.2, color: domainColor }}>
          {SITE_DOMAIN}
        </div>
      </div>
    </div>
  );
}

interface TagBadgesProps {
  tags: string[];
  fontSize: number;
  /** room for the row; tags that would not fit on one line are dropped */
  maxWidth: number;
}

const MAX_TAGS = 3;
/** IBM Plex Mono advance is 0.6em */
const MONO_ADVANCE = 0.6;

/** Up to three solid tags on one row */
export function TagBadges({ tags, fontSize, maxWidth }: TagBadgesProps) {
  const padX = Math.round(fontSize * 0.8);
  const gap = Math.round(fontSize * 0.48);
  const shown: string[] = [];
  let used = 0;
  for (const tag of tags.slice(0, MAX_TAGS)) {
    const width = tag.length * fontSize * MONO_ADVANCE + padX * 2 + (shown.length ? gap : 0);
    if (used + width > maxWidth) break;
    shown.push(tag);
    used += width;
  }
  if (!shown.length) return null;
  return (
    <div style={{ display: 'flex' }}>
      {shown.map((tag, index) => (
        <div
          key={tag}
          style={{
            display: 'flex',
            marginLeft: index ? gap : 0,
            padding: `${Math.round(fontSize * 0.36)}px ${padX}px`,
            borderRadius: Math.round(fontSize * 0.5),
            background: OG_COLORS.note,
            color: OG_COLORS.base,
            fontFamily: 'IBM Plex Mono',
            fontWeight: 500,
            fontSize,
            lineHeight: 1.1
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}

/** The orange marker swipe under the title, the one the Home headline has */
export function Swipe({ width, marginTop }: { width: number; marginTop: number }) {
  return (
    <div
      style={{
        display: 'flex',
        width,
        height: Math.round(width * 0.11),
        marginTop,
        borderRadius: Math.round(width * 0.03),
        background: OG_COLORS.mark,
        transform: 'rotate(-1deg)'
      }}
    />
  );
}

interface TitleProps {
  text: string;
  fontSize: number;
  maxLines: number;
  marginTop?: number;
  letterSpacing?: number;
  lineHeight?: number;
}

/** Post title; `maxLines` is a last resort, sizes are picked so it is not reached */
export function Title({ text, fontSize, maxLines, marginTop = 0, letterSpacing = -2, lineHeight = 1.06 }: TitleProps) {
  return (
    <div
      style={{
        display: 'block',
        marginTop,
        fontFamily: 'Gabarito',
        fontWeight: 800,
        fontSize,
        lineHeight,
        letterSpacing,
        color: OG_COLORS.content,
        lineClamp: maxLines,
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }}
    >
      {text}
    </div>
  );
}

interface MonoTextProps {
  text: string;
  fontSize: number;
  marginTop: number;
  color: string;
  maxLines?: number;
  lineHeight?: number;
}

/** Description and the "N min read" line */
export function MonoText({ text, fontSize, marginTop, color, maxLines, lineHeight = 1.5 }: MonoTextProps) {
  return (
    <div
      style={{
        display: 'block',
        marginTop,
        fontFamily: 'IBM Plex Mono',
        fontWeight: 500,
        fontSize,
        lineHeight,
        color,
        ...(maxLines ? { lineClamp: maxLines, textOverflow: 'ellipsis', overflow: 'hidden' } : {})
      }}
    >
      {text}
    </div>
  );
}
