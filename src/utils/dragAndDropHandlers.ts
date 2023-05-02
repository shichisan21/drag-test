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
