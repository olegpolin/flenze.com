You are setting up a new web app. Follow the steps, committing after each one.

1. Get the project name. If there is a README.md, read the name from
   it exactly, then delete the file. If there is none, the project
   name is the folder name.
2. npx sv create --template minimal --types ts --add enhanced-img experimental="features:async,remoteFunctions" --install npm ./
3. npx sv add tailwindcss="plugins:none" --install npm
4. npx shadcn-svelte@latest init --preset b0
   Accept the default for every question it asks.
5. Install the skills:
   {{skill-commands}}
6. Completely replace README.md with the README below, using the
   project name from step 1 as its title.
7. Write the AGENTS.md below to the project root
