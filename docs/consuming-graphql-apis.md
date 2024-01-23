# Consuming GraphQL APIs

I made us a graphql server that runs inside this project so we can experiment with making an UI based on a GraphQL API. To get it 

- Checkout `add-graphql-server` branch
- Exit out of `npm run dev` command in your docker shell.
- `npm install`
- `npm run dev`

You should see more logs than before like below when you run `npm run dev`.

```bash
[server] 
[server] > webdevworkshop@0.0.0 server:dev
[server] > nodemon --watch src/server --ext ts,json --exec "vite-node src/server/server.ts"
[server] 
[frontend] 
[frontend] > webdevworkshop@0.0.0 frontend:dev
[frontend] > vite
[frontend] 
[server] [nodemon] 3.0.3
[server] [nodemon] to restart at any time, enter `rs`
[server] [nodemon] watching path(s): src/server/**/*
[server] [nodemon] watching extensions: ts,json
[server] [nodemon] starting `vite-node src/server/server.ts`
[frontend] 
[frontend]   VITE v5.0.12  ready in 187 ms
[frontend] 
[frontend]   ➜  Local:   http://localhost:8000/
[frontend]   ➜  Network: http://172.19.0.2:8000/
[server] Database does not exist
[server] Creating database schema...
[server] Seeding database...
[server] Inserting bots...
[server] Inserting service areas...
[server] Seeding Complete!
[server] GraphQL Server ready at: http://localhost:4000/
```

## GraphQL language editor support

If you are on vscode you can install these extensions from GraphQL Foundation.
https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql

## About our graphql server and it's database.

I added another node script `npm run server:dev` that gets initiated when `npm run dev`. This is our new graphql server that runs on `localhost:4000`.

Implementation of the server code is out of this scope, that's why I won't go much into detail about how I put it together. But its code is in this repository at `src/server`, you can look at it in your time if you are interested.

But some here are some points about the server so you can troubleshoot if server behaves unexpectedly.

