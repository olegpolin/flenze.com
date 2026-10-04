import { styles, styleSite } from '#lib/content/styles.ts';

// One prompt file per style, read as text at build time.
const prompts = import.meta.glob<string>('../../lib/content/styles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

export function load() {
  return {
    cards: styles.map((style) => {
      const prompt = prompts[`../../lib/content/styles/${style.id}.md`];
      if (!prompt) throw new Error(`content: styles/${style.id}.md is missing`);
      return {
        id: style.id,
        name: style.name,
        blurb: style.blurb,
        registry: style.registry,
        site: styleSite(style),
        prompt
      };
    })
  };
}
