import Alert from "@mui/material/Alert/Alert";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ServiceAreaList from "../components/ServiceAreaList";

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
