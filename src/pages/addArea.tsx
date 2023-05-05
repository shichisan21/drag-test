import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const AddArea: FC<{ onClick: () => void; label: string }> = ({
  onClick,
  label,
}): ReactElement => {
  return (
    <Button variant='contained' onClick={onClick} sx={{ margin: 2 }}>
      {label}
    </Button>
  );
};

const MyComponent: FC = (): ReactElement => {
  const [showExtended, setShowExtended] = useState(false);
  const [extendedIndex, setExtendedIndex] = useState<number | null>(null);

  const toggleExtended = (index: number) => {
    setShowExtended(!showExtended);
    setExtendedIndex(index);
  };

  return (
    <Box display='flex' flexDirection='column'>
      <AddArea onClick={() => toggleExtended(1)} label='ボタン1' />
      {showExtended && extendedIndex === 1 && (
        <Box sx={{ backgroundColor: "lightblue", color: "white" }}>
          <p>Extended</p>
        </Box>
      )}
      <AddArea onClick={() => toggleExtended(2)} label='ボタン2' />
      {showExtended && extendedIndex === 2 && (
        <Box sx={{ backgroundColor: "lightblue", color: "white" }}>
          <p>Extended</p>
        </Box>
      )}
      <AddArea onClick={() => toggleExtended(3)} label='ボタン3' />
      {showExtended && extendedIndex === 3 && (
        <Box sx={{ backgroundColor: "lightblue", color: "white" }}>
          <p>Extended</p>
        </Box>
      )}
    </Box>
  );
};

export default MyComponent;
