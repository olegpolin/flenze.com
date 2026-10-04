<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.ts';

  interface Props {
    rows: { id: string; title: string; href: string; stack: string[] }[];
  }

  let { rows }: Props = $props();

  const columns = 'md:grid-cols-[320px_1fr_200px]';
</script>

<div class="flex flex-col">
  <div
    class={[
      'grid h-9 items-center border-y font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase max-md:hidden',
      columns
    ]}
  >
    <span class="pl-4">You are building</span>
    <span>Stack</span>
    <span></span>
  </div>

  {#each rows as row (row.id)}
    <div class={['grid grid-cols-1 gap-y-3 border-b border-hairline py-4 last:border-border md:h-21 md:items-center md:py-0', columns]}>
      <a class="px-4 text-[21px] font-semibold tracking-[-0.01em] hover:text-link" href={row.href}>
        {row.title}
      </a>
      <span class="px-4 font-mono text-[13px] leading-normal md:pr-6 md:pl-0">{row.stack.join(', ')}</span>
      <span class="flex px-4 md:justify-end">
        <Button href={row.href} variant="outline">View starter →</Button>
      </span>
    </div>
  {/each}

  <p class="pt-3.5 text-[15px] text-muted-foreground">
    Each starter is a stack, a bootstrap prompt, an AGENTS.md and the skills to install. Works with any coding agent.
  </p>
</div>
