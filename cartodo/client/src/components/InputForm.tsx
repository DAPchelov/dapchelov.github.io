import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { Context } from '../../src/index'
import { observer } from "mobx-react-lite";

const InputForm: React.FC = () => {
  const store = useContext(Context);

  let task: string = '';

  const onPush = (keyKode: string) => {
    if (keyKode === "Enter" && task.length > 0) {
      store.postTodo(task);
      store.pullTodos();
    }
  };

  return (
    <Paper elevation={1}>
      <TextField
        id="filled-basic"
        label="What needs to be done? (press Enter to add Task)"
        variant="filled"
        sx={{ width: "100%" }}
        onChange={event => {task = event.target.value}}
        onKeyUp={event => onPush(event.key)}
      />
    </Paper>
  );
};

export default observer(InputForm);