- Server uses local [SQLite](https://www.sqlite.org/index.html) as database. This is a file at the root of the repository `database.sqlite`.

- When server starts it will check if `database.sqlite` is present. Otherwise it will recreate it. If data goes stale. Delete it, then re run `npm run dev` to get it recreated.

- The tables and records in the database come from `src/server/server.seed.ts` file. You can see what's inserted into it from that file.

- Also you can browse the database tables by using any sqlite browser. If you don't have one already set up you can use [alpha.sqliteviewer.app](https://alpha.sqliteviewer.app). When you upload the `database.sqlite` file you'll see this. Click on the table names to see what's in them. You will need to re-upload when data changes.

![sqliteviewer app](assets/sqliteviewer-app.png)

## GraphQL server docs & sandbox.

We are using [Apollo](https://www.apollographql.com/docs/) as our GraphQL server. Which comes with a sandbox/browser/docs site.

Go to `http://localhost:4000` to view it.

![graphql sandbox](assets/graphql-sandbox.png)

We can write queries and mutations here which would run on our server. On the left side you write the queries. Right side you view the response. If you write multiple queries click on the query to activate one you want. Then click the play/run button.

## Implementing the query client to our web app.

`npm install @apollo/client graphql`

```diff
 import ReactDOM from "react-dom/client";
 import App from "./App.tsx";
 import { StyledEngineProvider } from "@mui/material/styles";
+import {
+  ApolloClient,
+  InMemoryCache,
+  ApolloProvider,
+  gql,
+} from "@apollo/client";
+
+const graphqlClient = new ApolloClient({
+  uri: "http://localhost:4000",
+  cache: new InMemoryCache(),
+});
+
+const queryResult = await graphqlClient.query({
+  query: gql`
+    query GetServiceAreas {
+      serviceAreas {
+        id
+        name
+      }
+    }
+  `,
+});
+
+console.log(queryResult.data);
 
 ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
```

`localhost:8000`

![gql result in console](assets/gql-query-result-in-console.png)

Note about top level await.

We ran this query and received its response. You can run the same query in `localhost:4000` as well.

```graphql
query GetServiceAreas {
  serviceAreas {
    id
    name
  }
}
```

Let's remove the hardcoded query in `main.tsx`, and see how we can query from React components.

- We will remove the `gql` import.
- The query
- And the console.log
- Wrap the `App` component with `ApolloClient` so that we can use the Apollo Client in react components.

**src/main.tsx**

```diff
 import ReactDOM from "react-dom/client";
 import App from "./App.tsx";
 import { StyledEngineProvider } from "@mui/material/styles";
-import {
-  ApolloClient,
-  InMemoryCache,
-  ApolloProvider,
-  gql,
-} from "@apollo/client";
+import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
 
 const graphqlClient = new ApolloClient({
   uri: "http://localhost:4000",
   cache: new InMemoryCache(),
 });
 
-const queryResult = await graphqlClient.query({
-  query: gql`
-    query GetServiceAreas {
-      serviceAreas {
-        id
-        name
-      }
-    }
-  `,
-});
-
-console.log(queryResult.data);
-
 ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
     <StyledEngineProvider injectFirst>
-      <App />
+      <ApolloProvider client={graphqlClient}>
+        <App />
+      </ApolloProvider>
     </StyledEngineProvider>
   </React.StrictMode>
 );
```

Next create new page file `HypePage` at `src/pages/HypePage.tsx`.

**src/pages/HypePage.tsx**

```tsx
import {
  gql,
  useSuspenseQuery as useApolloSuspenseQuery,
} from "@apollo/client";
import Alert from "@mui/material/Alert/Alert";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ServiceArea } from "../generated/types/server";
import Box from "@mui/material/Box";

export default function HypePage() {
  return (
    <>
      <Typography variant="h4" component="h2">
        Hypervisor Panel
      </Typography>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <Alert severity="error">{error.message}</Alert>
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Typography variant="h5" component="h3">
            Service Areas
          </Typography>
          <ServiceAreaList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

function ServiceAreaList() {
  const {
    data: { serviceAreas },
  } = useApolloSuspenseQuery<{ serviceAreas: ServiceArea[] }>(
    AllServiceAreasQuery
  );
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <Box>{`id country name`}</Box>
      {serviceAreas.map((serviceArea) => (
        <Box key={serviceArea.id}>
          {`${serviceArea.id} ${serviceArea.countryCode} ${serviceArea.name}`}
        </Box>
      ))}
    </Paper>
  );
}

const AllServiceAreasQuery = gql`
  query AllServiceAreasQuery {
    serviceAreas {
      id
      countryCode
      name
    }
  }
`;

```

Several things happening here;

- We imported `useSuspenseQuery as useApolloSuspenseQuery` from `"@apollo/client"`. Normally we don't need to do this. This is to avoid confusion between other React-Query's own `useSuspenseQuery`. Apollo Client comes with a very similar hook with React-Query. Since they have the same name, to avoid confusion I decided to alias `useSuspenseQuery as useApolloSuspenseQuery`. Normally if you would be careful to import from correct package, you don't need to worry about this.

- We created another component in the same file named `ServiceAreaList` and implemented the `useApolloSuspenseQuery` in it. Main reason is that `Suspense` and `ErrorBoundary` needs to be handled by the parent of the component which produces either errors or loading state.

- Apollo's `useSuspenseQuery` has the same behavior with React-Query's so that we implemented it the same way as our weather api calls from before. `ErrorBoundary` catches the thrown error and renders an `Alert` component from Material UI (MUI). While query is loading `Suspense` just shows "Loading..." test for now.

- And finally we defined the query `AllServiceAreasQuery` which is the query from before we did at `main.tsx`.

- When we use Apollo Client with typescript, we can call queries with the types we are expecting, then it will return values with correct types. See our query hook implementation;

```ts
const {
  data: { serviceAreas },
} = useApolloSuspenseQuery<{ serviceAreas: ServiceArea[] }>(
  AllServiceAreasQuery
);
```

This part here is the generic type definition `<{ serviceAreas: ServiceArea[] }>`. `ServiceArea` type comes from `import { ServiceArea } from "../generated/types/server";`. 

I generated these types from server graphql schema file `src/server/schema.graphql`. See Apollo's own documentation how this is done if you are interested, I won't go into detail about server side stuff as it is beyond our scope for this workshop.

What matters is that we use this to use the same types in our frontend code as our server does.

Then let's add `HypePage` to `App.tsx` as a route at `/hype`.

**src/App.tsx**

```diff
 import WeatherPage from "./pages/WeatherPage";
 import NotFoundPage from "./pages/NotFoundPage";
 import PageLayout from "./components/PageLayout";
+import HypePage from "./pages/HypePage";
 
 const queryClient = new QueryClient();
 
          ...
           <Route path="/" element={<PageLayout />}>
             <Route index element={<HomePage />} />
             <Route path="weather" element={<WeatherPage />} />
+            <Route path="hype" element={<HypePage />} />
             <Route path="*" element={<NotFoundPage />} />
           </Route>
         </Routes>
```

And add a link from `HomePage.tsx` to `/hype` route.

**src/pages/HomePage.tsx**

```diff
   ... 
       >
         Weather
       </Button>
+      <Button component={Link} to="/hype" variant="contained" color="primary">
+        Hypervisor Panel
+      </Button>
     </>
   );
 }
```

And then finally let's add the link to page header at `PageHeader.tsx` so we have a link to `/hype` from header as well.

As we are here in `PageHeader.tsx`. Let's also improve the logic so we keep track of which page are we at and show it as `disabled` which makes it look like grayed out.

Which means if when we are at `/weather` page `Weather` button will be disabled. When we go to another page `Weather` button gets re-enabled.

We will implement this using `useLocation` hook and `matchRoutes` utility from React-Router. By comparing the current browser url location's and find which route it matched with, if it is the same with any of the navigation buttons we are showing, we will disable it.

Since we have 3 buttons now, header title will be squished a little bit, so for now let's shorten the title text. Ideally we could swap the navigation buttons to a menu that reveals when clicked on an icon, only in narrow sizes.

Also I missed to add color style earlier, this introduced an issue which made buttons to seem disappeared in light mode. We will add this missing `inherit` color to the `Buttons`, so their color change along with the colorscheme.

**src/components/PageHeader.tsx**

```diff
 import Typography from "@mui/material/Typography";
 import Box from "@mui/material/Box";
 import Button from "@mui/material/Button";
-import { Link } from "react-router-dom";
+import { Link, matchRoutes, useLocation } from "react-router-dom";
 
 const menuItems: { title: string; path: string }[] = [
   { title: "Home", path: "/" },
   { title: "Weather", path: "/weather" },
+  { title: "Hype", path: "/hype" },
 ];
 
 export default function PageHeader() {
+  const location = useLocation();
+  const matchingRoutes = matchRoutes(menuItems, location);
+  const matchingRoutePath = matchingRoutes?.[0]?.route?.path;
+
   return (
     <AppBar position="static">
       <Toolbar>
             ...
             flexGrow: 1,
           }}
         >
-          Starship Web Dev Workshop
+          Web Dev Day
         </Typography>
         <Box>
           {menuItems.map((item) => (
-            <Button component={Link} to={item.path} key={item.title}>
+            <Button
+              component={Link}
+              to={item.path}
+              key={item.title}
+              disabled={item.path === matchingRoutePath}
+              sx={{ color: "inherit" }}
+            >
               {item.title}
             </Button>
           ))}
```

Now if you go to `localhost:8000` you should be able to go to `/hype` page, see menu buttons change according to active page, and it should look like this;

![add hype page](assets/add-hype-page.gif)

Let's see what happens if we make an bad request that graphql doesn't accept. For example change the query and add a value which ServiceArea doesn't have.

**src/pages/HypePage.tsx**

```diff
 const AllServiceAreasQuery = gql`
   query AllServiceAreasQuery {
     serviceAreas {
       id
       countryCode
       name
+      pizza
     }
   }
 `;
```

Then go to `localhost:8000/hype` and click the menu button or the button at homepage to go to `/hype` page.

You should see that the error was handled by the `ErrorBoundary`.

![hype page error](assets/hype-page-query-error.png)

ServiceAreas don't have pizza :(

If you check your browser network console and find the `400` error code `localhost:4000` request. You can see the error that is sent from our server. This has more info about why our request was rejected.

![query error network](assets/query-error-network.png)
