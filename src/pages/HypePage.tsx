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
          {`${serviceArea.id} ${serviceArea.countryCode} ${serviceArea.name} `}
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
