<script lang="ts">
  import CopyButton from '#lib/components/copy-button.svelte';
  import StyleCover from '#lib/components/style-cover.svelte';
  import type { StyleId } from '#lib/content/styles.ts';

  interface Props {
    id: StyleId;
    name: string;
    blurb: string;
    registry: string;
    site: string;
    /** The restyle prompt the button copies. */
    prompt: string;
  }

  let { id, name, blurb, registry, site, prompt }: Props = $props();
</script>

<article class="flex flex-col border bg-card">
  <div class="border-b bg-panel p-4">
    <StyleCover style={id} />
  </div>
  <div class="flex flex-1 flex-col gap-1.5 px-5 pt-4.5 pb-4">
    <h2 class="text-[22px] font-semibold tracking-[-0.02em]">{name}</h2>
    <p class="text-[15px] leading-normal text-body">
      {blurb} From
      <a class="text-link hover:underline" href={site} target="_blank" rel="noopener noreferrer">{registry}</a>.
    </p>
  </div>
  <div class="border-t">
    <CopyButton class="h-12 w-full border-0" text={prompt} done="{name} prompt copied">Copy prompt</CopyButton>
  </div>
</article>
