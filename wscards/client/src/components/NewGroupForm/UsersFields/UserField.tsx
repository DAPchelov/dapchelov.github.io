import ListItem from '@mui/material/ListItem';
import ReplayIcon from '@mui/icons-material/Replay';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, ListItemAvatar, ListItemText } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { IUser } from '../../../models/IUser';
import { assignColor } from '../../UserBadge'



interface IUserProps {
    user: IUser;
    switchUser(id: IUser['_id']): void | undefined,
}

const UserField: React.FC<IUserProps> = (props: IUserProps) => {

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: assignColor(props.user._id)[600] }}>{props.user.email[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.user.email} secondary='Команда Ракета' />
            <ReplayIcon fontSize='small'
                onClick={() => {
                    props.switchUser(props.user._id);
                }}
                sx={{ cursor: 'pointer', width: '30px' }}
            />
        </ListItem>
    );
}

export default observer(UserField);