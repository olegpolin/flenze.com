<script lang="ts">
  import './layout.css';
  import favicon from '#lib/assets/favicon.svg';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '#lib/components/ui/sonner/index.ts';
  import Header from '#lib/components/header.svelte';
  import Footer from '#lib/components/footer.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode="system" />

<Toaster richColors />

<div class="flex min-h-svh flex-col">
  <Header />

  <div class="mx-auto flex w-full max-w-site flex-1 flex-col px-4 pt-6 pb-10 md:px-16">
    <main class="flex flex-1 flex-col">
      {@render children()}
    </main>

    <Footer />
  </div>
</div>
