/** Tools that run on this site, each at `/tools/<slug>`, entirely in the browser. */
export interface Tool {
  slug: string;
  name: string;
  description: string;
}

export const tools: Tool[] = [
  {
    slug: 'image-color-picker',
    name: 'Image color picker',
    description:
      'Paste a screenshot or drop an image, click any pixel, and copy its color as HEX, RGB, HSL or OKLCH. The image never leaves your browser.'
  }
];

export function tool(slug: string) {
  const found = tools.find((entry) => entry.slug === slug);
  if (!found) throw new Error(`content: no tool "${slug}" in tools.ts`);
  return found;
}
