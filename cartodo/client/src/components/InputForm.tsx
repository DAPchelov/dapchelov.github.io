import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import TodoList from './TodoList/TodoList';
import { Context } from '../index'
import { Box, Button, ListItem } from '@mui/material';

const InputForm: React.FC = () => {
  const store = useContext(Context);

  const [newTodoMessage, setNewTodoMessage] = useState('');

  const onPush = (keyKode: string) => {
    if (keyKode === 'Enter') {
      store.newCard.postCard();
    }
  };

  const addTodo = (keyKode: string) => {
    if (keyKode === 'Enter' && newTodoMessage.length > 0) {
      store.newCard.addTodo(false, newTodoMessage);
      setNewTodoMessage('');
    }
  };

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
            label='New card title (press Enter to add a Card)'
            variant='filled'
            fullWidth
            value={store.newCard.message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.newCard.setMessage(event.target.value)}
            onKeyUp={event => {
              onPush(event.key);
            }}
          />
        </ListItem>
        <TodoList todos={store.newCard.todos} />
        <TextField
          id='standard-basic'
          label='New todo content'
          variant='standard'
          fullWidth
          sx={{
            marginTop: 2,
          }}
          value={newTodoMessage}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewTodoMessage(event.target.value)}
          onKeyUp={event => addTodo(event.key)}
        />
        
      </Paper>
      <Button variant={'contained'} sx={{ fontSize: 12, width: '100%'}} size='small' onClick={() => store.newCard.postCard()}>Add NEW card</Button>
    </Box>
  );
};

export default observer(InputForm);
