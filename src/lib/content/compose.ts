/**
 * Turns a starter plus a set of add-on ids into one prompt and the stack it
 * describes. Pure functions over the loaded content; no I/O.
 */
import type { Accent } from '#lib/accent.ts';
import { pieces, type PieceId } from './pieces.ts';
import { skills, type SkillId } from './skills.ts';
import type { Addon, Starter } from './types.ts';

export interface ComposedPiece {
  id: PieceId;
  name: string;
  url: string;
  why: string;
  /** The add-on that brought this piece in, or null for the base. */
  from: string | null;
  /** That add-on's colour, or null for the base. */
  accent: Accent | null;
}

export interface Composed {
  /** "web app + auth" */
  label: string;
  add: string[];
  prompt: string;
  pieces: ComposedPiece[];
  skills: { id: SkillId; name: string; url: string }[];
}

/**
 * The selection lives in the query string and belongs to the browser:
 * /starters/web-app?add=posts,auth. The server never reads it. Built by hand
 * rather than with URLSearchParams so the commas stay readable.
 */
export function starterHref(slug: string, add: readonly string[]): string {
  return add.length ? `/starters/${slug}?add=${add.join(',')}` : `/starters/${slug}`;
}

/**
 * Reads a selection leniently: commas, encoded commas, spaces, repeated keys,
 * any order. Pass the result through `canonicalAdd` to drop unknown ids.
 */
export function readAdd(url: { searchParams: Pick<URLSearchParams, 'getAll'> }): string[] {
  return url.searchParams
    .getAll('add')
    .flatMap((value) => value.split(/[,\s]+/))
    .filter(Boolean);
}

/** The selection after ticking or unticking one add-on. Unticking also drops whatever required it. */
export function toggleAddon(starter: Starter, add: readonly string[], id: string): string[] {
  if (!add.includes(id)) return canonicalAdd(starter, [...add, id]);
  const dropped = new Set([id]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const addon of starter.addons) {
      if (dropped.has(addon.id) || !add.includes(addon.id)) continue;
      if ((addon.requires ?? []).some((dep) => dropped.has(dep))) {
        dropped.add(addon.id);
        changed = true;
      }
    }
  }
  return canonicalAdd(
    starter,
    add.filter((a) => !dropped.has(a))
  );
}

/**
 * Dedupes, pulls in required add-ons, and orders by the starter's definition
 * order. Unknown ids are dropped.
 */
export function canonicalAdd(starter: Starter, ids: readonly string[]): string[] {
  const byId = new Map(starter.addons.map((a) => [a.id, a]));
  const wanted = new Set<string>();
  const include = (id: string) => {
    const addon = byId.get(id);
    if (!addon || wanted.has(id)) return;
    wanted.add(id);
    for (const dep of addon.requires ?? []) include(dep);
  };
  ids.forEach(include);
  return starter.addons.filter((a) => wanted.has(a.id)).map((a) => a.id);
}

/** Renumbers `N. ` steps from `start` and re-indents their continuation lines. */
function renumber(text: string, start: number): { text: string; next: number } {
  let n = start;
  let indent = '';
  let was = 0;
  const lines = text.split('\n').map((line) => {
    const step = /^\d+\.\s+/.exec(line);
    if (step) {
      const prefix = `${n++}. `;
      indent = ' '.repeat(prefix.length);
      was = step[0].length;
      return prefix + line.slice(step[0].length);
    }
    if (/^\s+\S/.test(line) && indent) {
      // Keep whatever the line was indented beyond its step, so a code block inside a step keeps its shape.
      const body = line.trimStart();
      const extra = Math.max(0, line.length - body.length - was);
      return indent + ' '.repeat(extra) + body;
    }
    return line;
  });
  return { text: lines.join('\n'), next: n };
}

