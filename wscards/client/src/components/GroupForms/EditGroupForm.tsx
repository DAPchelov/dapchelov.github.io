import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App'
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import UserSearchForm from './UsersFields/UserSearchForm';
import UserListForm from './UsersFields/UserListForm';

const EditGroupForm: React.FC = () => {
  const store = useContext(Context);

  const pushCallback = () => {
    if (store.newGroup.label.length === 0) {
      return (alert('Введите название группы'));
    }
    if (store.newGroup.getGroupUsers().find((user) => user.userId === store.newGroup.ownerId)) {
      return store.newGroup.editGroup(store.authController.userId);
    } else {
      return (alert('Назначьте администратора'));
    }
  };

  return (
    <Paper elevation={2} sx={{
    }}>
      <Grid container spacing={0}>
      <UserListForm deleteButtonColor="error"/>
        <UserSearchForm />
        <Grid item xs={12} md={12}>
          <Button variant={'contained'} sx={{ fontSize: 12, width: '100%' }} size='small' onClick={() => pushCallback()}>Сохранить</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default observer(EditGroupForm);
