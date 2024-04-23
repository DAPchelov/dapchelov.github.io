import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from './App'
import { Box, Button, ListItem } from '@mui/material';
import TodoFields from './CardsList/TodoFields/TodoFields';
import { useNavigate } from 'react-router-dom';

const InputForm: React.FC = () => {
  const store = useContext(Context);

  // bind the context to the method, for set it on callback
  const removeTodo = store.newCard.removeTodo.bind(store.newCard);
  const checkTodo = store.newCard.checkTodo.bind(store.newCard);
  const setTodoMessage = store.newCard.setTodoMessage.bind(store.newCard);

  const navigate = useNavigate();

  const onPush = (keyKode: string) => {
    if (keyKode === 'Enter') {
      store.newCard.editCard(store.getCurrentGroupId());
      navigate('/');
    }
  };
  const updateCardCallback = () => {
    store.newCard.editCard(store.getCurrentGroupId())
    navigate('/');
  }

  return (
    <Box component='form' noValidate autoComplete='off'>
      <Paper elevation={2} sx={{
        padding: 2,
        marginBottom: 1,
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <ListItem disablePadding aria-multiline >
          <TextField
            id='filled-basic'
            label='Card title'
            variant='filled'
            fullWidth
            value={store.newCard.message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.newCard.setMessage(event.target.value)}
            onKeyUp={event => {
              onPush(event.key);
            }}
          />
        </ListItem>
        <TodoFields todos={store.newCard.todos} removeTodo={removeTodo} checkTodo={checkTodo} setTodoMessage={setTodoMessage} />
      </Paper>
      <Button variant={'contained'} sx={{ fontSize: 12, width: '100%' }} size='small' onClick={() => updateCardCallback()}>Update this card</Button>
    </Box>
  );
};

export default observer(InputForm);
