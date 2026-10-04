/**
 * Loads every starter folder under `./starters/` and validates it once at
 * module load. Anything wrong throws, so a broken content file fails the build.
 * Only server code imports this module.
 */
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

  // Piece and skill ids are checked by their types, so only the files need checking here.
  const addonList = addonMetas[`${dir}addons.ts`]?.addons ?? [];
  if (new Set(addonList.map((a) => a.id)).size !== addonList.length) fail(where, 'duplicate add-on id');

  const addons = addonList.map((addon) => {
    const w = `${where}/addons/${addon.id}`;
    const raw = addonTexts[`${dir}addons/${addon.id}.md`];
    if (raw === undefined) fail(w, 'missing markdown file');
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
