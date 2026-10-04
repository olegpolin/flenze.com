<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import type { PageProps } from './$types';
  import Seo from '#lib/components/seo.svelte';
  import AddonChecklist from '#lib/components/addon-checklist.svelte';
  import StackPanel from '#lib/components/stack-panel.svelte';
  import WhyList from '#lib/components/why-list.svelte';
  import PromptPanel from '#lib/components/prompt-panel.svelte';
  import {
    canonicalAdd,
    compose,
    composeAddon,
    readAdd,
    starterHref,
    toggleAddon
  } from '#lib/content/compose.ts';

  let { data }: PageProps = $props();
  const starter = $derived(data.starter);

  // The page is prerendered with nothing ticked, and the query string cannot be
  // read while prerendering. So the selection stays empty until the component
  // has mounted, which keeps the first client render identical to the HTML.
  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });

  // Follows the URL, including the back button. A shallow `goto` reports its
  // URL on `page.shallow`, not `page.url`, so that one is read first.
  let add = $derived(mounted ? canonicalAdd(starter, readAdd(page.shallow?.url ?? page.url)) : []);

  const composed = $derived(compose(starter, add));
  const selected = $derived(starter.addons.filter((a) => add.includes(a.id)));
  const addonNames = $derived(Object.fromEntries(starter.addons.map((a) => [a.id, a.name])));

  const title = $derived.by(() => {
    const names = selected.map((a) => a.name);
    if (!names.length) return starter.title;
    const list = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0];
    return `${starter.title} with ${list}`;
  });

  function toggle(id: string) {
    add = toggleAddon(starter, add, id);
    // Update the address bar in place: no navigation, no new history entry.
    goto(starterHref(starter.slug, add), { shallow: true, replace: true });
  }
</script>

<Seo {title} description={starter.description} />

<div class="font-mono text-xs text-muted-foreground uppercase">
  <a class="hover:text-link" href="/starters">Starters</a> / {starter.name}
</div>

<header class="flex flex-col gap-5 pt-16 pb-12">
  <h1 class="text-[44px] leading-none font-semibold tracking-[-0.04em] md:text-[64px]">{starter.title}</h1>
  <p class="max-w-[720px] text-[19px] leading-normal text-body">{starter.tagline}</p>
</header>

<AddonChecklist
  reference="/starters/{starter.slug}.md"
  addons={starter.addons.map((addon) => ({
    id: addon.id,
    name: addon.name,
    description: addon.description,
    checked: add.includes(addon.id),
    standalone: composeAddon(starter, addon)
  }))}
  ontoggle={toggle}
/>

<div class="pt-18">
  <StackPanel pieces={composed.pieces} skills={composed.skills} addons={selected} />
</div>

<div class="pt-18">
  <WhyList pieces={composed.pieces} {addonNames} />
</div>

<div class="pt-18">
  <PromptPanel title="Bootstrap prompt · {composed.label}" prompt={composed.prompt} />
</div>
