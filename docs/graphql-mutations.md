# GraphQL Mutations

We will look into how we can modify the data on the server by running GraphQL mutations. This is kind of doing POST requests to ask the server to change data in REST API terms.

First we will add a Robots page similar to Service Areas page. Display the list of Robots. Then assign them to Service Areas.

Also we will add a menu inside `Hype` route layout. So that we can switch between Service Areas and Robots pages.

Let's start by adding the Robots route.

**src/App.tsx**

```diff
 import "@fontsource/roboto/500.css";
 import "@fontsource/roboto/700.css";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
-import { Route, Routes, BrowserRouter } from "react-router-dom";
-import HomePage from "./pages/HomePage";
-import WeatherPage from "./pages/WeatherPage";
-import NotFoundPage from "./pages/NotFoundPage";
+import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
 import PageLayout from "./components/PageLayout";
+import HomePage from "./pages/HomePage";
 import HypePage from "./pages/HypePage";
-import ServiceAreasPage from "./pages/ServiceAreasPage";
+import NotFoundPage from "./pages/NotFoundPage";
 import ServiceAreaDetailPage from "./pages/ServiceAreaDetailPage";
+import ServiceAreasPage from "./pages/ServiceAreasPage";
+import WeatherPage from "./pages/WeatherPage";
+import RobotsPage from "./pages/RobotsPage";
 
 const queryClient = new QueryClient();
 
             ...
             <Route index element={<HomePage />} />
             <Route path="weather" element={<WeatherPage />} />
             <Route path="hype/" element={<HypePage />}>
-              <Route index element={<ServiceAreasPage />} />
+              <Route index element={<Navigate to="service-areas" />} />
+              <Route
+                index
+                path="service-areas"
+                element={<ServiceAreasPage />}
+              />
               <Route
                 path="service-area/:id"
                 element={<ServiceAreaDetailPage />}
               />
+              <Route path="robots" element={<RobotsPage />} />
             </Route>
             <Route path="*" element={<NotFoundPage />} />
           </Route>
```

We changed `ServiceAreasPage` to be a regular nested route under `/hype` route.

We crated a new `service-areas` route and assigned `ServiceAreasPage` as it's element. This will be handled as `/hype/service-areas`.

Since now after the changes there's no route to handle just `/hype`, it will end up in `*` route and `NotFoundPage` will be shown.

To fix that we can create a nested `index` route under `/hype`, then route it to `<Navigate to="service-areas">`. When user goes to `/hype` path they will be redirected to `/hype/service-areas`.

Then let's update the `HypePage` so that it has "Service Areas" and "Robots" buttons. Similar to how Header Menu works.

**src/pages/HypePage.tsx**

```diff
+import Box from "@mui/material/Box";
+import Button from "@mui/material/Button";
 import Typography from "@mui/material/Typography";
-import { Link, Outlet } from "react-router-dom";
+import { Link, Outlet, matchRoutes, useLocation } from "react-router-dom";
+
+const menuItems: { title: string; path: string }[] = [
+  { title: "Service Areas", path: "/hype/service-areas" },
+  { title: "Robots", path: "/hype/robots" },
+];
 
 export default function HypePage() {
+  const location = useLocation();
+  const matchingRoutes = matchRoutes(menuItems, location);
+  const matchingRoutePath = matchingRoutes?.[0]?.route?.path;
+
   return (
     <>
       <Typography
       ...
       >
         Hypervisor Panel
       </Typography>
+
+      <Box>
+        {menuItems.map((item) => (
+          <Button
+            component={Link}
+            to={item.path}
+            key={item.path}
+            disabled={item.path === matchingRoutePath}
+            sx={{ color: "inherit" }}
+          >
+            {item.title}
+          </Button>
+        ))}
+      </Box>
+
       <Outlet />
     </>
   );
```

then we can create the `RobotList` component. Our implementation will be very similar to `ServiceAreaList`.

**src/components/RobotList.tsx**

```tsx
import {
  gql,
  useSuspenseQuery as useApolloSuspenseQuery,
} from "@apollo/client";

import { useNavigate } from "react-router-dom";
import { Bot } from "../generated/types/server";
import { CommonDataTable } from "./CommonDataTable";

import NotOperationalIcon from "@mui/icons-material/BuildCircleOutlined";
import OperationalIcon from "@mui/icons-material/CheckOutlined";

const TableColumnHeaders = ["Name", "ID", "Service Area", "Operational"];

export default function RobotList() {
  const {
    data: { bots },
  } = useApolloSuspenseQuery<{ bots: Bot[] }>(AllRobotsQuery);

  const navigate = useNavigate();

  return (
    <CommonDataTable
      onRowClicked={(bot) => navigate(`/hype/robot/${bot.id}`)}
      rows={bots}
      columnHeaders={TableColumnHeaders}
      cellsForRow={(bot) => ({
        key: bot.id,
        cells: [
          bot.name,
          bot.id,
          bot.serviceAreaId ?? "Not Assigned",
          bot.operational ? <OperationalIcon /> : <NotOperationalIcon />,
        ],
      })}
    />
  );
}

const AllRobotsQuery = gql`
  query AllRobotsAreasQuery {
    bots {
      id
      name
      serviceAreaId
      operational
    }
  }
