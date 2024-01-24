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