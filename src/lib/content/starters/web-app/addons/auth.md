1. npx sv add better-auth="demo:github" drizzle="database:postgresql+postgresql:neon" --install npm
2. Replace all new occurrences of github with google to use Google OAuth instead of GitHub, including the env vars.
3. npm run auth:schema
4. npm run db:generate, with any DATABASE_URL set, and commit the
   migration it writes. Schema changes always go through migrations,
   never db:push.
5. If GitHub Actions deploy the app, update the workflows for the
   database: every pull request preview gets its own Neon branch from
   Neon's create-branch action, migrations run against it before the
   preview deploys and against production before each production
   deploy, the preview's DATABASE_URL and ORIGIN are set as its own
   secrets right after it deploys, the pull request fails if the schema
   changed without a committed migration, and the cleanup workflow
   deletes the branch. Builds get placeholder values for the env vars;
   real values live on the Workers.
6. Update AGENTS.md for what you just added, in an existing section or
   a new one, and add it to the Tech Stack section of README.md.
7. Only when every step above is finished and committed, prompt the user to get all the required env vars and set up neon project and google oauth credentials and then run npm run db:migrate, and to add any repository secrets the workflows now need
