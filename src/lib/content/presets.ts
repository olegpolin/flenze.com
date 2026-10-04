import type { Accent } from '#lib/accent.ts';

/**
 * A preset is a starter with a fixed set of add-ons. The home page table and
 * the /starters cards are the presets; the starter page is where they link to.
 */
export interface Preset {
  id: string;
  /** Strip label on the /starters card, e.g. "Web app + auth". */
  label: string;
  accent: Accent;
  /** "A web app with auth" */
  title: string;
  /** One or two sentences for the /starters card. */
  blurb: string;
  starter: string;
  /** Add-on ids. */
  add: string[];
}

export const presets: Preset[] = [
  {
    id: 'web-app',
    label: 'Web app',
    accent: 'yellow',
    title: 'A web app',
    blurb:
      'The base. A compiler instead of a runtime, components you own, and an AGENTS.md with the skills already installed. Every other starter is this plus an add-on.',
    starter: 'web-app',
    add: []
  },
  {
    id: 'web-app-posts',
    label: 'Web app + markdown posts',
    accent: 'red',
    title: 'A web app with markdown posts',
    blurb:
      'The base plus mdsvex, so posts and pages can be written in markdown with Svelte components inside.',
    starter: 'web-app',
    add: ['posts']
  },
  {
    id: 'web-app-auth',
    label: 'Web app + auth',
    accent: 'blue',
    title: 'A web app with auth',
    blurb:
      'The base plus Better Auth on Drizzle and Neon Postgres, with Google sign-in.',
    starter: 'web-app',
    add: ['auth']
  }
];
