import ListItem from '@mui/material/ListItem';
import React, { useContext, } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Grid, Paper, TextField } from '@mui/material';
import { Context } from '../../App'
import UserFields from './UserFields';

type IUserListForm = {
  // deleteGroup(userId: string): void;
  deleteButtonColor: "inherit" | "error" | "primary" | "secondary" | "info" | "success" | "warning";
}

const UserListForm: React.FC<IUserListForm> = (props: IUserListForm) => {

  const store = useContext(Context);
  const switchUser = store.groupController.removeUserFromGroup.bind(store.groupController);

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
            label='Название группы'
            variant='filled'
            fullWidth
            value={store.groupController.label}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.groupController.setLabel(event.target.value)}
          />
          <Button variant='contained' sx={{ fontSize: 10, width: '15%', height: 56, marginRight: 1 }} size='large' color={props.deleteButtonColor} onClick={() => store.groupController.deleteGroup(store.groupController._id)}>Удалить группу</Button>
        </ListItem>
        <UserFields users={store.groupController.getGroupUsers()} groupId={store.groupController.label} ownerId={store.groupController.ownerId} switchUser={switchUser} />
      </Paper>
    </Grid>
  );
}

export default observer(UserListForm);