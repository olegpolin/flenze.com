/** Every technology a starter or add-on can be made of. */
export type PieceId =
  | 'svelte'
  | 'sveltekit'
  | 'tailwind'
  | 'shadcn-svelte'
  | 'better-auth'
  | 'drizzle'
  | 'neon'
  | 'mdsvex'
  | 'cloudflare-workers';

export interface Piece {
  name: string;
  url: string;
  /** One or two sentences for the "Why this stack" list. */
  why: string;
}

export const pieces: Record<PieceId, Piece> = {
  svelte: {
    name: 'Svelte',
    url: 'https://svelte.dev',
    why: 'The component language. Reactivity is a compiler feature, not a library you import, so a component is mostly the HTML it renders and the state it changes.'
  },
  sveltekit: {
    name: 'SvelteKit',
    url: 'https://svelte.dev/docs/kit',
    why: 'A compiler, not a runtime. Server code sits next to the page that uses it, forms work before JavaScript loads, and most of the framework never reaches the browser.'
  },
  tailwind: {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    why: 'Styling with no runtime and no naming debates. Agents write utility classes accurately because the vocabulary is small and fully documented.'
  },
  'shadcn-svelte': {
    name: 'shadcn-svelte',
    url: 'https://shadcn-svelte.com',
    why: 'Components copied into your repo, not a dependency you upgrade around. You and the agent edit them like any other file.'
  },
  'better-auth': {
    name: 'Better Auth',
    url: 'https://better-auth.com',
    why: 'Auth you host yourself, in TypeScript, with a Drizzle adapter. No vendor session, no per-user pricing, one config file.'
  },
  drizzle: {
    name: 'Drizzle',
    url: 'https://orm.drizzle.team',
    why: 'SQL-shaped queries with types and no codegen step. The schema is a TypeScript file the agent can read and change.'
  },
  neon: {
    name: 'Neon',
    url: 'https://neon.com',
    why: 'Serverless Postgres whose driver connects over HTTP, so it works from Cloudflare Workers as well as Node. A branch per environment.'
  },
  mdsvex: {
    name: 'mdsvex',
    url: 'https://mdsvex.pngwn.io',
    why: 'Markdown that can hold Svelte components. Posts are files in the repo with frontmatter, rendered at build time, so they ship as HTML.'
  },
  'cloudflare-workers': {
    name: 'Cloudflare Workers',
    url: 'https://developers.cloudflare.com/workers',
    why: 'Runs the app at the edge with no servers to size. adapter-cloudflare builds SvelteKit for it, and the Neon serverless driver means the database works there too.'
  }
};
