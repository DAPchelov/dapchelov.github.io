import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from './App'
import TodoFields from './CardsList/TodoFields/TodoFields';
import { Box, Button } from '@mui/material';
import GroupSelect from './UserControlPanel/GroupSelect';


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
    <div>
      <Paper sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 1,
        boxShadow: 3,
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          columnGap: 1,
          marginBottom: 1,
        }}>
          <TextField sx={{width: '100%'}}
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
          <GroupSelect />
        </Box>
        <TodoFields todos={store.newCard.todos} removeTodo={removeTodo} checkTodo={checkTodo} setTodoMessage={setTodoMessage} />
        <Box sx={{
          display: 'flex',
          columnGap: 1,
          padding: 0,
        }}>
          <Button variant='contained' sx={{ fontSize: 12, height: '40px', width: '20%' }} size='small' onClick={() => store.newCard.postCard(store.getCurrentGroupId())}>Отправить карточку</Button>
          <Button variant='contained' sx={{ fontSize: 12, height: '40px', width: '80%' }} size='small' color="secondary" onClick={() => store.newCard.addTodo('', false)}>Добавить задачу</Button>
        </Box>
      </Paper>
    </div>
  );
};

export default observer(NewCardForm);
