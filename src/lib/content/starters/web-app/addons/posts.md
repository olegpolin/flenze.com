1. npx sv add mdsvex --install npm
2. npm i -D mdsvex@next
3. In vite.config.ts, move the existing mdsvex(...) call, options unchanged, out of `preprocess` inside sveltekit({...}) and add it as an entry in `plugins`. Remove `preprocess` if it's now empty.
4. Update AGENTS.md for what you just added, in an existing section or
   a new one, and add it to the Tech Stack section of README.md.
