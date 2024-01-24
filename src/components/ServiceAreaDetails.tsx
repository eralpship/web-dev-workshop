import { gql, useSuspenseQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { ServiceArea } from "../generated/types/server";
import TitleValueRow from "./TitleValueRow";

export default function ServiceAreaDetails({ id }: { id?: string }) {
  if (!id) {
    throw new Error("Unknown service area ID");
  }

  const {
    data: { serviceArea },
  } = useSuspenseQuery<{ serviceArea: ServiceArea }>(ServiceAreaDetailsQuery, {
    variables: { id },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <TitleValueRow title="ID" value={serviceArea.id} />
      <TitleValueRow title="Name" value={serviceArea.name} />
      <TitleValueRow title="Country Code" value={serviceArea.countryCode} />
    </Box>
  );
}

const ServiceAreaDetailsQuery = gql`
  query ServiceAreaDetailsQuery($id: ID!) {
    serviceArea(id: $id) {
      id
      name
      countryCode
    }
  }
`;
