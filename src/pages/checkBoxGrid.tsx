import { FC, ReactElement, useState } from "react";
import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Radio } from "@mui/material";

const CheckBoxGrid: FC = (): ReactElement => {
  const dataArray = [
    { id: 1, Alice: "test1", Bob: "test2", Charlie: "test3" },
    { id: 2, Alice: "test4", Bob: "test5", Charlie: "test6" },
    { id: 3, Alice: "test7", Bob: "test8", Charlie: "test9" },
  ]; // これが受け取った配列だとします
  const fields = Object.keys(dataArray[0]).filter((key) => key !== "id"); // idフィールドを除外
  const [selected, setSelected] = useState({});

  const columns: GridColDef[] = fields.map((field, index) => {
    return {
      field: field,
      headerName: `Header ${index + 1}`,
      width: 150,
      renderCell: (params) => (
        <Radio
          checked={selected[params.id] === field}
          onChange={() =>
            setSelected((prevState) => ({ ...prevState, [params.id]: field }))
          }
        />
      ),
    };
  });

  // 先頭に追加する列を作成
  const firstColumn: GridColDef = {
    field: "all",
    headerName: "All",
    width: 150,
  };

  // 先頭に追加
  columns.unshift(firstColumn);

  return (
    <Container>
      <DataGrid
        rows={dataArray}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </Container>
  );
};

export default CheckBoxGrid;
