/**
 * Design styles. Each has a preview, a link to the component library it comes
 * from, and a prompt in `styles/<id>.md` that restyles an existing
 * shadcn-svelte app to it. The prompt describes the restyle itself (theme,
 * component conventions, pages); it does not install the library.
 */
export type StyleId = 'neobrutalism' | 'material' | 'neoplasticism';

export interface Style {
  id: StyleId;
  name: string;
  /** One sentence naming what you can see in the preview. */
  blurb: string;
  /** The library's repository name, which is also its subdomain. */
  registry: string;
}

export const styles: Style[] = [
  {
    id: 'neobrutalism',
    name: 'Neobrutalism',
    blurb: '2px black borders, hard 4px shadows, amber and sky-blue fills on cream, DM Sans.',
    registry: 'neobrutalism-svelte'
  },
  {
    id: 'material',
    name: 'Material 3 Expressive',
    blurb: 'Lavender-tinted surfaces, pill buttons, 1.5rem radii, hairline rings instead of borders, Roboto.',
    registry: 'material-svelte'
  },
  {
    id: 'neoplasticism',
    name: 'Neoplasticism',
    blurb:
      '2px black borders, zero radius, uppercase bold labels, primary blue, yellow and red on white, Space Grotesk.',
    registry: 'neoplasticism-svelte'
  }
];

export function styleSite(style: Style) {
  return `https://${style.registry}.flenze.com`;
}
