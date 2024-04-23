import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from './App'
import TodoFields from './CardsList/TodoFields/TodoFields';

const NewCardForm: React.FC = () => {
  const store = useContext(Context);

  // bind the context to the method, for set it on callback
  const removeTodo = store.newCard.removeTodo.bind(store.newCard);
  const checkTodo = store.newCard.checkTodo.bind(store.newCard);
  const setTodoMessage = store.newCard.setTodoMessage.bind(store.newCard);

  const onPush = (keyKode: string) => {
    if (keyKode === 'Enter') {
      store.newCard.postCard(store.getCurrentGroupId());
    }
  };

  return (
    <Paper sx={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: 0,
      padding: 1,
      boxShadow: 3,
    }}>
      <TextField
        multiline
        id='filled-basic'
        label='New card title (press Enter to add a Card)'
        variant='filled'
        color='success'
        value={store.newCard.message}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.newCard.setMessage(event.target.value)}
        onKeyUp={event => {
          onPush(event.key);
        }}
      />
      <TodoFields todos={store.newCard.todos} removeTodo={removeTodo} checkTodo={checkTodo} setTodoMessage={setTodoMessage} />
    </Paper>
  );
};

export default observer(NewCardForm);
