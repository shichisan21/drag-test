import { FC, ReactElement, useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

interface DataRow {
  id: number;
  name: string;
  nameId: number;
  group: string;
  groupId: number;
}

const RadioGrid: FC = (): ReactElement => {
  let data = {
    arr1: [
      { id: 1, name: "John", nameId: 1, group: "Group A", groupId: 1 },
      { id: 2, name: "Alice", nameId: 2, group: "Group B", groupId: 2 },
      { id: 3, name: "Bob", nameId: 3, group: "Group A", groupId: 1 },
      { id: 4, name: "Eve", nameId: 4, group: "Group C", groupId: 3 },
    ],
  };

  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const initialValues: Record<string, string> = {};
    for (const row of data.arr1) {
      initialValues[row.name] = row.id.toString();
    }
    setSelectedValues(initialValues);
  }, []);

  const columns: GridColDef[] = [
    { field: "group", headerName: "Group", width: 200 },
    ...data.arr1.map((row: DataRow) => ({
      field: row.name,
      headerName: row.name,
      width: 200,
      renderCell: (params: GridRenderCellParams<DataRow>) => {
        return (
          <RadioGroup
            value={selectedValues[row.name] || ""}
            onChange={(event) => {
              setSelectedValues((prevSelectedValues) => ({
                ...prevSelectedValues,
                [row.name]: event.target.value,
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
    })),
  ];

  return (
    <>
      <Container>
        <Typography variant='h6' gutterBottom>
          Selected Values:
          {Object.entries(selectedValues).map(([key, value], index) => (
            <Typography key={index}>
              {key}: {data.arr1.find((row) => row.id === Number(value))?.group}
            </Typography>
          ))}
        </Typography>
        <DataGrid<DataRow>
          rows={data.arr1}
          columns={columns}
          sx={{ height: 900 }}
        />
      </Container>
    </>
  );
};

export default RadioGrid;
