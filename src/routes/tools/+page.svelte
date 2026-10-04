<script lang="ts">
  import Seo from '#lib/components/seo.svelte';
  import ToolCard from '#lib/components/tool-card.svelte';
  import { tools } from '#lib/content/tools.ts';
</script>

<Seo
  title="Tools"
  description="Small tools that run in your browser, starting with an image color picker. Nothing to install, nothing uploaded."
/>

<div class="font-mono text-xs text-muted-foreground uppercase">Tools</div>

<header class="flex flex-col gap-5 pt-16 pb-12">
  <h1 class="text-[44px] leading-none font-semibold tracking-[-0.04em] md:text-[64px]">Tools</h1>
  <p class="max-w-[720px] text-[19px] leading-normal text-body">
    Small tools for the jobs that come up while building. They run in your browser: nothing to
    install, nothing uploaded.
  </p>
</header>

<section class="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
  {#each tools as tool (tool.slug)}
    <ToolCard {...tool} />
  {/each}
</section>
