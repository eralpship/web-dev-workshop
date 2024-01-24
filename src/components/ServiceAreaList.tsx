import {
  gql,
  useSuspenseQuery as useApolloSuspenseQuery,
} from "@apollo/client";

import { ServiceArea } from "../generated/types/server";
import { CommonDataTable } from "./CommonDataTable";
import { useNavigate } from "react-router-dom";

const TableColumnHeaders = ["Name", "ID", "Country"];

export default function ServiceAreaList() {
  const {
    data: { serviceAreas },
  } = useApolloSuspenseQuery<{ serviceAreas: ServiceArea[] }>(
    AllServiceAreasQuery
  );

  const navigate = useNavigate();

  return (
    <CommonDataTable
      onRowClicked={(area) => navigate(`/hype/service-area/${area.id}`)}
      rows={serviceAreas}
      columnHeaders={TableColumnHeaders}
      cellsForRow={(serviceArea) => ({
        key: serviceArea.id,
        cells: [
          serviceArea.name,
          serviceArea.id,
          `${countryCodeToFlag(serviceArea.countryCode)} ${
            serviceArea.countryCode
          }`,
        ],
      })}
    />
  );
}

ServiceAreaList.Skeleton = () => (
  <CommonDataTable.Skeleton columnHeaders={TableColumnHeaders} />
);

function countryCodeToFlag(countryCode: string) {
  return String.fromCodePoint(
    ...[...countryCode.toUpperCase()].map(
      (char) => 0x1f1a5 + char.charCodeAt(0)
    )
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