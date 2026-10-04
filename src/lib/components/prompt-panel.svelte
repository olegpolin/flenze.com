<script lang="ts">
  import CopyButton from '#lib/components/copy-button.svelte';

  interface Props {
    /** "Bootstrap prompt · web app + auth" */
    title: string;
    prompt: string;
  }

  let { title, prompt }: Props = $props();

  const body = $derived(prompt.trimEnd());
  const gutter = $derived(
    body
      .split('\n')
      .map((_, i) => i + 1)
      .join('\n')
  );
</script>

<section class="flex flex-col border bg-card">
  <div class="flex h-15 items-center justify-between gap-5 border-b pr-2 pl-5 font-mono text-xs">
    <span class="truncate">{title}</span>
    <CopyButton variant="accent" text={prompt} done="Prompt copied">Copy prompt</CopyButton>
  </div>
  <div class="grid grid-cols-[auto_1fr] overflow-x-auto font-mono text-[13px] leading-[1.85]">
    <pre class="border-r py-5 pr-4 pl-5 text-right text-muted-foreground select-none" aria-hidden="true">{gutter}</pre>
    <pre class="py-5 pr-6 pl-5"><code>{body}</code></pre>
  </div>
</section>
