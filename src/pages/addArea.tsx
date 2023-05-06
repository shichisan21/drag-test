import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ButtonState {
  label: string;
  isExtended: boolean;
  selectedValue?: string;
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

  const handleRadioChange = (index: number, value: string) => {
    const newButtons = [...buttons];
    newButtons[index].selectedValue = value;
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
              <RadioGroup
                value={button.selectedValue}
                onChange={(event) =>
                  handleRadioChange(index, event.target.value)
                }
              >
                <FormControlLabel
                  value='option1'
                  control={<Radio />}
                  label='Option 1'
                />
                <FormControlLabel
                  value='option2'
                  control={<Radio />}
                  label='Option 2'
                />
                <FormControlLabel
                  value='option3'
                  control={<Radio />}
                  label='Option 3'
                />
              </RadioGroup>
            </Box>
          )}
        </div>
      ))}
      <Box mt={2}>
        <p>選択されたラジオボタン:</p>
        {buttons.map((button, index) => (
          <p key={index}>
            {button.label}: {button.selectedValue || "未選択"}
          </p>
        ))}
      </Box>
    </Box>
  );
};

export default MyComponent;
