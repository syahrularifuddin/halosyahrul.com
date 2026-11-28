// Draws public/media/og/og-default.png, the social card of every page that is not a post.
// Run from the project root: npm run og:default
import fs from 'fs/promises';
import { ImageResponse } from 'next/og.js';
import { createElement as h } from 'react';

const C = { base: '#145C3D', content: '#F4F7F0', note: '#FFC79E', mark: '#C2531B', halo: '#F2996A' };
const [display, mono] = await Promise.all([
  fs.readFile('src/assets/og/Gabarito-800.ttf'),
  fs.readFile('src/assets/og/IBMPlexMono-500.ttf')
]);

const mark = h('svg', { width: 300, height: 300, viewBox: '0 0 100 100', style: { position: 'absolute', top: 120, right: 110, transform: 'rotate(6deg)' } },
  h('rect', { width: 100, height: 100, rx: 26, fill: 'rgba(244,247,240,0.1)' }),
  h('circle', { cx: 50, cy: 50, r: 16, fill: C.content }),
  h('path', { d: 'M26 100 a24 24 0 0 1 48 0 z', fill: C.content }),
  h('ellipse', { cx: 50, cy: 26, rx: 23, ry: 7.5, fill: 'none', stroke: C.halo, strokeWidth: 5 }));

const card = h('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: 1200, height: 630, padding: '0 72px 64px', background: C.base, position: 'relative' } },
  mark,
  h('div', { style: { display: 'flex', fontFamily: 'Display', fontWeight: 800, fontSize: 92, letterSpacing: -3, lineHeight: 1.02, color: C.content } }, 'Syahrul Arifuddin'),
  h('div', { style: { display: 'flex', width: 190, height: 20, marginTop: 22, borderRadius: 6, background: C.mark, transform: 'rotate(-1deg)' } }),
  h('div', { style: { display: 'flex', marginTop: 30, maxWidth: 640, fontFamily: 'Mono', fontWeight: 500, fontSize: 28, lineHeight: 1.4, color: C.content } }, 'Personal site and blog of Syahrul Arifuddin.'),
  h('div', { style: { display: 'flex', marginTop: 18, fontFamily: 'Mono', fontWeight: 500, fontSize: 24, color: C.note } }, 'halosyahrul.com'));

const png = await new ImageResponse(card, { width: 1200, height: 630, fonts: [
  { name: 'Display', data: display, weight: 800, style: 'normal' },
  { name: 'Mono', data: mono, weight: 500, style: 'normal' }
] }).arrayBuffer();
await fs.writeFile('public/media/og/og-default.png', Buffer.from(png));
