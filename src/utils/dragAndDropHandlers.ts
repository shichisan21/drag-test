import { Dispatch, SetStateAction } from "react";

export const handleDragEnter = (
  event: React.DragEvent<HTMLDivElement>,
  boxId: string,
  setHighlightedBoxId: Dispatch<SetStateAction<string>>
): void => {
  event.stopPropagation();
  setHighlightedBoxId(boxId);
};

export const handleDragLeave = (
  event: React.DragEvent<HTMLDivElement>,
  setHighlightedBoxId: Dispatch<SetStateAction<string>>
): void => {
  event.stopPropagation();
  setHighlightedBoxId("");
};

export const handleDrop = (
  event: React.DragEvent<HTMLDivElement>,
  boxId: string,
  setFileContent: Dispatch<SetStateAction<string>>,
  setDropTimeStamp: Dispatch<SetStateAction<string>>,
  setDroppedBoxId: Dispatch<SetStateAction<string>>
): void => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file.type === "text/csv") {
    const reader = new FileReader();
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result;
      if (/\<script\>.*\<\/script\>/i.test(text as string)) {
        alert("Script is not allowed");
      } else {
        setFileContent(text as string);
      }
    };
    reader.readAsText(file);
    const timestamp = new Date().getTime();
    setDropTimeStamp(
      new Date(timestamp).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
    );

    setDroppedBoxId(boxId);
  }
};
