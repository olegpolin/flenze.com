# AGENTS.md

Keep this file current: if a change makes anything here wrong or incomplete, update it in the same change.

## Tech Stack

See the Tech Stack section of `README.md`. If you add, remove, or change a core technology, update it in the same change.

Most of this tech stack had a recent major version, so your training data is likely stale. When unsure about an API, check the official docs instead of guessing.

## Skills

- Use the **svelte-code-writer** and **svelte-core-bestpractices** skills whenever you write or edit Svelte code.
- Use the **shadcn-svelte** skill whenever you add or change UI. The component source lives in `src/lib/components/ui` and is ours to change: add components with the CLI as needed and edit existing ones freely.
- If a skill is missing, say so in your reply and ask the user to install it.

## Git Commits & PRs

- No AI attribution anywhere: no `Co-Authored-By` or "Generated with" lines in commits, no `ai/` or `agent/` branch prefixes, nothing about the tool in PR titles or descriptions. Describe the change, not what made it.
- Write concise commit messages following the Conventional Commits spec and name branches after the change.
- Every change goes on a feature branch with a PR. Never push directly to `main`.
- If you push more commits after opening a PR, update its description to cover the full change set.
