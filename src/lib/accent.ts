/** The three accent colours. Each nav item, preset and design style carries one. */
export type Accent = 'yellow' | 'red' | 'blue';

/** A filled square or strip in the accent colour. */
export const accentBg: Record<Accent, string> = {
  yellow: 'bg-yellow',
  red: 'bg-red',
  blue: 'bg-blue'
};

/** A filled block in the accent colour with readable text on it. */
export const accentBlock: Record<Accent, string> = {
  yellow: 'bg-yellow text-yellow-foreground',
  red: 'bg-red text-red-foreground',
  blue: 'bg-blue text-blue-foreground'
};
