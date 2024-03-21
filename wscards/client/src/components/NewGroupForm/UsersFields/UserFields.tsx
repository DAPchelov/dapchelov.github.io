import Stack from '@mui/material/Stack';
import React from 'react';
import { observer } from 'mobx-react-lite';

import UserField from './UserField';
import { IUser } from '../../../models/IUser';
import { List } from '@mui/material';


type IUserListProps = {
    users: IUser[],
    switchUser(id: string | undefined): void,
}

const UserFields: React.FC<IUserListProps> = (props: IUserListProps) => {
    return (
        <List sx={{ width: '100%' }} >
            {props.users.map(user => {
                return (
                    <UserField key={user._id} user={user} switchUser={props.switchUser} />
                )
            })}
        </List>
    );
}

export default observer(UserFields);
