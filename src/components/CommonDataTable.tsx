import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

type CommonTableProps<T> = {
  rows: T[];
  onRowClicked?: (row: T) => void;
  columnHeaders: React.ReactNode[];
  cellsForRow: (row: T) => { key: string; cells: React.ReactNode[] };
};

export function CommonDataTable<T>({
  rows,
  onRowClicked,
  columnHeaders,
  cellsForRow,
}: CommonTableProps<T>) {
  const numberOfColumns = columnHeaders.length;
  const isIndexLastColumn = (index: number) => index === numberOfColumns - 1;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columnHeaders.map((headerCell, index) => (
              <TableCell
                key={index}
                align={isIndexLastColumn(index) ? "right" : "left"}
              >
                {headerCell}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .map((row) => cellsForRow(row))
            .map(({ key, cells }, index) => (
              <TableRow
                hover
                key={key}
                onClick={() => onRowClicked?.(rows[index])}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {cells.map((cell, index) => (
                  <TableCell
                    sx={{ cursor: "pointer" }}
                    scope="row"
                    key={index}
                    align={isIndexLastColumn(index) ? "right" : "left"}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CommonDataTable.Skeleton = function CommonDataTableSkeleton({
  columnHeaders,
}: {
  columnHeaders: React.ReactNode[];
}) {
  return (
    <CommonDataTable
      rows={[{}]}
      columnHeaders={columnHeaders}
      cellsForRow={() => ({
        key: "skeleton-row",
        cells: columnHeaders.map((_, index) => [
          <Skeleton key={index} variant="text" animation="wave" />,
        ]),
      })}
    />
  );
};
