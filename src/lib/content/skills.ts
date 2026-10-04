/** Agent skills a starter tells the agent to install. */
export type SkillId = 'svelte-code-writer' | 'svelte-core-bestpractices' | 'shadcn-svelte';

export interface Skill {
  /** The name passed to `npx skills add <url> --skill <name> -y`. */
  name: string;
  /** The GitHub repository the skills CLI installs from. Also where the skill's chip links. */
  url: string;
}

export const skills: Record<SkillId, Skill> = {
  'svelte-code-writer': {
    name: 'svelte-code-writer',
    url: 'https://github.com/sveltejs/ai-tools'
  },
  'svelte-core-bestpractices': {
    name: 'svelte-core-bestpractices',
    url: 'https://github.com/sveltejs/ai-tools'
  },
  'shadcn-svelte': {
    name: 'shadcn-svelte',
    url: 'https://github.com/huntabyte/shadcn-svelte'
  }
};
