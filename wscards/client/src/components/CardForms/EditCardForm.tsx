import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App'
import { Button, ListItem } from '@mui/material';
import TodoFields from '../CardsList/TodoFields/TodoFields';
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
    <div>
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
          label='Заголовок'
          variant='filled'
          color='success'
          value={store.newCard.message}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.newCard.setMessage(event.target.value)}
          onKeyUp={event => {
            onPush(event.key);
          }}
        />
        <TodoFields todos={store.newCard.todos} removeTodo={removeTodo} checkTodo={checkTodo} setTodoMessage={setTodoMessage} />
        <ListItem sx={{
          display: 'flex',
          columnGap: 1,
          padding: 1,
          boxShadow: 3,
        }}>
          <Button variant='contained' sx={{ fontSize: 12, height: '40px', width: '20%' }} size='small' onClick={updateCardCallback} >Обновить карточку</Button>
          <Button variant='contained' sx={{ fontSize: 12, height: '40px', width: '80%' }} size='small' color="secondary" onClick={() => store.newCard.addTodo('', false)}>Добавить задачу</Button>
        </ListItem>
      </Paper>
    </div>
  );
};

export default observer(InputForm);
