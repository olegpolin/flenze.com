<!--
  The same small "Inbox" screen drawn in each design style, as a preview.
  It depicts another design system, so it uses that system's own fonts and
  colours instead of this site's tokens. The colours are each registry's
  theme, light and dark, and follow the site's mode.
-->
<script lang="ts">
  import '@fontsource-variable/dm-sans';
  import '@fontsource-variable/roboto';
  import '@fontsource-variable/space-grotesk';
  import CheckIcon from '@lucide/svelte/icons/check';
  import type { StyleId } from '#lib/content/styles.ts';

  interface Props {
    style: StyleId;
  }

  let { style }: Props = $props();

  /** Shape and type per style. Colours come from the `--c-*` variables below. */
  interface Theme {
    frame: string;
    title: string;
    sub: string;
    badge: string;
    dot: string;
    search: string;
    chip: string;
    /** Extra classes for the three chips: Open, Done, All. */
    chips: [string, string, string];
    list: string;
    row: string;
    rowDone: string;
    box: string;
    boxDone: string;
    button: string;
    primary: string;
    secondary: string;
  }

  const themes: Record<StyleId, Theme> = {
    neobrutalism: {
      frame: 'gap-2.5 rounded-[22px] border-2 border-(--c-line) p-4 shadow-[4px_4px_0_var(--c-line)]',
      title: 'text-[17px] leading-none font-semibold',
      sub: 'text-[13px]',
      badge:
        'gap-1.5 rounded-full border-2 border-(--c-line) bg-(--c-primary) px-2 py-0.5 text-xs font-medium text-(--c-on-primary)',
      dot: 'rounded-full bg-(--c-on-primary)',
      search: 'h-9 rounded-[13px] border-2 border-(--c-line) px-3 text-sm',
      chip: 'rounded-full border-2 border-(--c-line) px-2 py-0.5 text-xs font-medium',
      chips: ['bg-(--c-primary) text-(--c-on-primary)', 'bg-(--c-secondary) text-(--c-on-secondary)', ''],
      list: 'gap-1.5',
      row: 'gap-2.5 rounded-[13px] border-2 border-(--c-line) px-2.5 py-1.5 text-[13px] font-medium',
      rowDone: 'bg-(--c-accent) text-(--c-on-accent)',
      box: 'size-4 rounded border-2 border-(--c-line)',
      boxDone: 'bg-(--c-primary) text-(--c-on-primary)',
      button:
        'h-9 rounded-[13px] border-2 border-(--c-line) px-4 text-sm font-medium shadow-[4px_4px_0_var(--c-line)]',
      primary: 'bg-(--c-primary) text-(--c-on-primary)',
      secondary: ''
    },
    material: {
      frame: 'gap-2.5 rounded-[34px] p-5 shadow-[0_0_0_1px_var(--c-line),0_1px_2px_oklch(0_0_0/0.05)]',
      title: 'text-base leading-[1.3] font-medium tracking-[-0.01em]',
      sub: 'text-[13px]',
      badge:
        'gap-1.5 rounded-full bg-(--c-primary) px-2.5 py-1 text-xs font-medium tracking-[0.025em] text-(--c-on-primary)',
      dot: 'rounded-full bg-(--c-on-primary)',
      search: 'h-10 rounded-[14px] border border-(--c-line) px-4 text-[15px]',
      chip: 'rounded-full px-2.5 py-1 text-xs font-medium tracking-[0.025em]',
      chips: [
        'bg-(--c-primary) text-(--c-on-primary)',
        'bg-(--c-secondary) text-(--c-on-secondary)',
        'border border-(--c-line)'
      ],
      list: 'rounded-[22px] bg-(--c-accent) p-1',
      row: 'gap-3 px-3 py-[7px] text-sm',
      rowDone: '',
      box: 'size-[18px] rounded border-2 border-(--c-dim)',
      boxDone: 'border-0 bg-(--c-primary) text-(--c-on-primary)',
      button: 'h-10 rounded-full px-5 text-sm font-medium',
      primary: 'bg-(--c-primary) text-(--c-on-primary)',
      secondary: 'border border-(--c-line) text-(--c-primary)'
    },
    neoplasticism: {
      frame: 'gap-3 border-2 border-(--c-line) p-4',
      title: 'text-[17px] leading-none font-semibold',
      sub: 'text-[13px]',
      badge:
        'gap-1.5 border-2 border-(--c-line) bg-(--c-accent) px-2 py-0.5 text-[11px] font-bold tracking-[0.05em] text-(--c-on-accent) uppercase',
      dot: 'bg-(--c-on-accent)',
      search: 'h-9 border-2 border-(--c-line) px-3 text-sm',
      chip: 'border-2 border-(--c-line) px-2 py-0.5 text-[11px] font-bold tracking-[0.05em] uppercase',
      chips: ['bg-(--c-primary) text-(--c-on-primary)', 'bg-(--c-secondary) text-(--c-on-secondary)', ''],
      list: 'border-2 border-dashed border-(--c-line)',
      row: 'gap-2.5 border-b-2 border-(--c-line) px-3 py-2 text-[13px] font-medium last:border-b-0',
      rowDone: '',
      box: 'size-4 border-2 border-(--c-line)',
      boxDone: 'bg-(--c-primary) text-(--c-on-primary)',
      button: 'h-9 border-2 border-(--c-line) px-4 text-[13px] font-bold tracking-[0.05em] uppercase',
      primary: 'bg-(--c-primary) text-(--c-on-primary)',
      secondary: ''
    }
  };

  const theme = $derived(themes[style]);

  const filters = ['Open 12', 'Done 38', 'All'];
  const tasks = [
    { label: 'Write the AGENTS.md', done: true },
    { label: 'Add authentication', done: false },
    { label: 'Ship it', done: false }
  ];
