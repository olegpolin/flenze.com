import { compose, starterHref } from '#lib/content/compose.ts';
import { starters } from '#lib/content/load.ts';
import { presets } from '#lib/content/presets.ts';

export function load() {
  return {
    rows: presets.map((preset) => {
      const composed = compose(starters[preset.starter], preset.add);
      return {
        id: preset.id,
        title: preset.title,
        href: starterHref(preset.starter, composed.add),
        stack: composed.pieces.map((p) => p.name)
      };
    })
  };
}
