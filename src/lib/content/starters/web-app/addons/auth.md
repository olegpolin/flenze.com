1. npx sv add better-auth="demo:github" drizzle="database:postgresql+postgresql:neon" --install npm
2. Replace all new occurrences of github with google to use Google OAuth instead of GitHub, including the env vars.
3. npm run auth:schema
4. npm run db:generate, with any DATABASE_URL set, and commit the
   migration it writes. Schema changes always go through migrations,
   never db:push.
5. If GitHub Actions deploy the app, update the workflows for the
   database: every pull request preview gets its own Neon branch from
   Neon's create-branch action; migrations run against it before the
   preview deploys and against production before each production
   deploy; the preview's DATABASE_URL and ORIGIN are set as its own
   secrets right after it deploys; the pull request fails if the schema
   changed without a committed migration; and a new cleanup-preview.yml
   deletes the branch when the pull request closes. Builds get
   placeholder values for the env vars; real values live on the Workers.
   Google sign-in works on previews through better-auth's OAuth Proxy
   plugin: productionURL is the production origin, OAUTH_PROXY_SECRET is
   a new env var every environment shares, and the previews' URL pattern
   is a trusted origin. Only the production callback URL is registered
   with Google.
6. Update AGENTS.md for what you just added, in an existing section or
   a new one, and add it to the Tech Stack section of README.md.
7. Last of all, when every other step in this prompt is finished and committed, prompt the user to get all the required env vars and set up neon project and google oauth credentials and then run npm run db:migrate, and to add any repository secrets the workflows now need
