# Material 3 Expressive

Restyle this shadcn-svelte app to Material 3 Expressive: lavender tonal palette, Roboto, pill buttons that squeeze when pressed, translucent state layers instead of accent fills, outlined 56px text fields, soft shadow-plus-ring elevation instead of borders. Edit existing files. Commit after each numbered section.

## 1. Theme

Run `npm i @fontsource-variable/roboto`. In the global stylesheet (`tailwind.css` in `components.json`), replace the sans font's `@import` with `@import '@fontsource-variable/roboto';`, uninstall the old sans font package, and in `@theme inline` set `--font-sans: 'Roboto Variable', sans-serif;`. Keep any mono font.

Replace the `:root` and `.dark` blocks with these. `.dark` lists only what differs; the rest comes from `:root`.

```css
:root {
  --background: oklch(0.9838 0.0128 321.89);
  --foreground: oklch(0.2265 0.01 303.71);
  --card: oklch(0.9838 0.0128 321.89);
  --card-foreground: oklch(0.2265 0.01 303.71);
  --popover: oklch(0.9838 0.0128 321.89);
  --popover-foreground: oklch(0.2265 0.01 303.71);
  --primary: oklch(0.4955 0.1305 293.71);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.9163 0.0365 303.11);
  --secondary-foreground: oklch(0.401 0.0356 297.87);
  --muted: oklch(0.8896 0.0138 314.75);
  --muted-foreground: oklch(0.4843 0.0147 301.01);
  --accent: oklch(0.9325 0.0148 312.24);
  --accent-foreground: oklch(0.2265 0.01 303.71);
  --destructive: oklch(0.5013 0.1783 28.7);
  --border: oklch(0.914 0.0137 314.75);
  --input: oklch(0.914 0.0137 314.75);
  --ring: oklch(0.6557 0.0112 311.12);
  --chart-1: oklch(0.8298 0.0123 313.2);
  --chart-2: oklch(0.5708 0.0112 305.28);
  --chart-3: oklch(0.4835 0.0116 305.22);
  --chart-4: oklch(0.3983 0.0103 301.08);
  --chart-5: oklch(0.3107 0.0113 308.06);
  --radius: 1.5rem;
  --sidebar: oklch(0.9591 0.0123 317.74);
  --sidebar-foreground: oklch(0.1645 0.0128 300.23);
  --sidebar-primary: oklch(0.2265 0.01 303.71);
  --sidebar-primary-foreground: oklch(0.9591 0.0123 317.74);
  --sidebar-accent: oklch(0.9591 0.0123 317.74);
  --sidebar-accent-foreground: oklch(0.2265 0.01 303.71);
  --sidebar-border: oklch(0.914 0.0137 314.75);
  --sidebar-ring: oklch(0.6557 0.0112 311.12);
}
.dark {
  --background: oklch(0.1874 0.0124 300.42);
  --foreground: oklch(0.914 0.0137 314.75);
  --card: oklch(0.2265 0.01 303.71);
  --card-foreground: oklch(1 0 0);
  --popover: oklch(0.2265 0.01 303.71);
  --popover-foreground: oklch(1 0 0);
  --primary: oklch(0.8345 0.0932 298.26);
  --primary-foreground: oklch(0.3251 0.1353 291.15);
  --secondary: oklch(0.4005 0.034 298.59);
  --secondary-foreground: oklch(0.9163 0.0365 303.11);
  --muted: oklch(0.3107 0.0113 308.06);
  --muted-foreground: oklch(0.7414 0.0126 313.19);
  --accent: oklch(0.3107 0.0113 308.06);
  --accent-foreground: oklch(0.9591 0.0123 317.74);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(0.2885 0.0109 293.35);
  --input: oklch(0.2885 0.0109 293.35);
  --ring: oklch(0.5708 0.0112 305.28);
  --sidebar: oklch(0.2265 0.01 303.71);
  --sidebar-foreground: oklch(0.9591 0.0123 317.74);
  --sidebar-primary: oklch(0.4835 0.0116 305.22);
  --sidebar-primary-foreground: oklch(0.9591 0.0123 317.74);
  --sidebar-accent: oklch(0.3107 0.0113 308.06);
  --sidebar-accent-foreground: oklch(0.9591 0.0123 317.74);
  --sidebar-border: oklch(0.2885 0.0109 293.35);
  --sidebar-ring: oklch(0.5708 0.0112 305.28);
}
```

