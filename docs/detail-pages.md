# Detail pages & route parameters

## Adding a service area detail page

Change `onClick` callback handler from `CommonDataTable` of `ServiceAreaList` so that it goes to path `/hype/service-area/1` if the clicked service area id is 1.

**src/components/ServiceAreaList.tsx**

```diff
 import { ServiceArea } from "../generated/types/server";
 import { CommonDataTable } from "./CommonDataTable";
+import { useNavigate } from "react-router-dom";
 
 const TableColumnHeaders = ["Name", "ID", "Country"];
 
     ...
     AllServiceAreasQuery
   );
 
+  const navigate = useNavigate();
+
   return (
     <CommonDataTable
-      onRowClicked={(a) => console.log(a.name)}
+      onRowClicked={(area) => navigate(`/hype/service-area/${area.id}`)}
       rows={serviceAreas}
       columnHeaders={TableColumnHeaders}
       cellsForRow={(serviceArea) => ({
```

We need to add a route and a page component for handling this new `/hype/service-area/:id` path.

Let's change `HypePage` similarly to `PageLayout` as a nested route structure. So that we have the same layout for every page under `/hype` path.

And we will create a new page `ServiceAreasPage` to be the index page of `/hype`, moving the table components from `HypePage` into `ServiceAreas` page.

`:id` portion in `/hype/service-areas/:id` means that it is a path parameter. We will be able to get this value in `ServiceAreaDetail` page component later.

**src/App.tsx**

```diff
 ...
 import NotFoundPage from "./pages/NotFoundPage";
 import PageLayout from "./components/PageLayout";
 import HypePage from "./pages/HypePage";
+import ServiceAreasPage from "./pages/ServiceAreasPage";
+import ServiceAreaDetailPage from "./pages/ServiceAreaDetailPage";
 
 const queryClient = new QueryClient();
 
           ...
           <Route path="/" element={<PageLayout />}>
             <Route index element={<HomePage />} />
             <Route path="weather" element={<WeatherPage />} />
-            <Route path="hype" element={<HypePage />} />
+            <Route path="hype/" element={<HypePage />}>
+              <Route index element={<ServiceAreasPage />} />
+              <Route
+                path="service-area/:id"
+                element={<ServiceAreaDetailPage />}
+              />
+            </Route>
             <Route path="*" element={<NotFoundPage />} />
           </Route>
         </Routes>

```

And create `HypePage` page component.

We replace table components with `<Outlet />` so that children of `/hype` path can inject their own elements into it.

We can also turn `HypePage` title into a link so clicking it would go to `/hype`. Similar to what we did with app header title, clicking it takes user to `/`.

**src/pages/HypePage.tsx**

```diff
 ...
-import Alert from "@mui/material/Alert/Alert";
 import Typography from "@mui/material/Typography";
-import { Suspense } from "react";
-import { ErrorBoundary } from "react-error-boundary";
-import ServiceAreaList from "../components/ServiceAreaList";
+import { Link, Outlet } from "react-router-dom";
 
 export default function HypePage() {
   return (
     <>
-      <Typography variant="h4" component="h2">
+      <Typography
+        component={Link}
+        to="/hype"
+        variant="h4"
+        sx={{
+          textDecoration: "none",
+          color: "inherit",
+          flexGrow: 1,
+        }}
+      >
         Hypervisor Panel
       </Typography>
-      <Typography variant="h5" component="h3">
-        Service Areas
-      </Typography>
-      <ErrorBoundary
-        fallbackRender={({ error }) => (
-          <Alert severity="error">{error.message}</Alert>
-        )}
-      >
-        <Suspense fallback={<ServiceAreaList.Skeleton />}>
-          <ServiceAreaList />
-        </Suspense>
-      </ErrorBoundary>
+      <Outlet />
     </>
   );
 }
```

Then change create `ServiceAreasPage` page component.

Nothing much special going here we pretty much only moved code from `HypePage` to here.

**src/pages/ServiceAreasPage.tsx**

```tsx
import Alert from "@mui/material/Alert/Alert";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ServiceAreaList from "../components/ServiceAreaList";

export default function ServiceAreasPage() {
  return (
    <>
      <Typography variant="h5" component="h3">
        Service Areas
      </Typography>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <Alert severity="error">{error.message}</Alert>
        )}
      >
        <Suspense fallback={<ServiceAreaList.Skeleton />}>
          <ServiceAreaList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
```

Finally create the `ServiceAreaDetailPage` page component. So that we handle the path `/hype/service-areas/:id`.

**src/pages/ServiceAreaDetailsPage.tsx**

```tsx
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

export default function ServiceAreaDetailPage() {
  const { id: serviceAreaId } = useParams();

  return (
    <>
      <Typography variant="h5" component="h3">
        Service Area: {serviceAreaId}
      </Typography>
    </>
  );
}
```

We get the value of `:id` in `/hype/service-areas/:id` path using `const { id: serviceAreaId } = useParams();` hook from React Router.

Then we show the id in the layout next to the title.

Now you can go to `localhost:8000/hype` to test our changes.

![service area detail](assets/service-area-detail.gif)