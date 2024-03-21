import ListItem from '@mui/material/ListItem';
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Paper, TextField } from '@mui/material';
import { Context } from '../../App'
import { IUser } from '../../../models/IUser';
import UserFields from './UserFields';




const UserSearchForm: React.FC = () => {

    const store = useContext(Context);
    const [searchRequest, setSearchRequest] = useState('');
    const switchUser = store.newGroup.addUserToGroup.bind(store.newGroup);

    useEffect(() => {
        store.newGroup.receiveAllUsers();
    },[])

    const filteredUsers = store.newGroup.allUsers.filter(user => {
        return user.email.toLowerCase().includes(searchRequest);
    })

    return (
        <Grid item xs={4} md={4}>
            <Paper elevation={2} sx={{
                margin: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}>
                <ListItem disablePadding aria-multiline >
                    <TextField
                        id='filled-basic'
                        label='Find Users'
                        variant='filled'
                        fullWidth
                        onChange={(e) => setSearchRequest(e.target.value)}
                    />
                </ListItem>
                <UserFields users={filteredUsers} switchUser={switchUser} />
            </Paper>
        </Grid>
    );
}

export default observer(UserSearchForm);