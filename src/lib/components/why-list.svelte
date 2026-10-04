<script lang="ts">
  import SectionHeading from '#lib/components/section-heading.svelte';
  import { accentBg, type Accent } from '#lib/accent.ts';

  interface Props {
    pieces: { id: string; name: string; url: string; why: string; from: string | null; accent: Accent | null }[];
    /** Add-on id to display name, read out for the colour square. */
    addonNames: Record<string, string>;
  }

  let { pieces, addonNames }: Props = $props();
</script>

<section class="flex flex-col gap-5">
  <SectionHeading>Why this stack</SectionHeading>
  <div class="flex flex-col border-t">
    {#each pieces as piece (piece.id)}
      <div class="grid gap-x-8 gap-y-1.5 border-b border-hairline py-4 last:border-border md:grid-cols-[220px_1fr]">
        <span class="flex items-center gap-2.5 text-lg font-semibold">
          <!-- Every row has a square so the names line up: empty for the base, filled for an add-on. -->
          <span class={['size-2.5 shrink-0 border', piece.accent ? accentBg[piece.accent] : 'bg-card']}>
            {#if piece.from}
              <span class="sr-only">{addonNames[piece.from]} add-on:</span>
            {/if}
          </span>
          <a class="hover:text-link" href={piece.url} target="_blank" rel="noopener noreferrer">{piece.name}</a>
        </span>
        <p class="max-w-[760px] text-base leading-normal text-body">{piece.why}</p>
      </div>
    {/each}
  </div>
</section>
