# Payload CMS with Next.js in a monorepo using Yarn workspaces
In this example, we will build a monorepo with Payload CMS and Next.js.

To get started, we will create two folders, namely `cms` that will contain Payload CMS and `web` that will contain Next.js.

## Create Payload CMS
To create Payload CMS we will use the `npx create-payload-app` command from the root folder of our project.

```
Project name: cms
Choose project template: blank
Enter MongoDB connection: mongodb://localhost/cms
```

After Payload CMS installs all dependencies, we will create a Next.js application with the following command `npx create-next-app@latest --typescript`.

```
What is your project named: web
Would you like to use ESLint with this project: yes
Would you like to use src directory with this project: no
Would you like to use experimental app directory with this project: no
What import alias would you like to configure: none
```

After Next.js finishes with the installation, we will init package.json at the root folder. Therefore run `yarn init`.
```
Name: any you wish
Version: any you wish
Description: any you wish
Entry point: leave it at index.js
Repository URL: any you wish
Author: any you wish
License: any you wish
Private: true
```

After a root `package.json` is created, we will add the following to the `package.json`.
```json
"workspaces": [
  "cms",
  "web"
]
```

This tells Yarn we want a monorepo with two workspaces named `cms` and `web`.

After this, delete `node_modules` folder in both `cms` and `web`. Also, delete any `yarn.lock` or `package-lock.json` you have in either `cms` or `web` folders.

Then, we need to install to the root `package.json` two packages:
- concurrently
- wait-on

Therefore run `yarn add concurrently wait-on -D -W`
We use two flags:
- `D` to add it as a dev dependency
- `W` to add it to the root `package.json`

After this, the entire project is working as a monorepo. Therefore you have only one `yarn.lock`, and most of `node_modules` are installed to the root folder. Folder `node_modules` inside `cms` or `web` contain most of the time only dev dependencies.

Now, we need to change the port of our Next.js application. We want to run:
- Payload on port 3000 (default)
- Next.js on port 5000

To achieve this easily, go to Next.js folder and update `package.json` scripts to:
```json
"scripts": {
  "dev": "next dev -p 5000",
  "build": "next build",
  "start": "next start -p 5000",
  "lint": "next lint"
},
```

Then to the root `package.json` add these scripts:
```json
"scripts": {
  "dev": "concurrently --kill-others-on-fail \"yarn dev:cms\" \"yarn dev:web\"",
  "dev:web": "yarn workspace web dev",
  "dev:cms": "yarn workspace cms dev",
  "generate:types": "yarn workspace cms generate:types",
  "prebuild": "yarn workspace cms generate:types ",
  "build": "concurrently --kill-others-on-fail \"yarn build:cms && yarn start:cms\" \"yarn wait-on tcp:127.0.0.1:3000 && yarn build:web && yarn start:web\"",
  "build:web": "yarn workspace web build",
  "build:cms": "yarn workspace cms build",
  "start": "concurrently --kill-others-on-fail \"yarn start:web\"  \"yarn start:cms\"",
  "start:web": "yarn workspace web start",
  "start:cms": "yarn workspace cms serve"
},
```

From root folder run `yarn dev`. You should be able to access Payload at `localhost:3000` and Next.js at `localhost:5000`.

You can also build Payload and Next.js at the same time. Run `yarn build` and both packages will build and launch too. 

Let's create simple `page` collection. Change the `Examples.ts` collection to `Pages.ts` and change the content to the one in this example.

Add this collection to the `payload.config.ts`.

To make importing a bit easier, we can add `"baseUrl": "."` to the `compilerOptions` inside `tsconfig.json` for your Next.js application. 

Let's add component named `RenderBlocks` to our Next.js application. This component will correctly render specific blocks we get from Payload.

Add this script to `package.json` inside Payload folder:
```json
"copy:types": "copyfiles payload-types.ts ../web"
```

And change the `generate:types` script to 
```json
"generate:types": "cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts payload generate:types && yarn copy:types"
```