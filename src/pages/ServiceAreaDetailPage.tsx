import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

export default function ServiceAreaDetailPage() {
  const { id: serviceAreaId } = useParams();

  return (
    <>
      <Typography variant="h5" component="h3">
        Service Area: {serviceAreaId}
      </Typography>
    </>
  );
}
