import { FC, ReactElement, useState } from "react";
import { Container } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Radio } from "@mui/material";
import { useRouter } from "next/router";

interface DataRow {
  id: number;
  name: string;
  group: string;
  [key: string]: string | number;
}

const RadioGrid: FC = (): ReactElement => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const router = useRouter();

  let dataArray: DataRow[] = [];

  if (router.isReady) {
    if (router.query.data) {
      dataArray = JSON.parse(router.query.data as string);
    }
  }
  const additionalColumns =
    dataArray && dataArray.length > 0
      ? Object.keys(dataArray[0])
          .map((key) => ({
            field: key,
            headerName: dataArray[0][key] as string,
            width: 200,
          }))
          .filter((col) => !["group", "name"].includes(col.field))
      : [];

  const columns: GridColDef[] = [
    { field: "group", headerName: "Group", width: 200 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Radio
            checked={selectedValue === params.row.id}
            onChange={() => {
              setSelectedValue(params.row.id);
            }}
          />
        );
      },
    },
    ...additionalColumns,
  ];

  return (
    <>
      <Container>
        <DataGrid rows={dataArray} columns={columns} sx={{ height: 900 }} />
      </Container>
    </>
  );
};

export default RadioGrid;
