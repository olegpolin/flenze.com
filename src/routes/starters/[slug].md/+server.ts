import { error, text } from '@sveltejs/kit';
import { composeReference } from '#lib/content/compose.ts';
import { getStarter, starters } from '#lib/content/load.ts';
import type { RequestHandler } from './$types';

// The starter as one markdown document: the base, then every add-on as an
// optional part. It is the starter page's URL with `.md` appended.
export const prerender = true;

export const entries = () => Object.keys(starters).map((slug) => ({ slug }));

export const GET: RequestHandler = ({ params }) => {
  const starter = getStarter(params.slug);
  if (!starter) error(404, 'No such starter.');
  return text(composeReference(starter), { headers: { 'content-type': 'text/markdown; charset=utf-8' } });
};
