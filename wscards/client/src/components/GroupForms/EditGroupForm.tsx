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
      return (alert('Group label is required'));
    }
    if (store.newGroup.getGroupUsers().find((user) => user.userId === store.newGroup.ownerId)) {
      return store.newGroup.editGroup();
    } else {
      return (alert('Group administrator is required'));
    }
  };

  return (
    <Paper elevation={2} sx={{
    }}>
      <Grid container spacing={0}>
        <UserListForm />
        <UserSearchForm />
        <Grid item xs={12} md={12}>
          <Button variant={'contained'} sx={{ fontSize: 12, width: '100%' }} size='small' onClick={() => pushCallback()}>Edit Group</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default observer(EditGroupForm);
