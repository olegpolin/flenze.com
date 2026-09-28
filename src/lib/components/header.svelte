<script lang="ts">
  import * as Popover from '#lib/components/ui/popover/index.ts';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.ts';
  import { mode, toggleMode } from 'mode-watcher';
  import { page } from '$app/state';
  import SunIcon from '@lucide/svelte/icons/sun';
  import MoonIcon from '@lucide/svelte/icons/moon';
  import Logo from '#lib/assets/logo.svelte';
  import { site } from '#lib/config/site.ts';
  import { accentBg, accentBlock } from '#lib/accent.ts';

  let mobileMenuOpen = $state(false);

  const themeLabel = $derived(mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

  function isActive(href: string) {
    return page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
  }
</script>

{#snippet themeIcon()}
  {#if mode.current === 'dark'}
    <MoonIcon />
  {:else}
    <SunIcon />
  {/if}
{/snippet}

<header class="sticky top-0 z-50 border-b bg-panel font-mono text-sm">
  <div class="mx-auto flex h-16 w-full max-w-site items-stretch px-4 md:px-16">
    <a class="flex items-center gap-2.5 pr-9 font-sans" href="/">
      <Logo class="size-7" />
      <span class="text-[22px] font-semibold tracking-[-0.04em] lowercase">{site.name}</span>
    </a>
  
    <nav class="flex max-md:hidden" aria-label="Main">
      {#each site.nav as { title, href, accent } (href)}
        {@const active = isActive(href)}
        <a
          {href}
          aria-current={active ? 'page' : undefined}
          class={[
            'flex items-center gap-2.5 px-5',
            active ? ['font-semibold', accentBlock[accent]] : 'hover:text-link'
          ]}
        >
          <span>{title}</span>
          {#if !active}
            <span class={['size-3', accentBg[accent]]} aria-hidden="true"></span>
          {/if}
        </a>
      {/each}
    </nav>
  
    <div class="flex-1"></div>
  
    <a
      class="flex items-center pl-3.5 text-[13px] text-muted-foreground hover:text-link max-md:hidden"
      href={site.github}
      rel="noopener"
    >
      GitHub
    </a>
  
    <Button
      class="ml-5 self-center max-md:hidden"
      variant="outline"
      size="icon-lg"
      aria-label={themeLabel}
      onclick={toggleMode}
    >
      {@render themeIcon()}
    </Button>
  
    <Popover.Root bind:open={mobileMenuOpen}>
      <Popover.Trigger
        class={['self-center md:hidden', buttonVariants({ variant: 'outline', size: 'icon-lg' })]}
        aria-label="Toggle menu"
      >
        <span class="relative block size-4" aria-hidden="true">
          <span
            class={[
              'absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100',
              mobileMenuOpen ? 'top-[0.4rem] -rotate-45' : 'top-1'
            ]}
          ></span>
          <span
            class={[
              'absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100',
              mobileMenuOpen ? 'top-[0.4rem] rotate-45' : 'top-2.5'
            ]}
          ></span>
        </span>
      </Popover.Trigger>
      <Popover.Content
        class="h-(--bits-popover-content-available-height) w-(--bits-popover-content-available-width) gap-0 overflow-y-auto border-none bg-background p-0 font-mono shadow-none ring-0"
        align="start"
        side="bottom"
        preventScroll
      >
        <nav class="flex min-h-full flex-col px-4 pt-2 pb-4" aria-label="Main">
          {#each site.nav as { title, href, accent } (href)}
            <a
              {href}
              aria-current={isActive(href) ? 'page' : undefined}
              class="flex h-16 items-center justify-between border-b border-hairline text-lg"
              onclick={() => (mobileMenuOpen = false)}
            >
              <span>{title}</span>
              <span class={['size-3', accentBg[accent]]} aria-hidden="true"></span>
            </a>
          {/each}
          <a
            class="flex h-16 items-center justify-between border-b border-hairline text-lg"
            href={site.github}
            rel="noopener"
          >
            GitHub
          </a>
          <div class="mt-auto flex justify-end pt-8">
            <Button variant="outline" size="icon-lg" aria-label={themeLabel} onclick={toggleMode}>
              {@render themeIcon()}
            </Button>
          </div>
        </nav>
      </Popover.Content>
    </Popover.Root>
  </div>
</header>
