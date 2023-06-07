import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import { styled } from "@mui/system";

// 1. データの型定義を行う
interface DataRow {
  id: number;
  name: string;
  age: number;
  city: string;
  country: string;
  currency: string;
}

// 2. カラムの定義を行う
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "city",
    headerName: "City",
    width: 150, // padding分を加えて幅を調整
    editable: true,
    cellClassName: "separator",
  },
  {
    field: "country",
    headerName: "Country",
    width: 150,
    editable: true,
  },
  {
    field: "currency",
    headerName: "Currency",
    width: 150,
    editable: true,
  },
];

// 3. データの作成
const rows: DataRow[] = [
  {
    id: 1,
    name: "John",
    age: 25,
    city: "New York",
    country: "USA",
    currency: "USD",
  },
  {
    id: 2,
    name: "Jane",
    age: 30,
    city: "London",
    country: "UK",
    currency: "GBP",
  },
  // 他のデータも追加可能
];

// 4. テーマの作成
const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        cell: {
          "&.separator": {
            borderRight: "2px solid black",
            paddingRight: "15px",
            backgroundColor: "#fff", // 背景色を適宜変更
          },
        },
      },
    },
  },
});

const Bar = styled("div")(({ theme }) => ({
  height: "8px",
}));

const BarContainer = styled("div")(({ theme }) => ({
  display: "flex",
}));

export default function DataTable() {
  // ID, Name, Age, City の列の幅を合計して赤いバーの幅を決定
  const redBarWidth = columns
    .slice(0, 4)
    .reduce((total, column) => total + (column.width || 0), 0);

  return (
    <ThemeProvider theme={theme}>
      <BarContainer>
        <Bar style={{ backgroundColor: "#f00", width: redBarWidth }} />
        <Bar style={{ backgroundColor: "#0f0", flex: 1 }} />
      </BarContainer>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          pagination={false}
        />
      </div>
    </ThemeProvider>
  );
}
