import React from 'react';
import User from './User'
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import { IOtherUser } from '../../../models/IOtherUser';

type IUserListProps = {
    
    users: [IOtherUser],
}

const UsersList: React.FC<IUserListProps> = (props: IUserListProps) => {

    return (
        <Box sx={{ width: '100%', }}>
            {props.users.map(user => {
                return (
                    <User key={user.userId} userId={user.userId} email={user.login} />
                )
            })}
        </Box>
    );
}

export default observer(UsersList);
