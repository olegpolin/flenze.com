import type { AddonMeta } from '../../types.ts';

/** In the order they appear in the checklist and in a composed prompt. */
export const addons: AddonMeta[] = [
  {
    id: 'posts',
    name: 'Markdown posts',
    accent: 'red',
    description: 'mdsvex, so posts and pages can be written in markdown with Svelte components inside.',
    pieces: ['mdsvex']
  },
  {
    id: 'auth',
    name: 'Auth',
    accent: 'blue',
    description:
      'Better Auth with Drizzle and a Neon Postgres database, signing in with Google.',
    pieces: ['better-auth', 'drizzle', 'neon']
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Workers',
    accent: 'yellow',
    description: 'adapter-cloudflare and a config file, so the app deploys to Workers.',
    pieces: ['cloudflare-workers']
  }
];