## 2. Components

Work in the shadcn ui directory (the one containing `button/button.svelte`).

**Conventions.** These apply to every file in it, named below or not, so helper parts (labels, footers, link items, sub-buttons) match the parts they sit beside. Stock classes vary between shadcn-svelte styles (`data-[state=open]:`/`data-open:`, `ps-`/`pl-`, `ring-[3px]`/`ring-3`): match rules by meaning, use the file's own syntax, skip what already holds.

- **Disabled:** `opacity-50` → `opacity-40`.
- **State layers:** hover, focus, highlighted, open or expanded fills of `bg-accent`, `bg-muted` or `bg-sidebar-accent` become `bg-foreground/8` with `text-foreground`; pressed is `bg-foreground/12`. An active or selected `bg-sidebar-accent` fill becomes `bg-secondary text-secondary-foreground`. Filled hovers `/92` (secondary `/85`). Outline and ghost buttons use `primary` instead (see button).
- **No dark patches:** delete `dark:` background and border overrides (`dark:bg-input/30`, `dark:bg-destructive/60`) and disabled background tints. Keep `dark:` ring colors.
- **Icons:** default `size-4` icons → `size-5` on buttons, menu rows (and their chevrons), tabs, accordion, select trigger and the sidebar menu button only; indicators keep theirs.
- **Overlays** (popover, dropdown, sub-menu, select and navigation-menu content): no `border`; end with `ring-1 ring-border/40 shadow-lg`. Menu and select content `rounded-sm py-2`; popover `rounded-xl`; command `rounded-2xl! p-2`, its dialog `rounded-2xl!`.
- **Menu rows** (dropdown, select and command items, link items, sub-triggers): no rounding (command items `rounded-full`), `min-h-12 gap-3 py-3 px-4`; a side reserved for an indicator or inset goes from `8` (or `7`) to `10`. Selected select item `bg-secondary text-secondary-foreground`. Menu labels and group headings take the rows' horizontal padding; select groups lose their `p-1` and menu separators their `-mx-1`.
- **Fields** (input, textarea, select trigger): `h-14 rounded-sm border-input bg-transparent px-4 text-base text-foreground hover:border-foreground/70`, no `shadow-xs` or `md:text-sm`; textarea `min-h-28 py-3`, no `h-14`; select trigger sm `h-10`, its chevron stays `size-4`; a file input adds `pt-4 text-sm` (replacing any `pt-1.5`). Focus `border-primary ring-1 ring-primary`, not a 3px `ring-ring/50`; invalid `border-destructive`, ring at most 1px. The input-group root gets only `h-14 rounded-sm` and these focus and invalid rules (its `has-[…]:` forms), no padding or text classes.

**Per component:**

