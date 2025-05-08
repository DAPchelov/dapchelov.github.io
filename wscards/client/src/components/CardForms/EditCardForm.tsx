import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App'
import { Box, Button } from '@mui/material';
import TodoFields from '../CardsList/TodoFields/TodoFields';
import { useNavigate } from 'react-router-dom';

const InputForm: React.FC = () => {
  const store = useContext(Context);

  // bind the context to the method, for set it on callback
  const removeTodo = store.cardController.removeTodo.bind(store.cardController);
  const checkTodo = store.cardController.checkTodo.bind(store.cardController);
  const setTodoMessage = store.cardController.setTodoMessage.bind(store.cardController);

  const navigate = useNavigate();

  const onPush = (keyKode: string) => {
    if (keyKode === 'Enter') {
      store.cardController.editCard(store.groupController._id);
      navigate('/');
    }
  };
  const updateCardCallback = () => {
    store.cardController.editCard(store.groupController._id)
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
          value={store.cardController.message}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.cardController.setMessage(event.target.value)}
          onKeyUp={event => {
            onPush(event.key);
          }}
        />
        <TodoFields todos={store.cardController.todos} removeTodo={removeTodo} checkTodo={checkTodo} setTodoMessage={setTodoMessage} />
        <Box sx={{
          display: 'flex',
          columnGap: 1,
          padding: 0,
        }}>
          <Button variant='contained' sx={{ fontSize: 12, height: '40px', width: '20%' }} size='small' onClick={updateCardCallback} >Обновить карточку</Button>
          <Button variant='contained' sx={{ fontSize: 12, height: '40px', width: '80%' }} size='small' color="secondary" onClick={() => store.cardController.addTodo('', false)}>Добавить задачу</Button>
        </Box>
      </Paper>
    </div>
  );
};

export default observer(InputForm);
