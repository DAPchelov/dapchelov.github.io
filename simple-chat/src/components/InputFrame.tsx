import "../styles/InputFrame.css";

import Paper from "@mui/material/Paper";
import { Box, Button, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { stringify } from "querystring";

const InputFrame = () => {
  const [currentMessageName, setCurrentMessageName] = useState<string>(
    "noName"
  );
  const [currentMessageText, setCurrentMessageText] = useState<string>(
    "noMessage"
  );

  const sendMessage = (name: string, text: string) => {
    console.log(getMessageID(name));
    console.log(name, " ", text);
  };

  const getMessageID = (name: string) => {
    let now = new Date();
    let messageID: string =
      name +
      now.getFullYear() +
      now.getMonth() +
      now.getDate() +
      now.getHours() +
      now.getMinutes() +
      now.getSeconds() +
      now.getMilliseconds();
    return messageID;
  };

  return (
    <Paper className="inputFrame">
      <div className="InputNameField">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Name"
              variant="standard"
              size="small"
              onChange={event => setCurrentMessageName(event.target.value)}
            />
          </Box>
        </Box>
      </div>
      <div className="InputMessageField">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Message"
          variant="outlined"
          size="small"
          onChange={event => setCurrentMessageText(event.target.value)}
        />
      </div>
      <div className="InputSendButton">
        <Button
          variant="contained"
          size="large"
          onClick={() => sendMessage(currentMessageName, currentMessageText)}
        >
          Send
        </Button>
      </div>
    </Paper>
  );
};

export { InputFrame };
