<script lang="ts">
  import { page } from '$app/state';
  import { Button } from '#lib/components/ui/button/index.ts';
  import Seo from '#lib/components/seo.svelte';

  const message = $derived(
    page.status === 404 ? 'There is nothing at this address.' : (page.error?.message ?? 'Something went wrong.')
  );
</script>

<Seo title={String(page.status)} description={message} />

<div class="flex flex-col gap-5 pt-18 pb-14">
  <span class="font-mono text-xs tracking-[0.06em] text-muted-foreground uppercase">Error</span>
  <h1 class="text-[68px] leading-none font-semibold tracking-[-0.04em]">{page.status}</h1>
  <p class="max-w-[760px] text-[19px] leading-normal text-body">{message}</p>
  <div class="pt-2">
    <Button href="/" size="lg">Back to the start →</Button>
  </div>
</div>
