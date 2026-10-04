<script lang="ts">
  import type { PageProps } from './$types';
  import Seo from '#lib/components/seo.svelte';
  import StyleCard from '#lib/components/style-card.svelte';

  let { data }: PageProps = $props();
</script>

<Seo
  title="Design styles"
  description="Restyle a shadcn-svelte app with one prompt: Neobrutalism, Material 3 Expressive or Neoplasticism, applied to the components you already own."
/>

<div class="font-mono text-xs text-muted-foreground uppercase">Styles</div>

<header class="flex flex-col gap-5 pt-16 pb-12">
  <h1 class="text-[44px] leading-none font-semibold tracking-[-0.04em] md:text-[64px]">Design styles</h1>
  <p class="max-w-[720px] text-[19px] leading-normal text-body">
    Start from the default shadcn-svelte theme. Pick a style, copy the prompt, and your agent restyles
    the whole app: tokens, type, radius, shadows and spacing. Every preview is the same screen in
    that style.
  </p>
</header>

<section class="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
  {#each data.cards as card (card.id)}
    <StyleCard {...card} />
  {/each}
</section>
