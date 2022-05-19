import "../styles/InputFrame.css";

import Paper from "@mui/material/Paper";
import { Box, Button, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const InputFrame = () => {
    interface INewMessage {
        user: string;
        content: string;
    }

    const [state, setState] = useState<INewMessage>({
        user: "Jack",
        content: "",
    });

    const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
      postMessage (user: $user, content: $content)
  }`;

    const [postMessage] = useMutation(POST_MESSAGE);


    const onSend = () => {
        if (state.content.length > 0) {
            postMessage({
                variables: state,
            })
        }
        setState({ ...state, content: "" })
    }

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
                            onChange={(event) => setState({ ...state, user: event.target.value })}
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
                    onChange={(event) => setState({ ...state, content: event.target.value })}
                />
            </div>
            <div className="InputSendButton">
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => onSend()}
                >
                    Send
                </Button>
            </div>
        </Paper>
    );
};

export { InputFrame };