/** A fence longer than any backtick run inside the text. */
function fence(text: string): string {
  const longest = Math.max(2, ...[...text.matchAll(/`+/g)].map((m) => m[0].length));
  return '`'.repeat(longest + 1);
}

function fillPlaceholders(text: string, starter: Starter): string {
  // One install command per skill, as continuation lines of the step holding the placeholder.
  // No `-g`, so the skill lands in the project. `-y` answers every prompt, so an agent
  // running this unattended is never asked which agents or scope to use.
  const commands = starter.skills.map((id) => `npx skills add ${skills[id].url} --skill ${skills[id].name} -y`);
  const filled = text.replaceAll('{{skill-commands}}', commands.join('\n   '));
  const left = /\{\{[^}]*\}\}/.exec(filled);
  if (left) throw new Error(`content: starters/${starter.slug}: unresolved placeholder ${left[0]}`);
  return filled;
}

/** The two files the base prompt writes, each as a headed, fenced block. */
function files(starter: Starter, heading: string): string[] {
  return [
    ['README.md', starter.readme],
    ['AGENTS.md', starter.rules]
  ].map(([name, text]) => {
    const f = fence(text);
    return `${heading} ${name}\n${f}md\n${text}\n${f}`;
  });
}

export function compose(starter: Starter, ids: readonly string[]): Composed {
  const add = canonicalAdd(starter, ids);
  const selected = starter.addons.filter((a) => add.includes(a.id));

  // The base writes README.md and AGENTS.md from the blocks below. Add-ons come
  // after them and each ends by telling the agent to update both itself.
  const base = renumber(fillPlaceholders(starter.steps, starter), 1);
  const sections = [base.text, ...files(starter, '##')];
  let next = base.next;
  for (const addon of selected) {
    const steps = renumber(addon.steps, next);
    next = steps.next;
    sections.push(`## Add-on: ${addon.name}\n${steps.text}`);
  }

  const composedPieces: ComposedPiece[] = [
    ...starter.pieces.map((id) => ({ id, ...pieces[id], from: null, accent: null })),
    ...selected.flatMap((a) => a.pieces.map((id) => ({ id, ...pieces[id], from: a.id, accent: a.accent })))
  ];

  return {
    label: [starter.name.replace(/^an? /i, ''), ...selected.map((a) => a.name.toLowerCase())].join(' + '),
    add,
    prompt: sections.join('\n\n') + '\n',
    pieces: composedPieces,
    skills: starter.skills.map((id) => ({ id, name: skills[id].name, url: skills[id].url }))
  };
}

/** The add-on on its own, for an app that already has the base starter. */
export function composeAddon(starter: Starter, addon: Addon): string {
  return [
    `Add the ${addon.name} add-on to an existing app set up with the Flenze ${starter.title} starter. Follow the steps in order, and commit after every step.`,
    renumber(addon.steps, 1).text
  ].join('\n\n') + '\n';
}

/**
 * The whole starter as one document an agent can be pointed at: the base,
 * then every add-on as an optional part.
 */
export function composeReference(starter: Starter): string {
  const names = new Map(starter.addons.map((a) => [a.id, a.name]));
  const parts = [
    `# ${starter.title}`,
    'Do Part 1. Then apply only the add-ons from Part 2 that the user named, in the order they are listed here. If the user named none, stop after Part 1 and tell them which add-ons exist.',
    '## Part 1: Base',
    renumber(fillPlaceholders(starter.steps, starter), 1).text,
    ...files(starter, '###')
  ];

  if (starter.addons.length) parts.push('## Part 2: Optional add-ons');
  for (const addon of starter.addons) {
    const requires = addon.requires?.length
      ? ` Requires: ${addon.requires.map((id) => names.get(id)).join(', ')}.`
      : '';
    parts.push(
      `### Add-on: ${addon.name}`,
      `Only if the user asked for ${addon.name}.${requires} ${addon.description}`,
      renumber(addon.steps, 1).text
    );
  }
  return parts.join('\n\n') + '\n';
}
