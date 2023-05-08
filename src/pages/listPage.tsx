import { FC, ReactElement, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "price", headerName: "Price", width: 90 },
  { field: "description", headerName: "Description", width: 500 },
];

interface ListPageProps {
  fruits: string[];
}

const ListPage: FC<ListPageProps> = ({ fruits }): ReactElement => {
  const rows = fruits
    ? fruits.map((fruit, index) => ({
        id: index,
        name: fruit,
        price: Math.floor(Math.random() * 1000) + 1,
        description: `おいしい${fruit}、おやつに最適です。`,
      }))
    : [];
  return (
    <div style={{ height: 600, width: "70%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

const ListPageWrapper: FC = (): ReactElement => {
  const router = useRouter();
  const { fruits } = router.query;
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const storedOption = localStorage.getItem("selectedOption");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption);
  }, [selectedOption]);

  if (!fruits) {
    return <></>;
  }

  return (
    <div>
      <Select value={selectedOption} onChange={handleSelectChange}>
        <MenuItem value='option1'>セレクト1</MenuItem>
        <MenuItem value='option2'>セレクト2</MenuItem>
        <MenuItem value='option3'>セレクト3</MenuItem>
      </Select>
      {selectedOption === "option1" && <ListPage fruits={fruits as string[]} />}
      {selectedOption === "option2" && <div>セレクト2が選択されました。</div>}
      {selectedOption === "option3" && <div>セレクト3が選択されました。</div>}
    </div>
  );
};

export default ListPageWrapper;
