import ListItem from '@mui/material/ListItem';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, ListItemAvatar, ListItemText } from '@mui/material';
import { IUser } from '../../../models/IUser';
import { assignColor } from '../../UserControlPanel/UserBadge'



interface IUserProps {
    user: IUser;
    switchUser(id: IUser['_id']): void | undefined,
}

const UserField: React.FC<IUserProps> = (props: IUserProps) => {

    return (
        <ListItem 
        sx={{ cursor: 'pointer'}}
        onClick={() => {
            props.switchUser(props.user._id);
        }}>
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: assignColor(props.user._id)[600] }}>{props.user.email[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.user.email} secondary='Команда Ракета' />
        </ListItem>
    );
}

export default observer(UserField);