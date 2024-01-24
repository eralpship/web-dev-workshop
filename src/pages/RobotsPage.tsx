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
