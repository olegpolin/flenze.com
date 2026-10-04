<script lang="ts">
  import { toast } from 'svelte-sonner';
  import CopyButton from '#lib/components/copy-button.svelte';
  import Seo from '#lib/components/seo.svelte';
  import { Button } from '#lib/components/ui/button/index.ts';
  import { isLight, toHex, toHsl, toOklch, toRgb, type Rgb } from '#lib/color.ts';
  import { tool } from '#lib/content/tools.ts';

  const meta = tool('image-color-picker');

  /** Image pixels across the loupe. Odd, so one sits in the centre. */
  const LOUPE_PIXELS = 11;
  /** Loupe width on screen: 12px per image pixel. */
  const LOUPE_SIZE = 132;
  /** Larger images are scaled down to this, to stay inside canvas size limits. */
  const MAX_SIDE = 4096;
  const HISTORY = 12;

  let canvas: HTMLCanvasElement;
  let loupe: HTMLCanvasElement;
  let fileInput: HTMLInputElement;

  /** Size of the loaded image in its own pixels; null until one is loaded. */
  let size = $state.raw<{ width: number; height: number } | null>(null);
  /** The image pixel under the pointer or the keyboard cursor. */
  let cursor = $state.raw<{ x: number; y: number; rgb: Rgb } | null>(null);
  let picked = $state.raw<Rgb | null>(null);
  let history = $state.raw<Rgb[]>([]);
  let dragging = $state(false);

  const formats = $derived(
    picked
      ? [
          { label: 'HEX', value: toHex(picked) },
          { label: 'RGB', value: toRgb(picked) },
          { label: 'HSL', value: toHsl(picked) },
          { label: 'OKLCH', value: toOklch(picked) }
        ]
      : []
  );

  /**
   * Where the cursor mark goes, as a percentage of the canvas, and which way the loupe
   * hangs off it: towards the middle of the image, so it never leaves it.
   */
  const mark = $derived(
    cursor && size
      ? {
          left: ((cursor.x + 0.5) / size.width) * 100,
          top: ((cursor.y + 0.5) / size.height) * 100,
          flipX: cursor.x > size.width / 2,
          flipY: cursor.y > size.height / 2
        }
      : null
  );

  function context() {
    return canvas.getContext('2d', { willReadFrequently: true })!;
  }

  async function load(file: File | undefined) {
    if (!file) return;
    let bitmap: ImageBitmap;
    try {
      bitmap = await createImageBitmap(file);
    } catch {
      toast.error('Could not read that image. Try a PNG, JPEG or WebP.');
      return;
    }
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    context().drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    size = { width: canvas.width, height: canvas.height };
    cursor = null;
  }

  function firstImage(files: FileList | undefined) {
    return [...(files ?? [])].find((file) => file.type.startsWith('image/'));
  }

  function paste(event: ClipboardEvent) {
    const file = firstImage(event.clipboardData?.files);
    if (!file) return;
    event.preventDefault();
    load(file);
  }

  function drop(event: DragEvent) {
    event.preventDefault();
    dragging = false;
    load(firstImage(event.dataTransfer?.files));
  }

  /** Moves the cursor to an image pixel and redraws the loupe around it. */
  function look(x: number, y: number) {
    // Not finite when the canvas has no size on the page, as in a hidden tab.
    if (!size || !Number.isFinite(x + y)) return;
    x = Math.min(size.width - 1, Math.max(0, x));
    y = Math.min(size.height - 1, Math.max(0, y));
    const [r, g, b] = context().getImageData(x, y, 1, 1).data;
    const half = (LOUPE_PIXELS - 1) / 2;
    const lens = loupe.getContext('2d')!;
    lens.imageSmoothingEnabled = false;
    lens.clearRect(0, 0, LOUPE_SIZE, LOUPE_SIZE);
    lens.drawImage(canvas, x - half, y - half, LOUPE_PIXELS, LOUPE_PIXELS, 0, 0, LOUPE_SIZE, LOUPE_SIZE);
    cursor = { x, y, rgb: [r, g, b] };
  }

  function point(event: PointerEvent) {
    if (!size) return;
    const rect = canvas.getBoundingClientRect();
    look(
      Math.floor(((event.clientX - rect.left) / rect.width) * size.width),
      Math.floor(((event.clientY - rect.top) / rect.height) * size.height)
    );
  }

  function pick() {
    if (!cursor) return;
    const hex = toHex(cursor.rgb);
    picked = cursor.rgb;
    history = [picked, ...history.filter((rgb) => toHex(rgb) !== hex)].slice(0, HISTORY);
  }

  function key(event: KeyboardEvent) {
    if (!size) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      pick();
      return;
    }
    const step = event.shiftKey ? 10 : 1;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step]
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const from = cursor ?? { x: Math.floor(size.width / 2), y: Math.floor(size.height / 2) };
    look(from.x + move[0], from.y + move[1]);
  }

  function clear() {
    size = null;
    cursor = null;
    fileInput.value = '';
  }
</script>

<svelte:document onpaste={paste} />

<Seo title={meta.name} description={meta.description} />

<div class="font-mono text-xs text-muted-foreground uppercase">
  <a class="hover:text-link" href="/tools">Tools</a> / {meta.name}