`;
```

Mostly the same implementation  with `RobotList` with differences;
- We fetch a different graphql query `bots {...}`.
- We switch between `OperationalIcon` and `NotOperationalIcon` depending on `operational` value of the bot.
- When bot row is clicked we send the user to `hype/bots/:id` which is not implemented yet.
- If `serviceArea` value of a bot is not defined we show "Not Assigned" instead.

We will make an UI that we can assign robots to service areas later.

Final step to put all of this together is to implement this new `RobotList` component in a `RobotsPage` component. Similar to how `ServiceAreaList` and `ServiceAreasPage`.

Let's crate the `RobotsPage`.

**src/pages/RobotsPage.tsx**

```tsx
import Alert from "@mui/material/Alert/Alert";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import RobotList from "../components/RobotList";

export default function ServiceAreasPage() {
  return (
    <>
      <Typography variant="h5" component="h3">
        Robots
      </Typography>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <Alert severity="error">{error.message}</Alert>
        )}
      >
        <Suspense fallback={<div>loading...</div>}>
          <RobotList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
```

Implementation is very similar to `ServiceAreasPage`. We only didn't implement the skeleton for the loading state.

Now when you go to `localhost:8000/hype` you should be redirected to `/hype/service-areas`. Clicking "Robots" and "Service Areas" buttons should change the pages. Clicking the "Hypervisor Panel" should take you back to `/hype`.

![robots page init](assets/robots-page-init.gif)

You might have noticed that the robots we are listing don't have a service area assigned. We can make a page for assigning Robots to Service Areas.

We will create a `RobotDetailPage` where we can see the robot details, and modify which service area it is assigned to.

Let's add a new route `/robot/:id`.

**src/App.tsx**

```diff
 ...
 import HomePage from "./pages/HomePage";
 import HypePage from "./pages/HypePage";
 import NotFoundPage from "./pages/NotFoundPage";
+import RobotDetailPage from "./pages/RobotDetailPage";
 import ServiceAreaDetailPage from "./pages/ServiceAreaDetailPage";
 import ServiceAreasPage from "./pages/ServiceAreasPage";
 import WeatherPage from "./pages/WeatherPage";
 
 const queryClient = new QueryClient();
 
                 ...
                 element={<ServiceAreaDetailPage />}
               />
               <Route path="robots" element={<RobotsPage />} />
+              <Route path="robot/:id" element={<RobotDetailPage />} />
             </Route>
             <Route path="*" element={<NotFoundPage />} />
           </Route>

```

Create a `RobotDetails` page similar to `ServiceAreaDetails`.

**src/components/RobotDetails.tsx**

```tsx
import { gql, useSuspenseQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { Bot } from "../generated/types/server";
import TitleValueRow from "./TitleValueRow";

export default function RobotDetails({ id }: { id?: string }) {
  if (!id) {
    throw new Error("Unknown robot ID");
  }

  const {
    data: { bot: robot },
  } = useSuspenseQuery<{ bot: Bot }>(ServiceAreaDetailsQuery, {
    variables: { id },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <TitleValueRow title="ID" value={robot.id} />
      <TitleValueRow title="Name" value={robot.name} />
      <TitleValueRow
        title="Service Area"
        value={robot.serviceAreaId ?? "Not Assigned"}
      />
      <TitleValueRow
        title="Status"
        value={robot.operational ? "Operational" : "Not Operational"}
      />
    </Box>
  );
}

const ServiceAreaDetailsQuery = gql`
  query RobotDetailsQuery($id: ID!) {
    bot(id: $id) {
      id
      name
      serviceAreaId
      operational
    }
  }
`;
```

Then to put all of these together create `RobotDetailPage` page component.

**src/pages/RobotDetailPage.tsx**

```tsx
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Alert from "@mui/material/Alert";
import RobotDetails from "../components/RobotDetails";

export default function RobotDetailPage() {
  const { id: robotId } = useParams();

  return (
    <>
      <Typography variant="h5" component="h3">
        Robot: {robotId}
      </Typography>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <Alert severity="error">{error.message}</Alert>
        )}
      >
        <Suspense fallback={<>loading...</>}>
          <RobotDetails id={robotId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
```

Now when you go to `localhost:8000/hype/robots` you should be able to click on the rows. Clicking a row should take you to the details of that robot.

![robot details page](assets/robot-details-page-1.png)
