import { compose, starterHref } from '#lib/content/compose.ts';
import { starters } from '#lib/content/load.ts';
import { presets } from '#lib/content/presets.ts';

export function load() {
  return {
    cards: presets.map((preset) => {
      const composed = compose(starters[preset.starter], preset.add);
      return {
        id: preset.id,
        label: preset.label,
        accent: preset.accent,
        title: preset.title,
        blurb: preset.blurb,
        href: starterHref(preset.starter, composed.add),
        stack: composed.pieces.map((p) => ({ name: p.name, accent: p.accent }))
      };
    })
  };
}
