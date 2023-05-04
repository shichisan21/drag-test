import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { Box, Grid, Typography } from "@mui/material";
import {
  handleDragEnter,
  handleDragLeave,
  handleDrop,
} from "@/utils/dragAndDropHandlers";

interface DragAndDropProps {
  fruits: string[];
}

const DragAndDrop: FC<DragAndDropProps> = ({ fruits }): ReactElement => {
  const [fileContent, setFileContent] = useState<string>("");
  const [dropTimeStamp, setDropTimeStamp] = useState<string>("");
  const [droppedBoxId, setDroppedBoxId] = useState<string>("");
  const [highlightedBoxId, setHighlightedBoxId] = useState<string>("");

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h4'>testDragAndDrop</Typography>
      </Box>
      <Box
        sx={{ backgroundColor: "#f0f0f0", p: 2 }}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
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
                id={`Box-No.${index + 1}`}
                sx={{
                  height: 100,
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    highlightedBoxId === `Box-No.${index + 1}`
                      ? "lightgray"
                      : undefined,
                }}
                onDrop={(event) =>
                  handleDrop(
                    event,
                    `Box-No.${index + 1}`,
                    setFileContent,
                    setDropTimeStamp,
                    setDroppedBoxId
                  )
                }
                onDragEnter={(event) =>
                  handleDragEnter(
                    event,
                    `Box-No.${index + 1}`,
                    setHighlightedBoxId
                  )
                }
                onDragLeave={(event) => {
                  handleDragLeave(event, setHighlightedBoxId);
                  event.stopPropagation();
                }}
              >
                <Typography variant='body1'>{fruit}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

// JSONにするならpapaparseを使う

const DragAndDropWrapper: FC = (): ReactElement => {
  const router = useRouter();
  const fruits = (router.query.fruits as string[]) ?? [];
  return <DragAndDrop fruits={fruits} />;
};

export default DragAndDropWrapper;
