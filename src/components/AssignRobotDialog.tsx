import { gql, useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select/Select";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import { useState } from "react";

const DefaultSelectValue = "not-assigned";

export default function AssignRobotDialog({ botId }: { botId: string }) {
  const [open, setOpen] = useState(false);

  const [selectedServiceAreaId, setSelectedServiceAreaId] =
    useState<string>(DefaultSelectValue);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [assignBotToServiceArea, { loading }] = useMutation(
    AssignBotToServiceAreaMutation,
    {
      variables: {
        botId,
        serviceAreaId: selectedServiceAreaId,
      },
    }
  );

  const handleAssignConfirmed = async () => {
    await assignBotToServiceArea();
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Assign robot to service area
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle>Assign Robot {botId} To Service Area</DialogTitle>
        <DialogContent sx={{ gap: 2 }}>
          <DialogContentText>
            Select a service area from below to assign the robot {botId} to.
          </DialogContentText>
          <Box>
            <Select
              disabled={loading}
              value={selectedServiceAreaId}
              onChange={(event) => setSelectedServiceAreaId(event.target.value)}
              autoWidth
            >
              <MenuItem value={DefaultSelectValue} disabled>
                <em>Select a service area</em>
              </MenuItem>
              <MenuItem value={"1"}>Helsinki</MenuItem>
              <MenuItem value={"2"}>London</MenuItem>
              <MenuItem value={"3"}>Melbourne</MenuItem>
              <MenuItem value={"4"}>Tallinn</MenuItem>
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleAssignConfirmed}
            disabled={loading || selectedServiceAreaId === DefaultSelectValue}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const AssignBotToServiceAreaMutation = gql`
  mutation AssignBotToServiceArea($botId: ID!, $serviceAreaId: ID!) {
    assignBotToServiceArea(botId: $botId, serviceAreaId: $serviceAreaId) {
      id
      serviceAreaId
    }
  }
`;
