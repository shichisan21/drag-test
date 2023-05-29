import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import { GridRowId } from "@mui/x-data-grid";

const initialRows: GridRowsProp = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: i,
    checkbox1: i % 2 === 0,
    checkbox2: i % 3 === 0,
    checkbox3: i % 5 === 0,
    name: `Dummy Name ${i}`,
    checkedStatus: "",
  }));

export default function CheckboxDataGrid() {
  const [rows, setRows] = React.useState(initialRows);

  const handleCheckboxChange = (
    id: GridRowId,
    field: string,
    checked: boolean
  ) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      const rowIndex = newRows.findIndex((row) => row.id === id);
      newRows[rowIndex] = {
        ...newRows[rowIndex],
        [field]: checked,
        checkedStatus: [
          (newRows[rowIndex].checkbox1 || (checked && field === "checkbox1")) &&
          !(!checked && field === "checkbox1")
            ? "1"
            : "",
          (newRows[rowIndex].checkbox2 || (checked && field === "checkbox2")) &&
          !(!checked && field === "checkbox2")
            ? "2"
            : "",
          (newRows[rowIndex].checkbox3 || (checked && field === "checkbox3")) &&
          !(!checked && field === "checkbox3")
            ? "3"
            : "",
        ]
          .filter(Boolean)
          .join(", "),
      };
      return newRows;
    });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "checkbox1",
      headerName: "Checkbox 1",
      width: 130,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={(event) =>
            handleCheckboxChange(params.id, "checkbox1", event.target.checked)
          }
        />
      ),
    },
    {
      field: "checkbox2",
      headerName: "Checkbox 2",
      width: 130,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={(event) =>
            handleCheckboxChange(params.id, "checkbox2", event.target.checked)
          }
        />
      ),
    },
    {
      field: "checkbox3",
      headerName: "Checkbox 3",
      width: 130,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={(event) =>
            handleCheckboxChange(params.id, "checkbox3", event.target.checked)
          }
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "checkedStatus",
      headerName: "Checked Status",
      width: 200,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
