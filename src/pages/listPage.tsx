import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
    <div style={{ height: 900, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

const ListPageWrapper: FC = (): ReactElement => {
  const router = useRouter();
  const { fruits } = router.query;
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  if (!fruits) {
    return <></>;
  }

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value='option1'>セレクト1</option>
        <option value='option2'>セレクト2</option>
        <option value='option3'>セレクト3</option>
      </select>
      <ListPage fruits={fruits as string[]} />
    </div>
  );
};

export default ListPageWrapper;
