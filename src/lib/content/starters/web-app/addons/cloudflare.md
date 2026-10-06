1. npm i -D @sveltejs/adapter-cloudflare wrangler, npm uninstall
   @sveltejs/adapter-auto, and replace adapter-auto with
   adapter-cloudflare in vite.config.ts.
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
3. Add two GitHub Actions workflows in .github/workflows/.
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
4. If the app has a database, update the workflows for the
   database: every pull request preview gets its own Neon branch from
   Neon's create-branch action; migrations run against it before the
   preview deploys and against production before each production
   deploy; the preview's DATABASE_URL and ORIGIN are set as its own
   secrets right after it deploys; the pull request fails if the schema
   changed without a committed migration; and a new cleanup-preview.yml
   deletes the branch when the pull request closes. Builds get
   placeholder values for the env vars; real values live on the Workers.
   If the app has better-auth, sign-in works on previews through its
   OAuth Proxy plugin: productionURL is the production origin,
   OAUTH_PROXY_SECRET is a new env var every environment shares, and the
   previews' URL pattern is a trusted origin. Only the production
   callback URL is registered with Google.
5. Update AGENTS.md for what you just added, in an existing section or
   a new one, and add it to the Tech Stack section of README.md.
6. Last of all, when every other step in this prompt is finished and
   committed, prompt the user to add two repository secrets on GitHub:
   CLOUDFLARE_ACCOUNT_ID, and CLOUDFLARE_API_TOKEN from an Account API
   token made with the "Edit Cloudflare Workers" template, plus any the
   database steps need.
