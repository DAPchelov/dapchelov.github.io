import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App'
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import UserSearchForm from './UsersFields/UserSearchForm';
import UserListForm from './UsersFields/UserListForm';

const NewGroupForm: React.FC = () => {
  const store = useContext(Context);

  // const onPush = (keyKode: string) => {
  //   if (keyKode === 'Enter') {
  //     store.newCard.postCard();
  //   }
  // };

  return (
    <Paper elevation={2} sx={{
    }}>
      <Grid container spacing={0} sx={{
        // maxHeight: '300px'
      }}>
        <UserListForm />
        <UserSearchForm />
        <Grid item xs={12} md={12}>
          <Button variant={'contained'} sx={{ fontSize: 12, width: '100%' }} size='small' onClick={() => store.newGroup.createGroup()}>Create Group</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default observer(NewGroupForm);
