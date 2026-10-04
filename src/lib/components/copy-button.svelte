<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { Button, type ButtonProps } from '#lib/components/ui/button/index.ts';

  interface Props extends Omit<ButtonProps, 'onclick' | 'href'> {
    /** What goes on the clipboard. */
    text: string;
    /** Toast shown after copying. */
    done?: string;
  }

  let { text, done = 'Copied', children, ...restProps }: Props = $props();

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(done);
    } catch {
      toast.error('Could not copy. Select the text and copy it by hand.');
    }
  }
</script>

<Button onclick={copy} {...restProps}>
  {@render children?.()}
</Button>
