import type { StarterMeta } from '../../types.ts';

export const starter: StarterMeta = {
  slug: 'web-app',
  name: 'A web app',
  title: 'SvelteKit web app',
  tagline: 'The base for anything with a UI in a browser.',
  description:
    'A SvelteKit, Tailwind and shadcn-svelte starter as one prompt for your coding agent. Tick markdown posts, Cloudflare Workers or auth and the prompt updates.',
  pieces: ['svelte', 'sveltekit', 'tailwind', 'shadcn-svelte'],
  skills: ['svelte-code-writer', 'svelte-core-bestpractices', 'shadcn-svelte']
};
