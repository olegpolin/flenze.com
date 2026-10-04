# Neobrutalism

Restyle this shadcn-svelte app to neobrutalism: 2px ink borders, hard zero-blur offset shadows, 1rem radius, a cream and amber palette, and offset focus rings. Edit existing files. Commit after each numbered section.

## 1. Theme

Run `npm i -D @fontsource-variable/dm-sans`. In the global stylesheet (`tailwind.css` in `components.json`), replace the sans font's `@import` with `@import '@fontsource-variable/dm-sans';`, uninstall the old sans font package, and in `@theme inline` set `--font-sans: 'DM Sans Variable', sans-serif;`. Keep any mono font.

Set these variables and leave every other one as it is. A palette name such as `amber-400` means `var(--color-amber-400)`.

- `:root`: `--background`, `--card`, `--popover` `oklch(0.95 0.02 85)`; `--muted` `oklch(0.9 0.02 85)`; `--primary` amber-400; `--primary-foreground` neutral-950; `--secondary` blue-200; `--muted-foreground` neutral-600; `--accent` orange-200; `--border`, `--input`, `--ring`, `--sidebar-border` neutral-900; `--sidebar-accent` neutral-300; `--radius` `1rem`.
- `.dark`: `--background`, `--card`, `--popover` `oklch(0.3 0.01 255)`; `--muted` `oklch(0.35 0.01 255)`; `--primary`, `--sidebar-primary` amber-400; `--primary-foreground`, `--secondary-foreground`, `--sidebar-primary-foreground` neutral-950; `--secondary` blue-400; `--muted-foreground` neutral-300; `--accent` orange-800; `--destructive` red-500; `--border`, `--input`, `--ring`, `--sidebar-border`, `--sidebar-ring` neutral-950; `--sidebar` neutral-800; `--sidebar-accent` neutral-700.

At the end of `@theme inline`, add:

```css
  --default-border-width: 2px;
  --default-ring-width: var(--default-border-width);
  --shadow-2xs: 1px 1px 0 var(--color-border);
  --shadow-xs: 2px 2px 0 var(--color-border);
  --shadow-sm: 3px 3px 0 var(--color-border);
  --shadow-md: 4px 4px 0 var(--color-border);
  --shadow-lg: 6px 6px 0 var(--color-border);
  --shadow-xl: 8px 8px 0 var(--color-border);
  --shadow-2xl: 12px 12px 0 var(--color-border);
```

## 2. Components

Work in the shadcn ui directory (the one containing `button/button.svelte`). Apply each rule to the components that exist; skip the rest. A replaced class keeps its prefix (`dark:`, `data-*:`, `group-data-*:` …).

**Rings.** Every ring width (`ring-1` to `ring-4`, `ring-[3px]`), bare or prefixed, becomes `ring`; `ring-0` stays. A `ring-1` hairline outline (`ring-foreground/10`, `ring-sidebar-border`) becomes `border` instead, except in select-content, where `ring-foreground/10` becomes `ring-ring`.

**Focus.** Every focus ring ends as `focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring`. Delete `focus-visible:border-ring`, `focus-visible:border-destructive/…` and `has-[…:focus-visible]:border-ring`, but not `focus-visible:after:border-ring`. Replace `focus-visible:ring-ring/50` with `focus-visible:ring-ring focus-visible:ring-offset-2`; where a focus ring has no `focus-visible:` color (sidebar items, slider thumb), add those two and keep the unprefixed `ring-*` color. `has-[…:focus-visible]:` rings (input-group root, field-label) follow the same rule; input-group controls keep `focus-visible:ring-0` and add `focus-visible:ring-offset-0`, or the offset paints over the group's border. Add `ring-offset-background` to every element given the offset ring. Keep `ring-destructive/…` classes.

**Shadows.** `shadow-xs`, `shadow-sm`, `shadow-lg` and bare `shadow` become `shadow-md`, except: input and checkbox drop `shadow-xs`, and the tabs trigger is below. Cards and every button variant except ghost and link end with `shadow-md`; add it where missing.

**Per component:**

