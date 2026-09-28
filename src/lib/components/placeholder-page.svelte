<script lang="ts">
  import Seo from '#lib/components/seo.svelte';

  interface Props {
    label: string;
    title: string;
    description: string;
  }

  let { label, title, description }: Props = $props();
</script>

<Seo {title} {description} />

<div class="flex flex-col gap-5 pt-18 pb-14">
  <span class="font-mono text-xs tracking-[0.06em] text-muted-foreground uppercase">{label}</span>
  <h1 class="text-[44px] leading-none font-semibold tracking-[-0.04em] md:text-[64px]">{title}</h1>
  <p class="max-w-[760px] text-[19px] leading-normal text-body">{description}</p>
</div>
