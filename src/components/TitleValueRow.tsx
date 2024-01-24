import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function TitleValueRow({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>{title}:</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
}
