import ListItem from '@mui/material/ListItem';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import UsersList from './UsersList/UsersList';
import { Paper } from '@mui/material';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../App'
import { Link } from 'react-router-dom';
import { IGroup } from '../../models/IGroup';

const Group: React.FC<IGroup> = (props: IGroup) => {

    const store = useContext(Context);

    const getAdminName = () => {
        return props.users.find((user) => user.userId === props.ownerId)?.email;
    }

    return (
        <Paper elevation={2} sx={{
            display: 'flex',
        }}>
            <ListItem aria-multiline sx={{
                background: 'rgba(21,101,192,0.15)',
                width: '25%',
                minWidth: '150px',
                maxWidth: '300px',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <ListItem sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}>
                    <Typography sx={{
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                        width: '100%',
                    }}>
                        {props.label}
                    </Typography>
                    <Typography sx={{
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                        width: '100%',
                    }}>
                        Admin: {getAdminName()}
                    </Typography>
                </ListItem>
                {
                    store.getUser()._id === props.ownerId &&
                    <Link to='/editgroup'>
                        <EditIcon fontSize='small' onClick={() => { store.editGroup(props._id); }} sx={{ cursor: 'pointer', width: '30px' }} />
                    </Link>
                }
            </ListItem>
            <UsersList users={props.users} />
        </Paper>
    );
}

export default observer(Group);