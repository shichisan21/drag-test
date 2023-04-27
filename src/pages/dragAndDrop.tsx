import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/router";

interface DragAndDropProps {
  fruits: string[];
}

const DragAndDrop: FC<DragAndDropProps> = ({ fruits }): ReactElement => {
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [fileContent, setFileContent] = useState<string>();
  const [dropTimeStamp, setDropTimeStamp] = useState<number>();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const text = event.target?.result;
        setFileContent(text as string);
      };
      reader.readAsText(file);
      const timestamp = new Date().getTime();
      setDropTimeStamp(timestamp);

      setIsDropped(true); // <- ここで状態を更新する
    }
  };

  return (
    <>
      <div>
        <h1>testDragAndDrop</h1>
      </div>
      <div onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
        {fileContent && (
          <>
            <p>File Content: </p>
            <pre>{fileContent}</pre>
            <p>Drop TimeStamp: {dropTimeStamp}</p>
          </>
        )}
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
