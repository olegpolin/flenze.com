1. npm i -D @sveltejs/adapter-cloudflare wrangler, and replace
   adapter-auto with adapter-cloudflare in the SvelteKit config.
2. Add wrangler.jsonc with the name from package.json:
   ```jsonc
   {
     "name": "<name>",
     "main": ".svelte-kit/cloudflare/_worker.js",
     "compatibility_date": "2026-10-01",
     "assets": {
       "binding": "ASSETS",
       "directory": ".svelte-kit/cloudflare"
     },
     "observability": {
       "enabled": true
     },
     "previews": {}
   }
   ```
3. Add three GitHub Actions workflows in .github/workflows/.
   deploy-production.yml deploys to production on every push to main:
   ```yaml
   name: Deploy

   on:
     push:
       branches: [main]

   permissions:
     contents: read

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v7
         - uses: actions/setup-node@v7
           with:
             node-version: lts/*
             cache: npm
         - run: npm ci
         - run: npm run build
         - uses: cloudflare/wrangler-action@v4
           with:
             apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
             accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
             # The action uses the wrangler that `npm ci` installed (pinned in package.json).
             command: deploy
   ```
   deploy-preview.yml gives every pull request its own Workers Preview,
   shown on the pull request as a deployment:
   ```yaml
   name: Deploy preview

   on:
     pull_request:
       types: [opened, synchronize, reopened]

   permissions:
     contents: read
     deployments: write

   concurrency:
     group: preview-${{ github.event.number }}

   jobs:
     deploy:
       if: github.event.pull_request.head.repo.full_name == github.repository
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v7
         - uses: actions/setup-node@v7
           with:
             node-version: lts/*
             cache: npm
         - run: npm ci
         - run: npm run build
         - uses: cloudflare/wrangler-action@v4
           with:
             apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
             accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
             # The action uses the wrangler that `npm ci` installed (pinned in package.json).
             command: preview --name pr-${{ github.event.number }}
             gitHubToken: ${{ secrets.GITHUB_TOKEN }}
   ```
   cleanup-preview.yml deletes that Preview when the pull request closes:
   ```yaml
   name: Clean up preview

   on:
     pull_request:
       types: [closed]

   permissions:
     contents: read

   concurrency:
     group: preview-${{ github.event.number }}

   jobs:
     cleanup:
       if: github.event.pull_request.head.repo.full_name == github.repository
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v7
         - uses: actions/setup-node@v7
           with:
             node-version: lts/*
             cache: npm
         - run: npm ci
         - uses: cloudflare/wrangler-action@v4
           with:
             apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
             accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
             command: preview delete --name pr-${{ github.event.number }} --skip-confirmation
   ```
4. Update AGENTS.md for what you just added, in an existing section or
   a new one, and add it to the Tech Stack section of README.md.
5. Only when every step above is finished and committed, prompt the
   user to add two repository secrets on GitHub: CLOUDFLARE_ACCOUNT_ID,
   and CLOUDFLARE_API_TOKEN from an Account API token made with the
   "Edit Cloudflare Workers" template.
