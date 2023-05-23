import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

const ChatRoom: FC = (): ReactElement => {
  const [cursor, setCursor] = useState("auto");

  const handleClick = () => {
    setCursor("copy");
    setTimeout(() => setCursor("auto"), 10000);
  };

  return (
    <Container sx={{ width: "100%", height: "100%" }}>
      <div style={{ cursor }}>
        <h1>test sssAbout</h1>
        <Button variant='contained' style={{ cursor }} onClick={handleClick}>
          Click me
        </Button>
      </div>
    </Container>
  );
};

export default ChatRoom;
