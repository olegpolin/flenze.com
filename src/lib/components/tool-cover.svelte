<!--
  A small still picture of a tool's screen, for its card on /tools. Not interactive.
  It is drawn with this site's own tokens, so it follows light and dark mode.
-->
<script lang="ts">
  interface Props {
    slug: string;
  }

  let { slug }: Props = $props();

  /**
   * The colour picker's loupe, as rows of cells. It sits on the top left corner of the
   * blue block, so it shows blue under the red block and the gap between them.
   */
  const loupe = Array.from({ length: 7 }, (_, row) =>
    Array.from({ length: 7 }, (_, column) => {
      if (column === 0 || row === 2) return 'bg-ground';
      return row < 2 ? 'bg-red' : 'bg-blue';
    })
  );
</script>

{#if slug === 'image-color-picker'}
  <div class="flex h-[300px] flex-col border bg-card font-mono text-[11px] select-none" aria-hidden="true">
    <div class="flex h-10 shrink-0 items-center justify-between border-b pr-1.5 pl-3">
      <span>1200 × 630</span>
      <span class="border px-2.5 py-1.5">Choose image</span>
    </div>

    <div class="min-h-0 flex-1 bg-panel p-3">
      <div class="grid h-full grid-cols-[3fr_2fr] grid-rows-[3fr_2fr] gap-2 bg-ground p-2">
        <div class="row-span-2 bg-yellow"></div>
        <div class="bg-red"></div>
        <div class="relative bg-blue">
          <div class="absolute top-2 left-2">
            <div class="absolute size-2 -translate-1/2 border border-white outline outline-black"></div>
            <div class="absolute right-3 bottom-3 border bg-card">
              <div class="relative grid grid-cols-7">
                {#each loupe as row, y (y)}
                  {#each row as cell, x (x)}
                    <span class={['size-3', cell]}></span>
                  {/each}
                {/each}
                <span
                  class="absolute top-1/2 left-1/2 size-3 -translate-1/2 border border-white outline outline-black"
                ></span>
              </div>
              <div class="border-t px-1.5 py-0.5">#2a5bd7</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex h-11 shrink-0 items-center gap-2.5 border-t px-3">
      <span class="size-5 shrink-0 border bg-blue"></span>
      <span>#2a5bd7</span>
      <span class="truncate text-muted-foreground">oklch(0.516 0.198 264.2)</span>
      <span class="ml-auto flex shrink-0 gap-1">
        <span class="size-5 border bg-blue"></span>
        <span class="size-5 border bg-red"></span>
        <span class="size-5 border bg-yellow"></span>
      </span>
    </div>
  </div>
{/if}
