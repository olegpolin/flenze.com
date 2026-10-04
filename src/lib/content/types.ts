import type { Accent } from '#lib/accent.ts';
import type { PieceId } from './pieces.ts';
import type { SkillId } from './skills.ts';

/** `starter.ts` in a starter folder. */
export interface StarterMeta {
  slug: string;
  /** "A web app": the breadcrumb and the home table. */
  name: string;
  /** "SvelteKit web app": the page title. */
  title: string;
  tagline: string;
  /** Meta description for the starter page. */
  description: string;
  pieces: PieceId[];
  skills: SkillId[];
}

/** One entry of `addons.ts` in a starter folder. */
export interface AddonMeta {
  id: string;
  name: string;
  /** Colour of this add-on's pieces wherever a stack is shown. */
  accent: Accent;
  description: string;
  pieces: PieceId[];
}

export interface Addon extends AddonMeta {
  /**
   * The numbered steps, from `addons/<id>.md`. One of them has the agent
   * update AGENTS.md and the README tech stack itself.
   */
  steps: string;
}

export interface Starter extends StarterMeta {
  /** The base prompt, from `prompt.md`. */
  steps: string;
  /** The README the base prompt writes, from `readme.template.md`. */
  readme: string;
  /** The AGENTS.md the base prompt writes, from `agents.template.md`. */
  rules: string;
  addons: Addon[];
}
