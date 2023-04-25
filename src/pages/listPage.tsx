import { FC, ReactElement } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
];

interface ListPageProps {
  fruits: string[];
}

const ListPage: FC<ListPageProps> = ({ fruits }): ReactElement => {
  const rows = fruits
    ? fruits.map((fruit, index) => ({
        id: index,
        name: fruit,
      }))
    : [];
  return (
    <div style={{ height: 400, width: "100%" }}>
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
