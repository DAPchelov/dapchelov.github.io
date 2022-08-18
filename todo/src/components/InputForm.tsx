import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { gql, useMutation} from "@apollo/client";
import { useState } from "react";


interface IPropsInputForm {
  UUID: string;
}

const InputForm: React.FC<IPropsInputForm> = (props: IPropsInputForm) => {
  interface INewTask {
    UUID: string;
    content: string;
  }

  const [task, setTask] = useState<INewTask>({
    UUID: props.UUID,
    content: "NoMessage"
  });
 
  const POST_TASK = gql`
    mutation($UUID: String!, $content: String!) {
      postTask(UUID: $UUID, content: $content)
    }
  `;

  const [postTask] = useMutation(POST_TASK);

  const onPush = (keyKode: string) => {
    if (keyKode === "Enter" && task.content.length > 0) {
      postTask({
        variables: task
      });
      setTask({ ...task, content: "" });
    }
  };

  return (
    <Paper elevation={1}>
      <TextField
        id="filled-basic"
        label="What needs to be done? (press Enter to add Task)"
        variant="filled"
        onChange={event => {task.content = event.target.value}}
        onKeyUp={event => onPush(event.key )}
        sx={{ width: "100%" }}
      />
    </Paper>
  );
};

export default InputForm;
