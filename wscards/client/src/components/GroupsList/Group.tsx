import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import UsersList from './UsersList/UsersList';
import { Paper } from '@mui/material';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '../App'
import { Link } from 'react-router-dom';
import { IGroup } from '../../models/IGroup';

const Group: React.FC<IGroup> = (props: IGroup) => {

    const store = useContext(Context);

    const checkTodo = (todoId: string) => {
        store.checkTodo(props._id, todoId, store.getCurrentGroupId());
    }
    useEffect(() => {
        // store.getGroupUsersEmail(props);
    }, [])

    return (
        <Paper elevation={2} sx={{
            display: 'flex',
        }}>
            <ListItem disablePadding aria-multiline sx={{
                background: 'rgba(21,101,192,0.15)',
                width: '25%',
                minWidth: '250px'
            }}>
                {/* <Checkbox
                    id={props._id}
                    checked={props.users.find((user) => {user._id === store.getUser()._id})?.isLoggedIn}
                    // onClick={() => store.checkCard(props._id, !props.isCompleted, store.getCurrentGroupId())}
                    sx={{ cursor: 'pointer' }} /> */}

                <Typography sx={{
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    width: '100%',
                }}>
                    {props.label}
                </Typography>
                {/* <DeleteIcon fontSize='small' onClick={() => { store.removeOneCard(props._id, store.getCurrentGroupId()); }} sx={{ cursor: 'pointer', width: '30px' }} />
                <Link to='/editcard'>
                    <EditIcon fontSize='small' onClick={() => { store.editCard(props._id); }} sx={{ cursor: 'pointer', width: '30px' }} />
                </Link> */}
                {
                    store.getUser()._id === props.ownerId &&
                    <Link to='/editgroup'>
                        <EditIcon fontSize='small' onClick={() => { store.editCard(props._id); }} sx={{ cursor: 'pointer', width: '30px' }} />
                    </Link>
                }

            </ListItem>
            <UsersList users={props.users} />
        </Paper>
    );
}

export default observer(Group);