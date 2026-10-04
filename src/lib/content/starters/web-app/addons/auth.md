1. npx sv add better-auth="demo:github" drizzle="database:postgresql+postgresql:neon" --install npm
2. Replace all new occurrences of github with google to use Google OAuth instead of GitHub, including the env vars.
3. npm run auth:schema
4. Update AGENTS.md for what you just added, in an existing section or
   a new one, and add it to the Tech Stack section of README.md.
5. Only when every step above is finished and committed, prompt the user to get all the required env vars and set up neon project and google oauth credentials and then run npm run db:push