</div>

<header class="flex flex-col gap-5 pt-16 pb-12">
  <h1 class="text-[44px] leading-none font-semibold tracking-[-0.04em] md:text-[64px]">{meta.name}</h1>
  <p class="max-w-[720px] text-[19px] leading-normal text-body">{meta.description}</p>
</header>

<div class="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_380px] lg:items-start">
  <section
    class="flex min-w-0 flex-col border bg-card"
    aria-label="Image"
    ondragover={(event) => {
      event.preventDefault();
      dragging = true;
    }}
    ondragleave={() => (dragging = false)}
    ondrop={drop}
  >
    <div class="flex h-15 items-center justify-between gap-5 border-b pr-2 pl-5 font-mono text-xs">
      <span class="truncate">
        {size ? `${size.width} × ${size.height}` : 'No image'}
      </span>
      <div class="flex gap-2">
        {#if size}
          <Button variant="ghost" onclick={clear}>Clear</Button>
        {/if}
        <Button variant="outline" onclick={() => fileInput.click()}>Choose image</Button>
      </div>
      <input
        bind:this={fileInput}
        class="hidden"
        type="file"
        accept="image/*"
        onchange={() => load(firstImage(fileInput.files ?? undefined))}
      />
    </div>

    {#if !size}
      <button
        class={[
          'flex min-h-[360px] flex-col items-center justify-center gap-2 p-6 text-center outline-none focus-visible:bg-muted',
          dragging ? 'bg-muted' : 'hover:bg-muted'
        ]}
        type="button"
        onclick={() => fileInput.click()}
      >
        <span class="text-[22px] font-semibold tracking-[-0.02em]">Paste an image</span>
        <span class="font-mono text-xs text-muted-foreground">Ctrl+V or ⌘V, drop a file, or click to choose one</span>
      </button>
    {/if}

    <div class={['flex flex-col gap-3 p-4', dragging ? 'bg-muted' : 'bg-panel', !size && 'hidden']}>
      <div class="relative w-fit max-w-full">
        <canvas
          bind:this={canvas}
          class="block max-h-[75vh] max-w-full cursor-crosshair outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          tabindex="0"
          aria-label="Loaded image. Arrow keys move the cursor, Enter picks the color under it."
          onpointerdown={point}
          onpointermove={point}
          onpointerleave={() => (cursor = null)}
          onclick={pick}
          onkeydown={key}
        ></canvas>

        <div
          class={['pointer-events-none absolute', !mark && 'hidden']}
          style:left="{mark?.left ?? 0}%"
          style:top="{mark?.top ?? 0}%"
        >
          <div class="absolute size-2 -translate-1/2 border border-white outline outline-black"></div>
          <div
            class={[
              'absolute border bg-card',
              mark?.flipX ? 'right-4' : 'left-4',
              mark?.flipY ? 'bottom-4' : 'top-4'
            ]}
          >
            <div class="relative">
              <canvas bind:this={loupe} class="block max-w-none" width={LOUPE_SIZE} height={LOUPE_SIZE}></canvas>
              <div class="absolute top-1/2 left-1/2 size-3 -translate-1/2 border border-white outline outline-black"></div>
            </div>
            <div class="border-t px-2 py-1 font-mono text-xs">{cursor ? toHex(cursor.rgb) : ''}</div>
          </div>
        </div>
      </div>
      <p class="font-mono text-xs text-muted-foreground">
        Click a pixel to pick it. Arrow keys move one pixel, Shift moves ten, Enter picks.
      </p>
    </div>
  </section>

  <aside class="flex flex-col border bg-card lg:sticky lg:top-6" aria-label="Picked color">
    {#if picked}
      <div
        class="flex h-28 items-center justify-center border-b font-mono text-lg"
        style:background-color={toHex(picked)}
        style:color={isLight(picked) ? '#000' : '#fff'}
      >
        {toHex(picked)}
      </div>
      {#each formats as { label, value } (label)}
        <div class="flex h-13 items-center justify-between gap-3 border-b border-hairline pr-2 pl-5 font-mono text-[13px]">
          <div class="flex min-w-0 items-baseline gap-4">
            <span class="w-12 shrink-0 text-xs text-muted-foreground">{label}</span>
            <span class="truncate">{value}</span>
          </div>
          <CopyButton variant="ghost" size="sm" text={value} done="{label} copied">Copy</CopyButton>
        </div>
      {/each}
      <div class="flex flex-col gap-3 px-5 py-4">
        <span class="font-mono text-xs text-muted-foreground">Picked</span>
        <div class="flex flex-wrap gap-2">
          {#each history as rgb (toHex(rgb))}
            <button
              class="size-8 border outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              type="button"
              style:background-color={toHex(rgb)}
              aria-label="Show {toHex(rgb)}"
              onclick={() => (picked = rgb)}
            ></button>
          {/each}
        </div>
      </div>
    {:else}
      <p class="px-5 py-6 text-[15px] leading-normal text-body">
        Load an image and click a pixel. Its color shows up here as HEX, RGB, HSL and OKLCH, each ready to
        copy.
      </p>
    {/if}
  </aside>
</div>
