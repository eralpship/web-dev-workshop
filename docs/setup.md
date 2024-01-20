# Setup

I prepared a development docker container so you don't have to waste time installing the right nodejs version. I recommend working inside the container for this workshop. However it is optional. If you feel confident with installing nodejs, check the required node version in `.nvmrc` file. Skip to Install Dependencies secion and run the command directly on your local setup. 

For this workshop, I set the project up for you that we have the same setup to start from. If you would make your own project from scratch, you could create it up with [vite's scaffolding utility](https://vitejs.dev/guide/#scaffolding-your-first-vite-project). Vite is the bundler we are using in this project, we will learn about it later.
Using the utility if you'd run the command `npm create vite@latest your-project-name-here -- --template react-swc-ts` you'd generate a pretty similar boilerplate.

We typically use project generators to create react projects nowadays. Because configuring tooling is trivial yet it takes time. If you are interested, you can set the project by yourself manually, for that see [how to create a react project here](https://react.dev/learn/start-a-new-react-project)

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

Point your browser to [http://localhost:8000](http://localhost:8000).

You should see this page:

![start page|20%](assets/start-page.png)

## Install prettier editor extension

Prettier helps us format the code automatically. 
If you are using vscode, when you open the project it will prompt you to install it. Otherwise install extension [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) manually.

If you are not using vscode then install equivalent prettier extension to your editor. Or continue without installing, automatic formatting is optional so feel free to ignore it.

## Check if hot reload / hot module replacing (HMR) works. 

try editing the file `src/App.tsx` ie:
```diff
- <h1>Vite + React</h1>
+ <h1>Starship</h1>
```
When you save you should see the text at the center of the page change automatically without refreshing the page.

If you are on Windows and HMR doesn't work see `vite.config.ts` file and uncomment the relevant lines.
