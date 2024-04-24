import React from 'react';
import User from './User'
import { observer } from 'mobx-react-lite';
import { ITodo } from '../../../models/ITodo';
import { Box } from '@mui/material';
import { IUser } from '../../../models/IUser';

type IUserListProps = {
    users: [{
        userId: string,
        isLoggedIn: boolean,
        _id: string,
    }],
    // checkTodo (id: string | undefined): void,
}

const UsersList: React.FC<IUserListProps> = (props: IUserListProps) => {

    return (
        <Box sx={{
            width: '75%',
        }}>
            {props.users.map(user => {
                return (
                    <User key={user._id} userId={user._id} isLoggedIn={user.isLoggedIn} _id={user._id} />
                )
            })}
        </Box>
    );
}

export default observer(UsersList);
