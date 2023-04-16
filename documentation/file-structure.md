### File features

---

`npm run build`  
Creates a `dist` file that has whole new client server situation (for bundle/deploy)

<details>
    <summary> package.json </summary>

  ```js
    "scripts": {
      "build": "run-s build:client build:server",
      "build:client": "vite build",
      "build:server": "tsc -p server/tsconfig.json",
      "start": "node dist/server/index.js",
      "dev": "run-p dev:client dev:server",
      "dev:client": "vite",
      "dev:server": "nodemon server/index.ts",
    },
  ```

  `dist/server/index.js` what is the role dist plays here?  
  fix?: After running `npm run build` a dist folder is created with essentially what we know as the bundle is in there with the project etc

</details>

<details>
  <summary> Dockerfile & Procfile </summary>

Docker: stuff helps with the deployment issues  
Procfile:  
Pretty self explanatory but could do with some reinforcement as to each commands defined role
</details>

<details>
  <summary>vite.config.js</summary>
  
  ```js
    export default defineConfig({
      plugins: [react()],
      server: {
        proxy: {
          '/api': 'http://localhost:3000',
        },
      },
    })
```

  `'/api': 'http://localhost:3000'` will run all /api routes on local host 3000

</details>

<details>
  <summary>server.ts</summary>

  ```js
    if (process.env.NODE_ENV === 'production') {
      server.use('/assets', express.static('/app/dist/assets'))
      server.get('*', (req, res) => {
        res.sendFile('/app/dist/index.html')
      })
    }
  ```

  Josh's thoughts: if we are in ye old production (deployment) then the server we want to be using is the one built in the `dist` folder  
  The `express.static('/app/dist/assets)` is the big ol bundle lookin boi, so thats the file that is serving  
  Wildcard route created which just serves te classic `index.html` file, but from the dist folder instead

</details>

<details>
  <summary>tsconfig.json</summary>
  Two seperate files the server > tsconfig.json seems to just extend the rootyBoi though. With specific server details. outDir?
</details>

<details>
  <summary>index.html</summary>
  
  ```js
    <script src="/client/index.tsx" type="module"></script>
  ```
  Public folders appear to be a thing of the past. Vite also defaults/fiends the index.html to be in the root folder. 

</details>