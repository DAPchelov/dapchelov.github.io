import "../styles/BodyFrame.css";

import Paper from "@mui/material/Paper";
import { ChatList } from "./ChatList";
import { InputFrame } from "./InputFrame";

const BodyFrame = () => {
  return (
    <div className="bodyFrame">
      <Paper>Menu</Paper>
      <Paper className="body-Frame-ChatList">
        <ChatList />
      </Paper>
      <InputFrame />
    </div>
  );
};

export { BodyFrame };
