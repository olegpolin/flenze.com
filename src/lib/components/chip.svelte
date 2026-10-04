<script lang="ts">
  import type { Snippet } from 'svelte';
  import { accentBlock, type Accent } from '#lib/accent.ts';
  import { cn } from '#lib/utils.ts';

  interface Props {
    /** Filled in an accent colour; otherwise an outlined chip on the card colour. */
    accent?: Accent;
    /** Makes the chip a link to another site, opened in a new tab. */
    href?: string;
    class?: string;
    children: Snippet;
  }

  let { accent, href, class: className, children }: Props = $props();

  const classes = $derived(
    cn(
      'inline-flex h-9 items-center border px-3.5 text-[15px] font-semibold',
      accent ? accentBlock[accent] : 'bg-card',
      href && 'underline-offset-4 hover:underline',
      className
    )
  );
</script>

{#if href}
  <a class={classes} {href} target="_blank" rel="noopener noreferrer">{@render children()}</a>
{:else}
  <span class={classes}>{@render children()}</span>
{/if}
