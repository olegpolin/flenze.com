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
    description:
      'adapter-cloudflare, a Wrangler config, and GitHub Actions that deploy on every push to main and give each pull request its own preview.',
    pieces: ['cloudflare-workers']
  }
];
