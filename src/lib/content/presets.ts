import type { Accent } from '#lib/accent.ts';
import type { PieceId } from './pieces.ts';

/**
 * A preset is a starter with a fixed set of add-ons. The home page table and
 * the /starters cards are the presets; the starter page is where they link to.
 */
export interface Preset {
  id: string;
  /** Mono label on the card strip, e.g. "WEB APP + AUTH". */
  label: string;
  accent: Accent;
  /** "A web app with auth" */
  title: string;
  /** One or two sentences for the /starters card. */
  blurb: string;
  starter: 'web-app';
  /** Add-on ids, in canonical order. */
  add: string[];
  /** The pieces the composed starter is made of. Derived from the starter and add-ons once those exist. */
  pieces: PieceId[];
}

const base: PieceId[] = ['svelte', 'sveltekit', 'tailwind', 'shadcn-svelte'];

export const presets: Preset[] = [
  {
    id: 'web-app',
    label: 'Web app',
    accent: 'yellow',
    title: 'A web app',
    blurb:
      'The base. A compiler instead of a runtime, components you own, and an AGENTS.md with the skills already installed. Every other starter is this plus an add-on.',
    starter: 'web-app',
    add: [],
    pieces: base
  },
  {
    id: 'web-app-auth',
    label: 'Web app + auth',
    accent: 'red',
    title: 'A web app with auth',
    blurb:
      'The base plus Better Auth on Drizzle and Neon Postgres, with Resend for email OTP sign-in and one OAuth provider. Protected routes, session in locals.',
    starter: 'web-app',
    add: ['auth'],
    pieces: [...base, 'better-auth', 'drizzle', 'neon', 'resend']
  },
  {
    id: 'web-app-blog',
    label: 'Web app + blog',
    accent: 'blue',
    title: 'A web app with a blog',
    blurb:
      'The base plus mdsvex for markdown posts with frontmatter, a post list and a post page, prerendered at build time.',
    starter: 'web-app',
    add: ['blog'],
    pieces: [...base, 'mdsvex']
  }
];

export function presetHref(preset: Preset) {
  const path = `/starters/${preset.starter}`;
  return preset.add.length ? `${path}?add=${preset.add.join(',')}` : path;
}
