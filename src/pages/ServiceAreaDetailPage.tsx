import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import ServiceAreaDetails from "../components/ServiceAreaDetails";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Alert from "@mui/material/Alert";

export default function ServiceAreaDetailPage() {
  const { id: serviceAreaId } = useParams();

  return (
    <>
      <Typography variant="h5" component="h3">
        Service Area: {serviceAreaId}
      </Typography>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <Alert severity="error">{error.message}</Alert>
        )}
      >
        <Suspense fallback={<>loading...</>}>
          <ServiceAreaDetails id={serviceAreaId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