- button: the base has `border` and no `border-transparent`, so every variant shows one. Outline: `dark:bg-input/30` → `dark:bg-[color-mix(in_oklch,var(--input)_30%,var(--background))]`, `dark:hover:bg-input/50` → the same with `50%`. Link: delete `text-primary`.
- badge: delete every `border-transparent`.
- dialog-content: add `shadow-2xl`.
- button-group: add `[&>input]:shadow-md [&>[data-slot=select-trigger]]:shadow-md` to the base. If the button base is `rounded-md`, change the group's `rounded-r-lg` and `rounded-b-lg` (with or without `!`) to `-md`.
- checkbox: delete every class that sets `border-primary`.
- radio-group-item: delete `border-input`, `dark:bg-input/30` and every class that sets `bg-primary`, `text-primary-foreground` or `border-primary`. Indicator icon: `bg-primary-foreground` → `fill-current text-current`.
- switch root: unchecked `bg-input` classes → `bg-transparent`; delete every `border-transparent`; sizes `data-[size=default]:h-[24px] data-[size=default]:w-[48px] data-[size=sm]:h-[20px] data-[size=sm]:w-[40px]`. Thumb: add `border`; its two `dark:` backgrounds → `dark:bg-foreground`; checked translate `translate-x-[24px]` (default) and `translate-x-[20px]` (sm), unchecked `translate-x-[4px]`.
- progress: root add `border`, `h-1` → `h-3`. Indicator add `border-r`.
- slider: track add `border`, `h-1` → `h-3`, `w-1` → `w-3`. Thumb `size-3` → `size-5`.
- tabs-list (its default variant, if any): drop `bg-muted` and `text-muted-foreground`, add `border`, height → `h-12`, `w-fit` → `w-full`, `p-[3px]` → `p-1.5`.
- tabs-trigger: active `bg-background` → `bg-primary`, active `shadow-sm` → `border-border`. Leave its `dark:` classes.
- accordion root: add `border overflow-hidden rounded-lg`. Trigger: add `bg-primary text-primary-foreground px-3`, `rounded-lg` → `rounded-none`, delete the icon's `text-muted-foreground`. Content's inner div: `pt-0 pb-2.5` → `p-3 border-t`.
- select-content: add `p-1`.
- select-item: delete every `focus:bg-accent` and `data-highlighted:bg-accent`; add `border border-transparent focus:border-border data-highlighted:border-border`.
- command-item, command-link-item: `data-selected:bg-muted` → `border border-transparent data-selected:border-border`.
- command-input: delete `bg-input/30 border-input/30` from `InputGroup.Root`.
- field-label: `has-data-checked:border-primary/30` → `has-data-checked:border-primary`.
- sonner: add `toastOptions={{ class: 'border! border-border! shadow-md!' }}` to `<Sonner>`.

## 3. Pages

The theme and components already restyle routes and non-ui components, demos included. Make only these edits there:

- A code block or similar rounded panel the page draws itself gets `border`; a bordered element flush inside another gets `border-0`. Add no borders to headers, footers or other bars.
- Where a page overrides a dialog's surface, delete the override so its border and shadow show: `border-none`, `ring-*` halos, `shadow-*`, and `dark:bg-*` or neutral `bg-*`/`border-*` colors on it and on bars inside it.
- Delete a `dark:bg-*` that only swaps one theme token for another (`bg-muted dark:bg-card`), and `bg-primary-foreground` where it served as a light surface (it is now near-black).
- A `secondary` badge made transparent with `bg-transparent` becomes `outline`.
- A button whose padding the page strips with `p-0` gets `px-2`.
- A select trigger beside buttons of a different height gets their height with `!` (`h-9!`); without `!` its size variant wins.
- A page class setting an active nav link's background becomes `bg-sidebar-accent text-sidebar-accent-foreground border` under the same active prefix.

Change nothing else: keep all other colors, gradients, opacity modifiers and badge variants.

## 4. AGENTS.md

Record these conventions briefly in the `## Design` section of AGENTS.md (add to that section if it exists, create it if not) so future UI work follows them: ink `border`s, hard `shadow-md` shadows, offset `ring` focus with `ring-offset-background`, primary-filled active states.
