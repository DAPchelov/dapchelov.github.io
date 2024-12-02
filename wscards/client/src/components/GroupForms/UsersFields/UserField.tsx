import ListItem from '@mui/material/ListItem';
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, ListItemAvatar, ListItemText } from '@mui/material';
import { assignColor } from '../../UserControlPanel/UserBadge'
import { IOtherUser } from '../../../models/IOtherUser';
import { Context } from '../../App'

interface IUserProps {
    user: IOtherUser;
    ownerId: string | undefined;
    switchUser(id: IOtherUser['userId']): void | undefined,
}

const UserField: React.FC<IUserProps> = (props: IUserProps) => {
    const store = useContext(Context);

    const adminSticker = (userId: string, ownerId: string | undefined) => {
        if (ownerId !== undefined) {
            if (userId === ownerId) {
                return (
                    <Button variant='contained' sx={{ fontSize: 10, width: '10%', height: 37 }} size='small' color="primary" onClick={() => store.newGroup.setOwnerId(userId)}>Admin</Button>
                )
            }
            if (userId !== ownerId) {
                return (
                    <Button variant='outlined' sx={{ fontSize: 10, width: '10%', height: 37 }} size='small' color="primary" onClick={() => store.newGroup.setOwnerId(userId)}>User</Button>
                )
            }
        }
    }

    return (
        <ListItem sx={{
            paddingLeft: 1,
            paddingRight: 1,
        }}>
            <ListItemAvatar onClick={() => { props.switchUser(props.user.userId); }}>
                <Avatar sx={{ bgcolor: assignColor(props.user.userId)[600], cursor: 'pointer' }}>{props.user.email[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.user.email} secondary='Команда Ракета' />
            {adminSticker(props.user.userId, props.ownerId)}
        </ListItem>
    );
}

export default observer(UserField);