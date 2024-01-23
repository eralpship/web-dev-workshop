import {
  gql,
  useSuspenseQuery as useApolloSuspenseQuery,
} from "@apollo/client";

import { ServiceArea } from "../generated/types/server";
import { CommonDataTable } from "./CommonDataTable";

export default function ServiceAreaList() {
  const {
    data: { serviceAreas },
  } = useApolloSuspenseQuery<{ serviceAreas: ServiceArea[] }>(
    AllServiceAreasQuery
  );

  return (
    <CommonDataTable
      onRowClicked={(a) => console.log(a.name)}
      rows={serviceAreas}
      columnHeaders={["Name", "ID", "Country"]}
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
