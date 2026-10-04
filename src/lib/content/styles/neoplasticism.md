# Neoplasticism

Restyle this shadcn-svelte app to neoplasticism (De Stijl): 2px black frames, square corners, flat components, primary blue, yellow and red on white, bold uppercase labels. Edit existing files. Commit after each numbered section.

## 1. Theme

Run `npm i @fontsource-variable/space-grotesk`. In the global stylesheet (`tailwind.css` in `components.json`), replace the sans font's `@import` with `@import '@fontsource-variable/space-grotesk';`, uninstall the old sans font package, and in `@theme inline` set `--font-sans: 'Space Grotesk Variable', sans-serif;`. Keep any mono font.

Replace the `:root` and `.dark` blocks with these. `.dark` lists only what differs; the rest comes from `:root`.

```css
:root {
  --background: var(--color-white);
  --foreground: var(--color-black);
  --card: var(--color-white);
  --card-foreground: var(--color-black);
  --popover: var(--color-white);
  --popover-foreground: var(--color-black);
  --primary: var(--color-blue-700);
  --primary-foreground: var(--color-white);
  --secondary: var(--color-yellow-400);
  --secondary-foreground: var(--color-black);
  --muted: var(--color-neutral-100);
  --muted-foreground: var(--color-neutral-700);
  --accent: var(--color-red-600);
  --accent-foreground: var(--color-white);
  --destructive: var(--color-red-600);
  --border: var(--color-black);
  --input: var(--color-black);
  --ring: var(--color-black);
  --chart-1: var(--color-red-600);
  --chart-2: var(--color-yellow-400);
  --chart-3: var(--color-blue-700);
  --chart-4: var(--color-black);
  --chart-5: var(--color-neutral-500);
  --radius: 0rem;
  --sidebar: var(--color-white);
  --sidebar-foreground: var(--color-black);
  --sidebar-primary: var(--color-red-600);
  --sidebar-primary-foreground: var(--color-white);
  --sidebar-accent: var(--color-yellow-400);
  --sidebar-accent-foreground: var(--color-black);
  --sidebar-border: var(--color-black);
  --sidebar-ring: var(--color-black);
}

.dark {
  --background: var(--color-neutral-800);
  --foreground: var(--color-white);
  --card: var(--color-neutral-700);
  --card-foreground: var(--color-white);
  --popover: var(--color-neutral-700);
  --popover-foreground: var(--color-white);
  --muted: var(--color-neutral-600);
  --muted-foreground: var(--color-neutral-300);
  --destructive: var(--color-red-400);
  --sidebar: var(--color-neutral-800);
  --sidebar-foreground: var(--color-white);
  --sidebar-primary: var(--color-blue-700);
  --sidebar-accent: var(--color-red-600);
  --sidebar-accent-foreground: var(--color-white);
}
```

## 2. Components

Work in the shadcn ui directory (the one containing `button/button.svelte`). The theme already restyles every component through its tokens; these are the class edits tokens cannot reach, so make only these. Match a class whatever its variant prefix, and keep the prefix when you swap it.

**Radii, everywhere.** `--radius: 0rem` already squares every class derived from it (`rounded-sm` to `rounded-4xl`, and `rounded-[…]` built on `var(--radius…)`); leave those. Change the fixed ones to `rounded-none`: `rounded-full`, bare `rounded`, `rounded-xs` and `rounded-[…]` with a fixed length.

**Hairlines, everywhere.** Where an element has `ring-1` with `ring-foreground/10` (not always adjacent), delete both and any `shadow` or `shadow-*` class on it, and add `border-2`.

**Frames:** button, badge, card, dialog content, dropdown-menu content, popover content, select content, select trigger, input, textarea, input-group root, item, empty, tabs list (its default variant if it has variants), tabs trigger.
- `border` becomes `border-2`; add `border-2` where there is no border. Delete `border-transparent` from the button and badge base classes. Empty stays dashed.
- Delete their `shadow-*` classes.
- On these and the switch, delete `focus-visible:border-ring` and its `has-[…]:border-ring` form, the invalid ring tints (`ring-destructive/20` and `ring-destructive/40` under an `aria-invalid` or `has-[…aria-invalid…]` prefix), `dark:aria-invalid:border-destructive/50`, and disabled background tints (`disabled:bg-input/…`, `has-disabled:bg-input/…`), and `border-transparent` under any prefix containing `focus-visible`. Leave their other focus and invalid classes. The input keeps its stock `aria-invalid` classes.

**Labels.** Button, badge, tabs trigger: `font-medium` becomes `font-bold uppercase tracking-wide`, and their unprefixed `transition-*` becomes `transition-colors`.

**Lines.** Accordion item and sheet edge borders become 2px (`border-b` to `border-b-2`, same for `-t`, `-l`, `-r`, `-s`, `-e`). Separator `h-px`/`w-px` become `h-0.5`/`w-0.5`. Avatar root: `after:border` becomes `after:border-2`; delete its `after:border-border` and `after:mix-blend-*` classes.

**Button variants**, replacing the stock variant classes (keep the sizes; a stock variant with `aria-expanded:` classes gets `aria-expanded:` copies of its new `hover:` classes instead):

```ts
default: "bg-primary text-primary-foreground hover:bg-primary/90",
destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
outline: "bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground",
secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
ghost: "border-transparent hover:bg-secondary hover:text-secondary-foreground",
link: "border-transparent text-accent underline-offset-4 hover:underline",
```

**Badge variants**, the same way (other variants, such as `ghost` or `link`, just gain `border-transparent`):

```ts
default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
destructive: "bg-destructive [a&]:hover:bg-destructive/90 text-white",
outline: "bg-background text-foreground [a&]:hover:bg-secondary [a&]:hover:text-secondary-foreground",
```

**Tabs trigger.** The active state gets `bg-primary text-primary-foreground` in place of `bg-background` and any active text color. Delete all its `dark:` classes. Keep `border-transparent`. If the list has a `line` variant, add `text-foreground` to that variant's active classes.

**Switch.** Root: `border border-transparent` becomes `border-2 p-0.5`; unchecked `bg-input` becomes `bg-background` (delete its `dark:` override); default size `h-5 w-9`, sm `h-4 w-7`. Thumb: its color classes become `bg-foreground data-checked:bg-primary-foreground`; default size `size-3`, sm `size-2`; checked offset `translate-x-4` (default) and `translate-x-3` (sm).

**Command input.** On its `InputGroup.Root`, `bg-input/30 border-input/30` becomes `bg-background border-2`.

**Sonner.** On `<Sonner>`, set `toastOptions={{ class: 'border-2! border-border! rounded-none!' }}`, merging into any existing `toastOptions`.

## 3. Pages

Everything outside the ui directory:
- The radius rule above applies. Any `[--radius:…]` override becomes `[--radius:0rem]`.
- A panel with a full `border` around content gets `border-2`. Leave dashed, one-sided and small inline borders (kbd, icons) as they are.
- Remove a bare `border` passed to `Empty.Root`; it would override the frame.
- A solid `bg-primary`, `bg-secondary` or `bg-accent` (any prefix, no `/opacity`) also gets the matching `text-*-foreground`.
- A `secondary` badge or button given `bg-transparent` becomes `outline`, since secondary text is black.
- If `ModeWatcher` defaults to dark, set `defaultMode="light"`.

Leave all other page classes, shadows included.

## 4. AGENTS.md

Record these conventions briefly in the `## Design` section of AGENTS.md (add to that section if it exists, create it if not) so future UI work follows them: 2px black frames, square corners, flat components, bold uppercase labels, and blue, yellow and red as the only colors.
