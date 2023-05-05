import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface ButtonState {
  label: string;
  isExtended: boolean;
}

const AddArea: FC<{
  onClick: () => void;
  label: string;
  isExtended: boolean;
}> = ({ onClick, label, isExtended }): ReactElement => {
  return (
    <Button variant='contained' onClick={onClick} sx={{ margin: 2 }}>
      {label}
      {isExtended && " (拡大中)"}
    </Button>
  );
};

const MyComponent: FC = (): ReactElement => {
  const [buttons, setButtons] = useState<ButtonState[]>([
    { label: "ボタン1", isExtended: false },
    { label: "ボタン2", isExtended: false },
    { label: "ボタン3", isExtended: false },
  ]);

  const toggleExtended = (index: number) => {
    const newButtons = [...buttons];
    newButtons[index].isExtended = !newButtons[index].isExtended;
    setButtons(newButtons);
  };

  return (
    <Box display='flex' flexDirection='column'>
      {buttons.map((button, index) => (
        <div key={index}>
          <AddArea
            onClick={() => toggleExtended(index)}
            label={button.label}
            isExtended={button.isExtended}
          />
          {button.isExtended && (
            <Box sx={{ backgroundColor: "lightblue", color: "white" }}>
              <p>Extendedエリア({button.label})</p>
            </Box>
          )}
        </div>
      ))}
    </Box>
  );
};

export default MyComponent;
