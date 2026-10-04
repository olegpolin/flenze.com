import { error } from '@sveltejs/kit';
import { getStarter, starters } from '#lib/content/load.ts';
import type { PageServerLoad } from './$types';

// One static page per starter. Which add-ons are ticked is the browser's
// business: this load never reads the query string.
export const entries = () => Object.keys(starters).map((slug) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
  const starter = getStarter(params.slug);
  if (!starter) error(404, 'No such starter.');
  return { starter };
};
