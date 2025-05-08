import Paper from '@mui/material/Paper';
import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App'
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import UserSearchForm from './UsersFields/UserSearchForm';
import UserListForm from './UsersFields/UserListForm';



const NewGroupForm: React.FC = () => {

  const store = useContext(Context);
  // const deleteGroupCallback = store.newGroup.clearForm.bind(store.newGroup)

  const pushCallback = () => {
    if (store.newGroup.label.length === 0) {
      return (alert('Введите название группы'));
    }
    if (store.newGroup.getGroupUsers().find((user) => user.userId === store.newGroup.ownerId)) {
      return store.newGroup.createGroup(store.authController.userId);
    } else {
      return (alert('Назначьте администратора группы'));
    }
  };
  useEffect(() => {
    store.newGroup.setOwnerId(store.userController.user._id);
  })

  return (
    <Paper elevation={2} sx={{
    }}>
      <Grid container spacing={0} sx={{
      }}>
        <UserListForm deleteButtonColor="primary"/>
        <UserSearchForm />
        <Grid item xs={12} md={12}>
          <Button variant={'contained'} sx={{ fontSize: 12, width: '100%' }} size='small' onClick={() => pushCallback()}>Создать группу</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default observer(NewGroupForm);
