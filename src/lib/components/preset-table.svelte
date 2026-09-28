<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.ts';
  import { pieces } from '#lib/content/pieces.ts';
  import { presets, presetHref } from '#lib/content/presets.ts';

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

  {#each presets as preset, i (preset.id)}
    {@const first = i === 0}
    {@const last = i === presets.length - 1}
    <div
      class={[
        'grid grid-cols-1 gap-y-3 border-b py-4 md:h-21 md:items-center md:py-0',
        columns,
        first && 'bg-card',
        !first && !last && 'border-hairline'
      ]}
    >
      <a class="px-4 text-[21px] font-semibold tracking-[-0.01em] hover:text-link" href={presetHref(preset)}>
        {preset.title}
      </a>
      <span class="px-4 font-mono text-[13px] leading-normal md:pr-6 md:pl-0">
        {preset.pieces.map((id) => pieces[id].name).join(', ')}
      </span>
      <span class="flex px-4 md:justify-end">
        <Button href={presetHref(preset)} variant={first ? 'default' : 'outline'}>View starter →</Button>
      </span>
    </div>
  {/each}

  <p class="pt-3.5 text-[15px] text-muted-foreground">
    Each starter is a stack, a bootstrap prompt, an AGENTS.md and the skills to install. Works with any coding agent.
  </p>
</div>
