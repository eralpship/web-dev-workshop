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
