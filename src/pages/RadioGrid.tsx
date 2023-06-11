import { FC, ReactElement, useState } from "react";
import { Container, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useRouter } from "next/router";

interface DataRow {
  id: number;
  name: string;
  group: string;
  [key: string]: string | number;
}

const RadioGrid: FC = (): ReactElement => {
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string;
  }>({});
  const router = useRouter();

  let dataArray: DataRow[] = [
    { id: 1, name: "John", group: "Group A", age: 25, status: "Active" },
    { id: 2, name: "Alice", group: "Group B", age: 30, status: "Inactive" },
    { id: 3, name: "Bob", group: "Group A", age: 35, status: "Active" },
    { id: 4, name: "Eve", group: "Group B", age: 28, status: "Active" },
  ];

  const additionalColumns: GridColDef[] =
    dataArray && dataArray.length > 0
      ? Object.keys(dataArray[0])
          .filter((key) => !["group", "name"].includes(key))
          .map((key) => ({
            field: key,
            headerName: key,
            width: 200,
            renderCell: (params: GridRenderCellParams<DataRow>) => {
              return (
                <RadioGroup
                  value={selectedValues[key] || ""}
                  onChange={(event) => {
                    setSelectedValues((prevSelectedValues) => ({
                      ...prevSelectedValues,
                      [key]: event.target.value,
                    }));
                  }}
                >
                  <FormControlLabel
                    value={params.row.id.toString()}
                    control={<Radio />}
                  />
                </RadioGroup>
              );
            },
          }))
      : [];

  const columns: GridColDef[] = [
    { field: "group", headerName: "Group", width: 200 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params: GridRenderCellParams<DataRow>) => {
        return (
          <RadioGroup
            value={selectedValues["name"] || ""}
            onChange={(event) => {
              setSelectedValues((prevSelectedValues) => ({
                ...prevSelectedValues,
                name: event.target.value,
              }));
            }}
          >
            <FormControlLabel
              value={params.row.id.toString()}
              control={<Radio />}
            />
          </RadioGroup>
        );
      },
    },
    ...additionalColumns,
  ];

  const getSelectedRowGroup = (id: string) => {
    const selectedRow = dataArray.find((row) => row.id.toString() === id);
    return selectedRow ? selectedRow.group : "No selection";
  };
  return (
    <>
      <Container>
        <Typography variant='h6' gutterBottom>
          Selected Groups:
          {Object.values(selectedValues).map((value, index) => (
            <Typography key={index}>{getSelectedRowGroup(value)}</Typography>
          ))}
        </Typography>
        <DataGrid<DataRow>
          rows={dataArray}
          columns={columns}
          sx={{ height: 900 }}
        />
      </Container>
    </>
  );
};

export default RadioGrid;
