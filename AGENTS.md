# AGENTS.md

Keep this file current: if a change makes anything here wrong or incomplete, update it in the same change.

## Tech Stack

See the Tech Stack section of `README.md`. If you add, remove, or change a core technology, update it in the same change.

Most of this tech stack had a recent major version, so your training data is likely stale. When unsure about an API, check the official docs instead of guessing.

## Skills

- Use the **svelte-code-writer** and **svelte-core-bestpractices** skills whenever you write or edit Svelte code. Remote functions are enabled, so use those. The enhanced-img plugin is added, so use that for images. Always check the official docs.
- Use the **shadcn-svelte** skill whenever you add or change UI. The component source lives in `src/lib/components/ui` and is ours to change: add components with the CLI as needed and edit existing ones freely.
- If a skill is missing, say so in your reply and ask the user to install it.

## Git Commits & PRs

- No AI attribution anywhere: no `Co-Authored-By` or "Generated with" lines in commits, no `ai/` or `agent/` branch prefixes, nothing about the tool in PR titles or descriptions. Describe the change, not what made it.
- Write concise commit messages following the Conventional Commits spec and name branches after the change.
- Every change goes on a feature branch with a PR. Never push directly to `main`.
- If you push more commits after opening a PR, update its description to cover the full change set.

## Deployment

The site runs on Cloudflare Workers through adapter-cloudflare, configured in `wrangler.jsonc`. Two workflows in `.github/workflows/` do the deploying:

- `deploy-production.yml` deploys to production on every push to `main`.
- `deploy-preview.yml` gives every pull request its own Workers Preview named `pr-<number>`, shown on the pull request as a deployment. Nothing deletes previews: Cloudflare drops the least recently deployed one when the Worker reaches its limit.

## Content

Starters live in `src/lib/content/starters/<slug>/`: `starter.ts` (metadata), `prompt.md` (base steps), `readme.template.md` and `agents.template.md` (the README.md and AGENTS.md the base prompt writes; named `.template` so no tool mistakes them for this repo's own), `addons.ts` (add-on metadata) and `addons/<id>.md` (an add-on's steps). Add-ons carry no AGENTS.md text of their own: each has a step telling the agent to update AGENTS.md and the README tech stack itself. A step that needs the user, such as adding secrets, goes last and says to wait until everything else is done. Steps are numbered from 1 in every file; `compose.ts` renumbers them. `load.ts` validates all of this at build time and only server code may import it; pages receive content as page data. `compose.ts` is pure and runs on both sides. Presets (the home table and `/starters` cards) are in `presets.ts`. Design styles are in `styles.ts`, each with its own prompt in `styles/<id>.md`. A style prompt describes the restyle itself (theme, component conventions, pages) for an app with stock shadcn-svelte components; it does not install the component library. Each was derived from the library's real difference from stock and tested by having an agent apply it blind, so change one only with a new test run. Their previews are drawn by `style-cover.svelte`, which deliberately uses each registry's own fonts and colours instead of this site's tokens. Tools are listed in `tools.ts`. Each is a page at `/tools/<slug>` that runs entirely in the browser, with nothing uploaded, so it stays static like the rest of the site. `src/lib/color.ts` has the colour conversions tools share. Each tool's card on `/tools` shows a still, non-interactive picture of its screen, drawn in `tool-cover.svelte` with this site's tokens; add one there with every new tool.

Each starter is one prerendered page, `/starters/<slug>`. Which add-ons are ticked is client-side state mirrored to the query string, `?add=posts,auth`. The browser owns it: no server code reads it, the page reads it only after mount, and ticking updates the URL with a shallow `goto`. Do not make a page per combination and do not read the query string in a `load`. Markdown for agents: `/starters/<slug>.md` is the base plus every add-on as an optional part. There is one file per starter and no file per add-on. The whole site is static; do not add a route that needs a server.
