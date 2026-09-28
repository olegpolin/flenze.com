<!--
  The social preview image is authored as an SVG in src/lib/assets/social-preview.svg,
  built on top of src/lib/assets/favicon.svg. Whenever that SVG changes, re-render it to
  static/social-preview.png at 1200x630, the size declared in the og:image tags below.
-->
<script lang="ts">
  import { page } from '$app/state';
  import { site } from '#lib/config/site.ts';

  interface Props {
    title?: string;
    description?: string;
  }

  let { title, description = site.description }: Props = $props();

  const fullTitle = $derived(title ? `${title} - ${site.name}` : `${site.name} - ${site.tagline}`);
  const canonicalUrl = $derived(new URL(page.url.pathname, site.url).href);
  const ogImage = `${site.url}/social-preview.png`;
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="{site.name}. {site.tagline}" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
