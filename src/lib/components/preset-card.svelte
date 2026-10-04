<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.ts';
  import Chip from '#lib/components/chip.svelte';
  import { accentBg, type Accent } from '#lib/accent.ts';

  interface Props {
    label: string;
    accent: Accent;
    href: string;
    title: string;
    blurb: string;
    /** Pieces, base first. Add-on pieces carry their add-on's colour. */
    stack: { name: string; accent: Accent | null }[];
  }

  let { label, accent, href, title, blurb, stack }: Props = $props();
</script>

<article class="flex flex-col border bg-card">
  <div class="flex h-12 items-center gap-2.5 border-b bg-panel px-6 font-mono text-xs tracking-[0.06em] uppercase">
    <span class={['size-3', accentBg[accent]]} aria-hidden="true"></span>
    {label}
  </div>
  <div class="grid gap-x-10 gap-y-6 p-6 md:grid-cols-[1fr_220px] md:items-center md:py-8 md:pr-6 md:pl-8">
    <div class="flex flex-col gap-3.5">
      <h2 class="text-[28px] leading-[1.05] font-semibold tracking-[-0.03em] md:text-[34px]">
        <a class="hover:text-link" {href}>{title}</a>
      </h2>
      <p class="max-w-[720px] text-[17px] leading-normal text-body">{blurb}</p>
      <div class="flex flex-wrap gap-2 pt-1.5">
        {#each stack as piece (piece.name)}
          <Chip accent={piece.accent ?? undefined}>{piece.name}</Chip>
        {/each}
      </div>
    </div>
    <Button {href} size="lg" class="md:w-full">View starter →</Button>
  </div>
</article>
