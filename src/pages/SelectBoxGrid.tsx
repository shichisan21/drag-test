import { FC, ReactElement, useState, useEffect } from "react";
import { Container, Select, MenuItem } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

type DataItem = {
  id: number;
  name: string;
  order: number;
};

const SelectOrderGrid: FC = (): ReactElement => {
  const initialData: DataItem[] = [
    { id: 1, name: "Alice", order: 1 },
    { id: 2, name: "Bob", order: 2 },
    { id: 3, name: "Charlie", order: 3 },
  ];
  const [data, setData] = useState(initialData);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "order",
      headerName: "Order",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Select
          value={params.value ? params.value : ""}
          onChange={(e) => {
            const newValue = e.target.value as number;
            const oldValue = params.value as number;

            setData((prevData) => {
              // Switch orders if the new value is already in use
              const dataCopy = prevData.map((item) =>
                item.order === newValue ? { ...item, order: oldValue } : item
              );
              // Update the current item's order
              return dataCopy.map((item) =>
                item.id === params.id ? { ...item, order: newValue } : item
              );
            });
          }}
        >
          {initialData.map((item, index) => (
            <MenuItem key={index} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];

  useEffect(() => {
    setData((prevData) => [...prevData].sort((a, b) => a.order - b.order));
  }, [data]);

  return (
    <Container>
      <DataGrid rows={data} columns={columns} pageSize={5} />
    </Container>
  );
};

export default SelectOrderGrid;
