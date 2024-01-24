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
