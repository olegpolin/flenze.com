<script lang="ts">
  import * as NavigationMenu from '#lib/components/ui/navigation-menu/index.ts';
  import * as DropdownMenu from '#lib/components/ui/dropdown-menu/index.ts';
  import * as Popover from '#lib/components/ui/popover/index.ts';
  import * as ToggleGroup from '#lib/components/ui/toggle-group/index.ts';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.ts';
  import { mode, userPrefersMode } from 'mode-watcher';
  import SunIcon from '@lucide/svelte/icons/sun';
  import MoonIcon from '@lucide/svelte/icons/moon';
  import MonitorIcon from '@lucide/svelte/icons/monitor';
  import Logo from '#lib/assets/logo.svelte';
  import { site } from '#lib/config/site.ts';

  const navLinks = [
    {
      title: 'Starters',
      href: '/starters'
    },
    {
      title: 'Styles',
      href: '/styles'
    },
    {
      title: 'Tools',
      href: '/tools'
    }
  ];

  let mobileMenuOpen = $state(false);
</script>

<header class="sticky top-0 z-50 flex h-16 flex-row items-center justify-between gap-8 bg-background px-6 py-3">
  <div class="flex items-center gap-8">
    <a class="flex items-center gap-2 text-xl font-semibold" href="/">
      <Logo class="size-8" />
      {site.name}
    </a>

    <NavigationMenu.Root class="max-lg:hidden">
      <NavigationMenu.List>
        {#each navLinks as { title, href } (href)}
          <NavigationMenu.Item>
            <NavigationMenu.Link>
              {#snippet child()}
                <Button class="px-4" variant="ghost" {href}>{title}</Button>
              {/snippet}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        {/each}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>

  <div class="flex items-center gap-2">
    <div class="flex items-center gap-2 max-lg:hidden">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
          {#if mode.current === 'light'}
            <SunIcon />
          {:else if mode.current === 'dark'}
            <MoonIcon />
          {/if}
          <span class="sr-only">Toggle theme</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.RadioGroup bind:value={userPrefersMode.current}>
            <DropdownMenu.RadioItem value="light">
              <SunIcon class="mr-2" />
              Light
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="dark">
              <MoonIcon class="mr-2" />
              Dark
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="system">
              <MonitorIcon class="mr-2" />
              System
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>

    <Popover.Root bind:open={mobileMenuOpen}>
      <Popover.Trigger class={['lg:hidden', buttonVariants({ variant: 'ghost', size: 'icon' })]}>
        <div class="flex h-8 flex-row items-center">
          <div class="relative size-4">
            <span
              class={[
                'absolute inset-s-0 block h-0.5 w-4 bg-foreground transition-all duration-100',
                mobileMenuOpen ? 'top-[0.4rem] -rotate-45' : 'top-1'
              ]}
            ></span>
            <span
              class={[
                'absolute inset-s-0 block h-0.5 w-4 bg-foreground transition-all duration-100',
                mobileMenuOpen ? 'top-[0.4rem] rotate-45' : 'top-2.5'
              ]}
            ></span>
          </div>
          <span class="sr-only">Toggle Menu</span>
        </div>
      </Popover.Trigger>
      <Popover.Content
        class="no-scrollbar h-(--bits-popover-content-available-height) w-(--bits-popover-content-available-width) overflow-y-auto rounded-none border-none ring-0 bg-background/90 p-0 shadow-none backdrop-blur"
        align="start"
        side="bottom"
        preventScroll
      >
        <div class="flex min-h-full flex-col gap-8 overflow-auto p-6">
          <div class="flex flex-col gap-3">
            {#each navLinks as { title, href } (href)}
              <a class="text-2xl font-medium active:opacity-60" {href} onclick={() => (mobileMenuOpen = false)}>
                {title}
              </a>
            {/each}
          </div>

          <div class="mt-auto flex flex-col gap-8">
            <ToggleGroup.Root
              type="single"
              bind:value={
                () => userPrefersMode.current,
                (value) => {
                  if (value) userPrefersMode.current = value as 'light' | 'dark' | 'system';
                }
              }
              class="bg-muted text-muted-foreground inline-flex w-full rounded-lg p-1"
            >
              <ToggleGroup.Item
                value="light"
                class="flex-1 gap-1.5 rounded-md! border-0 bg-transparent data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm"
              >
                <SunIcon class="mr-2" /> Light
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="dark"
                class="flex-1 gap-1.5 rounded-md! border-0 bg-transparent data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm"
              >
                <MoonIcon class="mr-2" /> Dark
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="system"
                class="flex-1 gap-1.5 rounded-md! border-0 bg-transparent data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm"
              >
                <MonitorIcon class="mr-2" /> System
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  </div>
</header>
