import React from 'react';
import { observer } from 'mobx-react-lite';

import UserField from './UserField';
import { List } from '@mui/material';
import { IOtherUser } from '../../../models/IOtherUser';


type IUserListProps = {
    users: IOtherUser[],
    groupId: string;
    ownerId: string | undefined;
    switchUser(id: string | undefined): void,
}

const UserFields: React.FC<IUserListProps> = (props: IUserListProps) => {
    return (
        <List sx={{ width: '100%' }} >
            {props.users.map(user => {
                return (
                    <UserField key={props.groupId + user.userId} user={user} switchUser={props.switchUser} ownerId={props.ownerId}/>
                )
            })}
        </List>
    );
}

export default observer(UserFields);
