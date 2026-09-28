<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<h2 class="text-[30px] leading-tight font-semibold tracking-[-0.025em]">{@render children()}</h2>
