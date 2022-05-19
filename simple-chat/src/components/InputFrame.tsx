import "../styles/InputFrame.css";

import Paper from "@mui/material/Paper";
import { Box, Button, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";

const InputFrame = () => {
  const [currentMessageName, setCurrentMessageName] = useState<string>(
    "noName"
  );
  const [currentMessageText, setCurrentMessageText] = useState<string>(
    "noMessage"
  );

  const sendMessage = (user: string, content: string) => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: getRequestMutationBody(user, content)
    });
  };

  const getRequestMutationBody = (user: string, content: string) => {
    let request: string = `mutation{
            postMessage(
                        user:\"${user}\",
                        content:\"${content}\")
                        `;
    return request;
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
