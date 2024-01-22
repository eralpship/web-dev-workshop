# Setup

I recommend working inside a container for this workshop. I prepared a development docker container so you don't have to waste time installing the right nodejs version. However the container is optional. If you feel confident with installing nodejs, check the required node version in `.nvmrc` file. Skip to Install Dependencies section and run the command directly on your local setup.

For this workshop, I set the project up for you that we have the same setup to start from. If you would like to make your own project from scratch, you could create it with the [vite's scaffolding utility](https://vitejs.dev/guide/#scaffolding-your-first-vite-project). Vite is the bundler we are using in this project, we will learn about it later.
Using the following command `npm create vite@latest your-project-name-here -- --template react-swc-ts` would generate a pretty similar boilerplate.

Nowadays, project generators are typically used to create react projects, because configuring tooling can be cumbersome. If you are interested, you can set up the project by yourself from the get go manually, for that see [how to create a react project here](https://react.dev/learn/start-a-new-react-project)

I suggest we continue with the docker container from this repository, so let's...

## Build & run docker container

- Start docker desktop if it is not running already

- Build the development image on your local machine

```sh
docker-compose up --build --no-recreate -d
```

Check the status of the docker container

```sh
docker-compose ps
```

You should see this

```sh
vite_docker   /bin/sh   Up      0.0.0.0:8000->8000/tcp
```

Access docker container's shell

```sh
docker exec -it vite_docker sh
```

## Install dependencies

```sh
# Run this in docker container's shell
npm i
```

## Run the development server

```sh
# Run this in docker container's shell
npm run dev
```

Navigate on your browser to [http://localhost:8000](http://localhost:8000).

You should see this page:

![start page|20%](assets/start-page.png)

## Installing Prettier editor extension (optional)

Prettier helps us format the code automatically.
The code editor VS Code will prompt you to install Prettier on opening the project. Otherwise install extension [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) manually.

If you are not using VS Code, install the equivalent prettier extension to your preferred editor. You can also continue without the extension, automatic formatting is optional so feel free to ignore it.

## Check if hot reload / hot module replacing (HMR) works.

Edit the file `src/App.tsx` ie:

```diff
- <h1>Vite + React</h1>
+ <h1>Starship</h1>
```

When you save you should see the text at the center of the page change automatically without refreshing the page.

If you are on Windows and HMR doesn't work see `vite.config.ts` file and uncomment the relevant lines.
