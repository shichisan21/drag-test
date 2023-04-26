import { FC, ReactElement } from "react";
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
        description: `A delicious ${fruit} that is great for snacking.`,
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
  if (!fruits) {
    return <></>;
  }

  return <ListPage fruits={fruits as string[]} />;
};

export default ListPageWrapper;