</script>

<div
  class={['cover flex h-[340px] flex-col bg-(--c-bg) text-(--c-fg)', theme.frame]}
  data-style={style}
  aria-hidden="true"
>
  <div class="flex items-center justify-between gap-3">
    <div class="flex flex-col gap-1">
      <span class={theme.title}>Inbox</span>
      <span class={['text-(--c-dim)', theme.sub]}>4 new tasks this week</span>
    </div>
    <span class={['inline-flex shrink-0 items-center', theme.badge]}>
      <span class={['size-2', theme.dot]}></span>
      Syncing
    </span>
  </div>

  <div class={['flex shrink-0 items-center text-(--c-dim)', theme.search]}>Search tasks</div>

  <div class="flex gap-1.5">
    {#each filters as label, i (label)}
      <span class={[theme.chip, theme.chips[i]]}>{label}</span>
    {/each}
  </div>

  <div class={['flex flex-col', theme.list]}>
    {#each tasks as task (task.label)}
      <div class={['flex items-center', theme.row, task.done && theme.rowDone]}>
        <span class={['flex shrink-0 items-center justify-center', theme.box, task.done && theme.boxDone]}>
          {#if task.done}
            <CheckIcon class="size-3" strokeWidth={3} />
          {/if}
        </span>
        {task.label}
      </div>
    {/each}
  </div>

  <div class="mt-auto flex gap-2">
    <span class={['inline-flex items-center', theme.button, theme.primary]}>+ New task</span>
    <span class={['inline-flex items-center', theme.button, theme.secondary]}>Archive</span>
  </div>
</div>

<!--
  Each registry's theme, from the :root and .dark blocks of its layout.css:
  background, foreground, muted foreground, border, primary, secondary, accent.
-->
<style>
  .cover[data-style='neobrutalism'] {
    font-family: 'DM Sans Variable', sans-serif;
    --c-bg: oklch(0.95 0.02 85);
    --c-fg: oklch(0.145 0 0);
    --c-dim: oklch(0.439 0 0);
    --c-line: oklch(0.205 0 0);
    --c-primary: oklch(0.828 0.189 84.429);
    --c-on-primary: oklch(0.145 0 0);
    --c-secondary: oklch(0.882 0.059 254.128);
    --c-on-secondary: oklch(0.205 0 0);
    --c-accent: oklch(0.901 0.076 70.697);
    --c-on-accent: oklch(0.205 0 0);
  }

  :global(.dark) .cover[data-style='neobrutalism'] {
    --c-bg: oklch(0.3 0.01 255);
    --c-fg: oklch(0.985 0 0);
    --c-dim: oklch(0.87 0 0);
    --c-line: oklch(0.145 0 0);
    --c-secondary: oklch(0.707 0.165 254.624);
    --c-on-secondary: oklch(0.145 0 0);
    --c-accent: oklch(0.47 0.157 37.304);
    --c-on-accent: oklch(0.985 0 0);
  }

  .cover[data-style='material'] {
    font-family: 'Roboto Variable', sans-serif;
    --c-bg: oklch(0.9838 0.0128 321.89);
    --c-fg: oklch(0.2265 0.01 303.71);
    --c-dim: oklch(0.4843 0.0147 301.01);
    --c-line: oklch(0.914 0.0137 314.75);
    --c-primary: oklch(0.4955 0.1305 293.71);
    --c-on-primary: oklch(1 0 0);
    --c-secondary: oklch(0.9163 0.0365 303.11);
    --c-on-secondary: oklch(0.401 0.0356 297.87);
    --c-accent: oklch(0.9325 0.0148 312.24);
  }

  :global(.dark) .cover[data-style='material'] {
    --c-bg: oklch(0.1874 0.0124 300.42);
    --c-fg: oklch(0.914 0.0137 314.75);
    --c-dim: oklch(0.7414 0.0126 313.19);
    --c-line: oklch(0.2885 0.0109 293.35);
    --c-primary: oklch(0.8345 0.0932 298.26);
    --c-on-primary: oklch(0.3251 0.1353 291.15);
    --c-secondary: oklch(0.4005 0.034 298.59);
    --c-on-secondary: oklch(0.9163 0.0365 303.11);
    --c-accent: oklch(0.3107 0.0113 308.06);
  }

  .cover[data-style='neoplasticism'] {
    font-family: 'Space Grotesk Variable', sans-serif;
    --c-bg: oklch(1 0 0);
    --c-fg: oklch(0 0 0);
    --c-dim: oklch(0.371 0 0);
    --c-line: oklch(0 0 0);
    --c-primary: oklch(0.488 0.243 264.376);
    --c-on-primary: oklch(1 0 0);
    --c-secondary: oklch(0.852 0.199 91.936);
    --c-on-secondary: oklch(0 0 0);
    --c-accent: oklch(0.577 0.245 27.325);
    --c-on-accent: oklch(1 0 0);
  }

  :global(.dark) .cover[data-style='neoplasticism'] {
    --c-bg: oklch(0.269 0 0);
    --c-fg: oklch(1 0 0);
    --c-dim: oklch(0.87 0 0);
  }
</style>
