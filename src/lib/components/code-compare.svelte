<script lang="ts">
  import { compare, lineCount } from '#lib/content/compare.ts';

  const panels = [
    { ...compare.react, highlight: false },
    { ...compare.svelte, highlight: true }
  ];
</script>

<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
  {#each panels as { file, framework, code, highlight } (file)}
    <div class="flex flex-col border bg-card">
      <div class="flex h-11 items-center justify-between border-b px-5 font-mono text-xs">
        <span>{file}</span>
        <span class={highlight ? 'bg-yellow px-2 py-1 text-yellow-foreground' : 'text-muted-foreground'}>
          {framework} · {lineCount(code)} lines
        </span>
      </div>
      <pre class="overflow-x-auto px-6 py-5 font-mono text-[13px] leading-[1.85]"><code>{code}</code></pre>
    </div>
  {/each}
</div>
