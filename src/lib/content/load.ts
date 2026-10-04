/**
 * Loads every starter folder under `./starters/` and validates it once at
 * module load. Anything wrong throws, so a broken content file fails the build.
 * Only server code imports this module.
 */
import { pieces } from './pieces.ts';
import { skills } from './skills.ts';
import type { AddonMeta, Starter, StarterMeta } from './types.ts';

const metas = import.meta.glob<{ starter: StarterMeta }>('./starters/*/starter.ts', { eager: true });
const addonMetas = import.meta.glob<{ addons: AddonMeta[] }>('./starters/*/addons.ts', { eager: true });
const texts = import.meta.glob<string>('./starters/*/{prompt,readme.template,agents.template}.md', {
  query: '?raw',
  import: 'default',
  eager: true
});
const addonTexts = import.meta.glob<string>('./starters/*/addons/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

function fail(where: string, message: string): never {
  throw new Error(`content: ${where}: ${message}`);
}

function checkPieces(where: string, ids: string[]) {
  for (const id of ids) if (!(id in pieces)) fail(where, `unknown piece "${id}"`);
}

function checkNoCycles(where: string, addons: AddonMeta[]) {
  const byId = new Map(addons.map((a) => [a.id, a]));
  const visiting = new Set<string>();
  const done = new Set<string>();
  const visit = (id: string) => {
    if (done.has(id)) return;
    if (visiting.has(id)) fail(where, `add-on "${id}" requires itself`);
    visiting.add(id);
    for (const dep of byId.get(id)?.requires ?? []) visit(dep);
    visiting.delete(id);
    done.add(id);
  };
  for (const a of addons) visit(a.id);
}

function buildStarter(dir: string, meta: StarterMeta): Starter {
  const where = `starters/${meta.slug}`;
  const slug = dir.split('/').at(-2);
  if (slug !== meta.slug) fail(where, `folder "${slug}" does not match slug "${meta.slug}"`);

  const steps = texts[`${dir}prompt.md`]?.trim();
  const readme = texts[`${dir}readme.template.md`]?.trim();
  const rules = texts[`${dir}agents.template.md`]?.trim();
  if (!readme) fail(where, 'missing readme.template.md');
  if (!steps) fail(where, 'missing prompt.md');
  if (!rules) fail(where, 'missing agents.template.md');

  checkPieces(where, meta.pieces);
  for (const id of meta.skills) if (!(id in skills)) fail(where, `unknown skill "${id}"`);

  const addonList = addonMetas[`${dir}addons.ts`]?.addons ?? [];
  const ids = new Set(addonList.map((a) => a.id));
  if (ids.size !== addonList.length) fail(where, 'duplicate add-on id');
  checkNoCycles(where, addonList);

  const addons = addonList.map((addon) => {
    const w = `${where}/addons/${addon.id}`;
    const raw = addonTexts[`${dir}addons/${addon.id}.md`];
    if (raw === undefined) fail(w, 'missing markdown file');
    checkPieces(w, addon.pieces);
    for (const dep of addon.requires ?? []) if (!ids.has(dep)) fail(w, `requires unknown add-on "${dep}"`);
    if (!raw.trim()) fail(w, 'no steps');
    return { ...addon, steps: raw.trim() };
  });

  return { ...meta, steps, readme, rules, addons };
}

export const starters: Record<string, Starter> = Object.fromEntries(
  Object.entries(metas).map(([path, mod]) => {
    const dir = path.slice(0, path.lastIndexOf('/') + 1);
    const starter = buildStarter(dir, mod.starter);
    return [starter.slug, starter];
  })
);

export function getStarter(slug: string): Starter | undefined {
  return starters[slug];
}
