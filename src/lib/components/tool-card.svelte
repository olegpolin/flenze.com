<script lang="ts">
  import ToolCover from '#lib/components/tool-cover.svelte';
  import { Button } from '#lib/components/ui/button/index.ts';

  interface Props {
    slug: string;
    name: string;
    description: string;
  }

  let { slug, name, description }: Props = $props();

  const href = $derived(`/tools/${slug}`);
</script>

<article class="flex flex-col border bg-card">
  <div class="border-b bg-panel p-4">
    <ToolCover {slug} />
  </div>
  <div class="flex flex-1 flex-col gap-1.5 px-5 pt-4.5 pb-4">
    <h2 class="text-[22px] font-semibold tracking-[-0.02em]">
      <a class="hover:text-link" {href}>{name}</a>
    </h2>
    <p class="text-[15px] leading-normal text-body">{description}</p>
  </div>
  <div class="border-t">
    <Button class="h-12 w-full border-0" {href}>Open tool →</Button>
  </div>
</article>
