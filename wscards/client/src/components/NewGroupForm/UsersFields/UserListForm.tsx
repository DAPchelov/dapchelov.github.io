import ListItem from '@mui/material/ListItem';
import React, { useContext, } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Paper, TextField } from '@mui/material';
import { Context } from '../../App'
import UserFields from './UserFields';




const UserListForm: React.FC = () => {

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
            <ListItem disablePadding aria-multiline >
              <TextField
                id='filled-basic'
                label='New group label'
                variant='filled'
                fullWidth
                value={store.newGroup.label}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.newGroup.setLabel(event.target.value)}
              />
            </ListItem>
            <UserFields users={store.newGroup.getGroupUsers()} switchUser={switchUser} />
          </Paper>
        </Grid>
    );
}

export default observer(UserListForm);