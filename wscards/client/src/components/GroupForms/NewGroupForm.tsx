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

  const pushCallback = () => {
    if (store.newGroup.label.length === 0) {
      return (alert('Group label is required'));
    }
    if (store.newGroup.getGroupUsers().find((user) => user.userId === store.newGroup.ownerId)) {
      return store.newGroup.createGroup();
    } else {
      return (alert('Group administrator is required'));
    }
  };
  useEffect(() => {
    store.newGroup.setOwnerId(store.getUser()._id);
},[])

  return (
    <Paper elevation={2} sx={{
    }}>
      <Grid container spacing={0} sx={{
      }}>
        <UserListForm />
        <UserSearchForm />
        <Grid item xs={12} md={12}>
          <Button variant={'contained'} sx={{ fontSize: 12, width: '100%' }} size='small' onClick={() => pushCallback()}>Create Group</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default observer(NewGroupForm);
