/** Every technology a starter or add-on can be made of. */
export type PieceId =
  | 'svelte'
  | 'sveltekit'
  | 'tailwind'
  | 'shadcn-svelte'
  | 'better-auth'
  | 'drizzle'
  | 'neon'
  | 'resend'
  | 'mdsvex'
  | 'cloudflare-workers';

export interface Piece {
  name: string;
  url: string;
}

export const pieces: Record<PieceId, Piece> = {
  svelte: { name: 'Svelte', url: 'https://svelte.dev' },
  sveltekit: { name: 'SvelteKit', url: 'https://svelte.dev/docs/kit' },
  tailwind: { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
  'shadcn-svelte': { name: 'shadcn-svelte', url: 'https://shadcn-svelte.com' },
  'better-auth': { name: 'Better Auth', url: 'https://better-auth.com' },
  drizzle: { name: 'Drizzle', url: 'https://orm.drizzle.team' },
  neon: { name: 'Neon', url: 'https://neon.com' },
  resend: { name: 'Resend', url: 'https://resend.com' },
  mdsvex: { name: 'mdsvex', url: 'https://mdsvex.pngwn.io' },
  'cloudflare-workers': { name: 'Cloudflare Workers', url: 'https://workers.cloudflare.com' }
};
