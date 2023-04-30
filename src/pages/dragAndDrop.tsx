import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { Box, Grid, Typography } from "@mui/material";

interface DragAndDropProps {
  fruits: string[];
}

const DragAndDrop: FC<DragAndDropProps> = ({ fruits }): ReactElement => {
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [fileContent, setFileContent] = useState<string>();
  const [dropTimeStamp, setDropTimeStamp] = useState<number>();
  const [droppedBoxId, setDroppedBoxId] = useState<string>();

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    boxId: string
  ): void => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        const text = event.target?.result;
        setFileContent(text as string);
        // if (/\<script\>.*\<\/script\>/i.test(text as string)) {
        //   alert("Script is not allowed");
        // } else {
        //   setFileContent(text as string);
        // }
      };
      reader.readAsText(file);
      const timestamp = new Date().getTime();
      setDropTimeStamp(timestamp);

      setIsDropped(true); // <- ここで状態を更新する
      setDroppedBoxId(boxId);
    }
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h4'>testDragAndDrop</Typography>
      </Box>
      <Box
        sx={{ backgroundColor: "#f0f0f0", p: 2 }}
        onDragOver={(event) => event.preventDefault()}
      >
        {fileContent && (
          <>
            <Typography variant='body1'>File Content:</Typography>
            <Typography variant='body2'>{fileContent}</Typography>
            <Typography variant='body1'>
              Drop TimeStamp: {dropTimeStamp}
            </Typography>
            <Typography variant='body1'>
              Dropped Box Id: {droppedBoxId}
            </Typography>
          </>
        )}
        <Grid container spacing={2}>
          {fruits.map((fruit, index) => (
            <Grid key={index} item xs={2} sm={2} md={2} lg={2}>
              <Box
                id={`box-${index + 1}`}
                sx={{
                  height: 100,
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onDrop={(event) => handleDrop(event, `box-${index + 1}`)}
                onDragOver={(event) => event.preventDefault()}
              >
                <Typography variant='body1'>{fruit}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <div>
        <h1>testDragAndDrop</h1>
      </div>
      <div onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
        <ul>
          {fruits.map((fruit) => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

// JSONにするならpapaparseを使う

const DragAndDropWrapper: FC = (): ReactElement => {
  const router = useRouter();
  return <DragAndDrop fruits={router.query.fruits as string[]} />;
};

export default DragAndDropWrapper;
