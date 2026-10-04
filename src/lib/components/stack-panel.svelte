<script lang="ts">
  import Chip from '#lib/components/chip.svelte';
  import SectionHeading from '#lib/components/section-heading.svelte';
  import { accentBg, type Accent } from '#lib/accent.ts';

  interface Props {
    pieces: { id: string; name: string; url: string; accent: Accent | null }[];
    skills: { id: string; name: string; url: string }[];
    /** The selected add-ons, for the colour key. */
    addons: { id: string; name: string; accent: Accent }[];
  }

  let { pieces, skills, addons }: Props = $props();

  const label = 'font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase';
</script>

<section class="flex flex-col gap-5">
  <SectionHeading>The stack</SectionHeading>
  <div class="grid border bg-card md:grid-cols-2">
    <div class="flex flex-col gap-4 border-b p-6 md:border-r md:border-b-0 md:px-7 md:pt-6 md:pb-7">
      <div class="flex items-baseline justify-between gap-4">
        <span class={label}>Pieces</span>
        {#if addons.length}
          <span class="flex flex-wrap justify-end gap-x-4 gap-y-1">
            {#each addons as addon (addon.id)}
              <span class={[label, 'flex items-center gap-1.5']}>
                <span class={['size-2.5 border', accentBg[addon.accent]]} aria-hidden="true"></span>
                {addon.name}
              </span>
            {/each}
          </span>
        {/if}
      </div>
      <div class="flex flex-wrap gap-2">
        {#each pieces as piece (piece.id)}
          <Chip class="h-10 px-4 text-base" href={piece.url} accent={piece.accent ?? undefined}>{piece.name}</Chip>
        {/each}
      </div>
    </div>
    <div class="flex flex-col gap-4 p-6 md:px-7 md:pt-6 md:pb-7">
      <div class="flex items-baseline justify-between gap-4">
        <span class={label}>Skills</span>
        <span class={label}>Installed by the prompt</span>
      </div>
      <div class="flex flex-wrap gap-2">
        {#each skills as skill (skill.id)}
          <a
            class="inline-flex h-10 items-center bg-primary px-3.5 font-mono text-[13px] text-primary-foreground hover:bg-primary/80"
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {skill.name}
          </a>
        {/each}
      </div>
      <p class="text-sm leading-normal text-muted-foreground">
        Installed into the repo, so they work with any agent that reads AGENTS.md.
      </p>
    </div>
  </div>
</section>
