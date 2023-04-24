import { FC, ReactElement } from "react";
import { useRouter } from "next/router";

interface ListPageProps {
  fruits: string[];
}

const ListPage: FC<ListPageProps> = ({ fruits }): ReactElement => {
  return (
    <div>
      <h1>test List</h1>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

const ListPageWrapper: FC = (): ReactElement => {
  const router = useRouter();
  const { fruits } = router.query;
  return <ListPage fruits={fruits as string[]} />;
};

export default ListPageWrapper;
