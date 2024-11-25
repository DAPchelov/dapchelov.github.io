import ListItem from '@mui/material/ListItem';
import React, { useContext, } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Grid, Paper, TextField } from '@mui/material';
import { Context } from '../../App'
import UserFields from './UserFields';

type IUserListForm = {
  deleteGroup(): void;
  deleteButtonColor: "inherit" | "error" | "primary" | "secondary" | "info" | "success" | "warning";
}

const UserListForm: React.FC<IUserListForm> = (props: IUserListForm) => {

  const store = useContext(Context);
  const switchUser = store.newGroup.removeUserFromGroup.bind(store.newGroup);

  return (
    <Grid item xs={8} md={8}>
      <Paper elevation={2}
        sx={{
          margin: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <ListItem disablePadding aria-multiline
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <TextField sx={{
            width: '90%',
            marginRight: 1,
          }}
            id='filled-basic'
            label='New group label'
            variant='filled'
            fullWidth
            value={store.newGroup.label}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.newGroup.setLabel(event.target.value)}
          />
          <Button variant='contained' sx={{ fontSize: 10, width: '10%', height: 56, marginRight: 1 }} size='large' color={props.deleteButtonColor} onClick={() => props.deleteGroup()}>Delete group</Button>
        </ListItem>
        <UserFields users={store.newGroup.getGroupUsers()} groupId={store.newGroup.label} ownerId={store.newGroup.ownerId} switchUser={switchUser} />
      </Paper>
    </Grid>
  );
}

export default observer(UserListForm);