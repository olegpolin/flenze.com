<script lang="ts">
  import CopyButton from '#lib/components/copy-button.svelte';
  import SectionHeading from '#lib/components/section-heading.svelte';

  interface Props {
    addons: { id: string; name: string; description: string; checked: boolean; standalone: string }[];
    ontoggle: (id: string) => void;
    /** The starter's markdown document, offered when JavaScript is off. */
    reference: string;
  }

  let { addons, ontoggle, reference }: Props = $props();
</script>

<section class="flex flex-col gap-5">
  <div class="flex flex-col gap-3">
    <SectionHeading>Add-ons</SectionHeading>
    <p class="max-w-[760px] text-base leading-normal text-body">
      Tick what you need. The pieces, the reasoning and the prompt below update to match, and the URL
      carries your selection.
    </p>
    <noscript>
      <p class="max-w-[760px] text-base leading-normal text-body">
        Ticking add-ons needs JavaScript. The prompt below is the base starter. The base and every
        add-on are also in <a class="text-link underline" href={reference}>one markdown file</a>.
      </p>
    </noscript>
  </div>

  <div class="flex flex-col border-b">
    {#each addons as addon (addon.id)}
      <div
        class="grid grid-cols-[36px_1fr] items-center gap-x-5 gap-y-1.5 border-t py-4 md:min-h-18 md:grid-cols-[36px_180px_1fr_auto] md:py-3"
      >
        <!-- `autocomplete="off"` stops the browser restoring a tick the URL does not have. -->
        <input
          class="ml-2 size-[18px] accent-ink"
          type="checkbox"
          id="addon-{addon.id}"
          autocomplete="off"
          checked={addon.checked}
          onchange={() => ontoggle(addon.id)}
        />
        <label class="text-lg font-semibold" for="addon-{addon.id}">{addon.name}</label>
        <p class="col-start-2 text-[15px] leading-normal text-body md:col-start-3">{addon.description}</p>
        <CopyButton
          class="col-start-2 justify-self-start md:col-start-4"
          variant="link"
          text={addon.standalone}
          done="{addon.name} add-on copied"
        >
          Copy add-on only
        </CopyButton>
      </div>
    {/each}
  </div>
</section>
