import ListItem from '@mui/material/ListItem';
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Paper, TextField } from '@mui/material';
import { Context } from '../../App'
import UserFields from './UserFields';

const UserSearchForm: React.FC = () => {

    const store = useContext(Context);
    const [searchRequest, setSearchRequest] = useState('');
    const switchUser = store.newGroup.addUserToGroup.bind(store.newGroup);

    useEffect(() => {
        store.newGroup.receiveAllUsers();
    })

    const filteredUsersByPromt = store.newGroup.allUsers.filter(user => {
        return user.email.toLowerCase().includes(searchRequest);
    })

    return (
        <Grid item xs={4} md={4}>
            <Paper elevation={2} sx={{
                margin: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}>
                <ListItem disablePadding aria-multiline >
                    <TextField
                        id='filled-basic'
                        label='Поиск пользователей'
                        variant='filled'
                        fullWidth
                        onChange={(e) => setSearchRequest(e.target.value)}
                    />
                </ListItem>
                <UserFields users={filteredUsersByPromt} groupId='searchForm' switchUser={switchUser} ownerId={undefined}/>
            </Paper>
        </Grid>
    );
}

export default observer(UserSearchForm);