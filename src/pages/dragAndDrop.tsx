import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/router";

interface DragAndDropProps {
  fruits: string[];
}

const DragAndDrop: FC<DragAndDropProps> = ({ fruits }): ReactElement => {
  const [isDropped, setIsDropped] = useState(false);
  const [fileContent, setFileContent] = useState<string>();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        setFileContent(text as string);
      };
      reader.readAsText(file);

      setIsDropped(true); // <- ここで状態を更新する
    }
  };

  return (
    <>
      <div>
        <h1>testDragAndDrop</h1>
      </div>
      <div onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
        <h1>test sssAbout</h1>
        {fileContent && <pre>{fileContent}</pre>}
        <ul>
          {fruits.map((fruit) => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

// JSONにするならpapaparseを使う

const DragAndDropWrapper: FC = (): ReactElement => {
  const router = useRouter();
  return <DragAndDrop fruits={router.query.fruits as string[]} />;
};

export default DragAndDropWrapper;