- button: base `rounded-full`, `active:scale-[0.97]` (not `translate-y-px`), transitions `border-radius` and `transform` too (`duration-200 ease-out`); no `shadow-xs`, per-size radius or icon padding. Non-link variants `active:rounded-xl`, filled `hover:shadow-sm`; destructive solid `bg-destructive text-white`; outline `border-border`; outline and ghost `bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12`, and a stock `aria-expanded:` fill on them becomes `aria-expanded:bg-primary/8` with no text change. Sizes: default `h-10 px-4`, sm `h-8 px-3 text-[13px]` (icons 4), lg `h-14 px-6 text-[15px]` (icons 6), icon `10`/`8`/`14`; any xs `h-6 px-2 text-xs`, icon-xs `size-6` (icons 3.5).
- button-group: `gap-0.5`; outer ends `rounded-*-full`, inner corners `rounded-*-md` instead of `-none`; delete `border-l-0`/`border-t-0`.
- badge: `gap-1.5 px-2.5 py-1`, no fixed height; destructive solid.
- card: `ring-1 ring-border/40 shadow-xs hover:shadow-sm`, no border. Card title `text-base leading-snug font-medium tracking-tight`.
- checkbox, radio: `relative border-2 border-muted-foreground bg-transparent`; drop their shadow, focus ring and field-label focus overrides; indicator `relative`; a halo `before:absolute before:inset-[-10px] before:rounded-full`, `bg-foreground/8` on hover (`bg-primary/8` when checked), `/12` on focus-visible. Checkbox `size-[18px] rounded-[2px]`, icons `stroke-[3]`; checked and indeterminate `bg-primary border-primary text-primary-foreground` (indeterminate via `data-[state=indeterminate]:`; bits-ui sets no `data-indeterminate`). Radio `size-5`; checked: `border-primary` and a `size-2.5 rounded-full bg-primary` dot (a stock icon dot also gets `fill-primary text-primary`).
- switch: track `h-8 w-[52px] border-2`, checked `bg-primary border-primary`, unchecked `bg-muted border-muted-foreground`; focus only `ring-2 ring-ring/50`, no border change or field-label override; thumb unchecked `size-4 bg-muted-foreground translate-x-1.5`, checked `size-6 bg-primary-foreground translate-x-[22px]`, animating size; sm track `h-5 w-9`, thumb `2.5`/`4`, `translate-x-1`/`[14px]`; an `rtl:` translate mirrors the new offset.
- slider: root `py-3`; track `h-4` (vertical `w-4`) `bg-secondary`; thumb `h-11 w-1 rounded-full bg-primary ring-2 ring-background transition-transform after:-inset-3 hover:scale-y-95 active:scale-y-90 focus-visible:ring-primary`, no `bg-white`, border or other rings.
- tabs (every list variant): horizontal list `h-12 w-full justify-start border-b`; no fill, radius or padding in any orientation. Trigger `h-12 px-4 text-muted-foreground hover:text-foreground`, no `flex-1` or icon padding; focus `focus-visible:bg-foreground/8`, no ring, border or outline; active `text-primary`, no fill, shadow or border, and a 3px `after:` bar `inset-x-3 -bottom-px rounded-t-full bg-primary`.
- dialog: `rounded-[28px] gap-6 p-6 shadow-2xl sm:max-w-md`, no ring; a full-bleed footer follows it (`-mx-6 -mb-6 p-6 rounded-b-[28px]`); overlay `bg-foreground/32 backdrop-blur-sm`; title `text-2xl font-normal`.
- sheet: `bg-popover shadow-2xl`, no edge border, inner edge `rounded-*-3xl`.
- sidebar menu button: base `rounded-full px-4 gap-3`, active `bg-secondary text-secondary-foreground`, open `bg-foreground/8` (not only on hover), collapsed `size-12! p-0! justify-center`; `size` strings `h-14`, sm `h-10`, lg `h-16 text-base`. In the `variant` strings delete the `hover:` `sidebar-accent` classes so the base state layer shows.
- navigation menu trigger: `h-10 rounded-full px-4`, focus and open `/12`.
- accordion trigger: `py-4 text-base items-center`, no underline.
- avatar root and group count: `size-10` (sm `8`, lg `14`); root has no `after:` outline.
- empty: `rounded-2xl bg-muted/40 p-10`, no dashed border; title `text-xl font-normal`.
- item: `rounded-2xl`, default and sm sizes `gap-3 px-4 py-3`, muted `bg-muted/40`.
- others: label `leading-snug`; tooltip `rounded-sm px-2 py-1 text-[11px]`; progress track `bg-secondary`, indicator `rounded-full`; skeleton `bg-muted`; sheet overlay as the dialog's; navigation menu link and sidebar sub-button `rounded-full`; command-input loses its group's `h-8!`, `rounded-lg!` and `bg-input/30` overrides.

## 3. Pages

Everything outside the ui directory: replace grey palette classes (`neutral`, `zinc`, `gray`), their `dark:` twins and the old brand hex with tokens: tinted panels `bg-muted/40`, text `text-foreground`, dividers `border-border`, rings `ring-border/60`, dialog panels `bg-popover`, brand marks `primary`. Leave other hues and token classes. If `ModeWatcher` defaults to dark, set `defaultMode="light"`.

## 4. AGENTS.md

Record these conventions briefly in the `## Design` section of AGENTS.md (add to that section if it exists, create it if not) so future UI work follows them: translucent state layers instead of accent fills, pill buttons with a press morph, outlined 56px fields, ring-and-shadow overlays, `opacity-40` when disabled, and token colors only.
