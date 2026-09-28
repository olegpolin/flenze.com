<!--
  The logo is rendered from src/lib/assets/favicon.svg, which is also
  the favicon linked in the root layout. Edit that file to change the
  logo, then rerender it to static/favicon.ico and keep the two in sync.
-->
<script lang="ts">
  import favicon from '#lib/assets/favicon.svg';
  import { site } from '#lib/config/site.ts';

  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();
</script>

<img src={favicon} alt={site.name} class={className} />
