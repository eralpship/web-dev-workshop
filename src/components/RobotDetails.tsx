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
