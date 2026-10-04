<script lang="ts">
  import type { PageProps } from './$types';
  import Seo from '#lib/components/seo.svelte';
  import PresetCard from '#lib/components/preset-card.svelte';

  let { data }: PageProps = $props();
</script>

<Seo
  title="Starters"
  description="One prompt per stack: SvelteKit, Tailwind and shadcn-svelte, with add-ons for markdown posts, auth and Cloudflare Workers."
/>

<div class="font-mono text-xs text-muted-foreground uppercase">Starters</div>

<header class="flex flex-col gap-5 pt-16 pb-12">
  <h1 class="text-[44px] leading-none font-semibold tracking-[-0.04em] md:text-[64px]">Starters</h1>
  <p class="max-w-[720px] text-[19px] leading-normal text-body">
    One prompt per stack. Pick the one closest to what you are building; add-ons cover the rest, and
    every starter works with any coding agent.
  </p>
</header>

<section class="flex flex-col gap-6">
  {#each data.cards as card (card.id)}
    <PresetCard {...card} />
  {/each}
</section>
