<script lang="ts">
  import Seo from '#lib/components/seo.svelte';
  import SectionHeading from '#lib/components/section-heading.svelte';
  import PresetTable from '#lib/components/preset-table.svelte';
  import CodeCompare from '#lib/components/code-compare.svelte';
  import StatsTable from '#lib/components/stats-table.svelte';
  import { Button } from '#lib/components/ui/button/index.ts';
  import { site } from '#lib/config/site.ts';
  import type { PageProps } from './$types';
  import { benchmark, major } from '#lib/content/benchmark.ts';
  import { compare } from '#lib/content/compare.ts';

  let { data }: PageProps = $props();
</script>

<Seo />

<header class="flex flex-col gap-5 pt-18 pb-14">
  <h1 class="max-w-[900px] text-[44px] leading-none font-semibold tracking-[-0.04em] md:text-[68px]">
    {site.tagline}
  </h1>
  <p class="max-w-[760px] text-[19px] leading-normal text-body">
    Left alone, a coding agent reaches for whatever was most common in its training data: React, a
    meta-framework, and a pile of dependencies. Common is not the same as good. Flenze is a small set
    of opinionated starters that point it somewhere better: less code, less JavaScript, and a project
    you can still read in a year. SvelteKit first.
  </p>
  <div class="pt-2">
    <Button href="/starters" size="lg">View starters →</Button>
  </div>
</header>

<PresetTable rows={data.rows} />

<section class="flex flex-col gap-6 pt-22">
  <SectionHeading>The most training data is not the best choice.</SectionHeading>
  <div class="grid gap-x-16 gap-y-4 text-base leading-normal text-body md:grid-cols-2">
    <p>
      The usual advice is to build with whatever the agent has seen the most of, which means React.
      That made sense when a model could only work from memory. It does not anymore. An agent reads
      the current docs, queries the framework's MCP server, runs the type checker and reads the
      error. Give it up-to-date documentation and a newer framework like Svelte is no harder for it
      than React. The gap was never ability. It was defaults.
    </p>
    <p>
      What the training-data argument leaves out is everything after the first commit. React projects
      bloat: a runtime on every page, hooks and effects and dependency arrays, a meta-framework on
      top, and a dependency tree that grows every quarter. The long-term philosophy here is the
      opposite. Keep the code small, keep the framework out of the browser, and keep the project
      readable a year from now.
    </p>
  </div>
</section>

<section class="flex flex-col gap-5 pt-22">
  <SectionHeading>Same component. Two thirds of the code.</SectionHeading>
  <CodeCompare />
  <p class="max-w-[760px] text-base leading-normal text-body">
    No hooks, no setter functions, no fragment wrappers. You change the value and the compiler works
    out what has to update. Less code for a human to read is also less code for an agent to get
    wrong.
  </p>
  <span class="font-mono text-xs text-muted-foreground">
    Source: <a class="text-link underline" href={compare.source.url}>{compare.source.name}</a>,
    Svelte 5 vs React, “Event click”. Forty more examples there.
  </span>
</section>

<section class="grid gap-x-16 gap-y-8 pt-22 md:grid-cols-2">
  <div class="flex flex-col gap-4 text-base leading-normal text-body">
    <SectionHeading>What actually ships to the browser</SectionHeading>
    <p>
      React sends a runtime to every visitor before the first line of your app runs. Svelte compiles
      components into plain DOM updates at build time, so most of the framework never leaves your
      machine.
    </p>
    <p>
      We do not ask you to take that on faith. These are the two scaffolds as their CLIs generate
      them, built with nothing added: {benchmark.columns.next.scaffold} for {benchmark.columns.next.name}
      {major(benchmark.columns.next.version)} and {benchmark.columns.sveltekit.scaffold} for
      {benchmark.columns.sveltekit.name}
      {major(benchmark.columns.sveltekit.version)}. Same measurement on both: one production load in
      headless Chrome with the cache off, gzip recomputed identically, dependencies and disk counted
      after a clean install.
    </p>
    <p>This is the cost before you have written a line. Everything you add goes on top of it.</p>
  </div>
  <StatsTable />
</section>
