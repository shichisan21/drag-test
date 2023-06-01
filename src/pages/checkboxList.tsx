import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { GridRowId } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const initialRows: GridRowsProp = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: i,
    checkbox1: i % 2 === 0,
    checkbox2: i % 3 === 0,
    checkbox3: i % 5 === 0,
    name: `Dummy Name ${i}`,
    checkedStatus: "",
    status: "Active", // default status
    // Added new columns
    column1: `Column1 Value ${i}`,
    column2: `Column2 Value ${i}`,
    column3: `Column3 Value ${i}`,
    column4: `Column4 Value ${i}`,
    column5: `Column5 Value ${i}`,
  }));

// // Customize theme to hide grid lines
// const theme = createTheme({
//   components: {
//     MuiDataGrid: {
//       styleOverrides: {
//         root: {
//           borderColor: "transparent",
//           "& .MuiDataGrid-row": {
//             borderColor: "transparent",
//           },
//           "& .MuiDataGrid-cell": {
//             borderColor: "transparent",
//           },
//         },
//       },
//     },
//   },
// });

export default function CheckboxDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [selectedId, setSelectedId] = React.useState<GridRowId | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState("Active"); // new state for status

  const handleCheckboxChange = (
    id: GridRowId,
    field: string,
    checked: boolean
  ) => {
    // ... (omitted for brevity)
  };

  const handleEditClick = (id: GridRowId, name: string, status: string) => {
    setSelectedId(id);
    setName(name);
    setStatus(status); // set the current status
    setDialogOpen(true);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (selectedId !== null) {
      const newRows = [...rows];
      const rowIndex = newRows.findIndex((row) => row.id === selectedId);
      newRows[rowIndex] = {
        ...newRows[rowIndex],
        name,
        status, // update the status
      };
      setRows(newRows);
    }
  };

  const columns: GridColDef[] = [
    // ... (omitted for brevity)
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <div>
          {params.value}
          <IconButton
            onClick={() =>
              handleEditClick(
                params.id,
                params.value as string,
                params.row.status as string
              )
            }
          >
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    // ... (omitted for brevity)
    {
      field: "column1",
      headerName: "Column1",
      width: 150,
      editable: true,
    },
    {
      field: "column2",
      headerName: "Column2",
      width: 150,
      editable: true,
    },
    {
      field: "column3",
      headerName: "Column3",
      width: 150,
      editable: true,
    },
    {
      field: "column4",
      headerName: "Column4",
      width: 150,
      editable: true,
    },
    {
      field: "column5",
      headerName: "Column5",
      width: 150,
      editable: true,
    },
  ];

  return (
    // <ThemeProvider theme={theme}>
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Name and Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a new name and select a new status for the row.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            type='text'
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          <Select value={status} onChange={handleStatusChange}>
            <MenuItem value='Active'>Active</MenuItem>
            <MenuItem value='Pending'>Pending</MenuItem>
            <MenuItem value='StandBy'>StandBy</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
    // </ThemeProvider>
  );
}
