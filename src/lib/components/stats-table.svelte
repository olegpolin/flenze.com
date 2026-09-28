<script lang="ts">
  import { benchmark } from '#lib/content/benchmark.ts';

  const columns = 'grid-cols-[1fr_96px_96px] md:grid-cols-[1fr_150px_150px]';
</script>

<div class="flex flex-col">
  <div
    class={[
      'grid h-9 items-center border-y font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase',
      columns
    ]}
  >
    <span></span>
    <span>{benchmark.columns.next.name}</span>
    <span>{benchmark.columns.sveltekit.name}</span>
  </div>

  {#each benchmark.rows as row, i (row.label)}
    <div
      class={[
        'grid h-14 items-center border-b text-base',
        columns,
        i < benchmark.rows.length - 1 && 'border-hairline'
      ]}
    >
      <span class="pr-4">{row.label}</span>
      <span class="font-mono text-[13px]">{row.next}</span>
      <span class="font-mono text-[13px] font-semibold">{row.sveltekit}</span>
    </div>
  {/each}
</div>
