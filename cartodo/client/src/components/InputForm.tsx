import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import TodoList from "./TodoList/TodoList";
import { Context } from '../index'


const InputForm: React.FC = () => {
  const store = useContext(Context);

  let newCardMessage: string = '';
  let newTodoMessage: string = '';

  // const onPush = (keyKode: string) => {
  //   if (keyKode === "Enter" && newCardMessage.length > 0) {
  //     store.postCard(newCardMessage);
  //     store.pullCards();
  //   }
  // };

  const addTodo = (keyKode: string) => {
    if (keyKode === "Enter" && newTodoMessage.length > 0) {
      store.newCard.addTodo(false, newTodoMessage);
    }
  };

  return (
    <div>
      <Paper elevation={1}>
        <TextField
          id="filled-basic"
          label="Card title (press Enter to add Card)"
          variant="filled"
          sx={{ width: "100%" }}
          onChange={event => { newCardMessage = event.target.value }}
          // onKeyUp={event => onPush(event.key)}
        />
      </Paper>
      <TodoList todos={store.newCard.todos}/>
      <Paper elevation={0}>
        <TextField
          id="standard-basic"
          label="Todo content"
          variant="standard"
          sx={{ width: "100%" }}
          onChange={event => { newTodoMessage = event.target.value }}
          onKeyUp={event => addTodo(event.key)}
        />
      </Paper>
    </div>
  );
};

export default observer(InputForm);
