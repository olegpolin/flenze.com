<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '#lib/components/ui/sonner/index.ts';
	import Header from '#lib/components/header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode="system" />

<Toaster richColors />

<div class="flex min-h-svh flex-col">
	<Header />

	<main class="flex-1">
		{@render children()}
	</main>
</div>
