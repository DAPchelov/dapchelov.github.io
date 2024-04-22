import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { ICard } from '../models/ICard';
import { observer } from 'mobx-react-lite';
import { Paper } from '@mui/material';
import TodoList from './TodoList/TodoList';

import React, { useContext } from 'react';
import { Context } from './App'
import { Link } from 'react-router-dom';

const Card: React.FC<ICard> = (props: ICard) => {

    const store = useContext(Context);

    const checkTodo = (todoId: string) => {
        store.checkTodo(props._id, todoId, store.getCurrentGroupId());
    }

    return (
        <Paper elevation={2} sx={{
            display: 'flex',
            // flexDirection: 'column',
        }}>
            <ListItem disablePadding aria-multiline sx={{
                background: 'rgba(21,101,192,0.15)',
                width: '25%',
                minWidth: '250px'
            }}>
                <Checkbox
                    id={props._id}
                    checked={props.isCompleted}
                    onClick={() => store.checkCard(props._id, !props.isCompleted, store.getCurrentGroupId())}
                    sx={{ cursor: 'pointer' }} />

                <Typography sx={{
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    width: '100%',
                }}>
                    {props.message}
                </Typography>
                <DeleteIcon fontSize='small' onClick={() => { store.removeOneCard(props._id, store.getCurrentGroupId()); }} sx={{ cursor: 'pointer', width: '30px' }} />
                <Link to='/editcard'>
                    <EditIcon fontSize='small' onClick={() => { store.editCard(props._id); }} sx={{ cursor: 'pointer', width: '30px' }} />
                </Link>
            </ListItem>
            <TodoList todos={props.todos} checkTodo={checkTodo} />
        </Paper>
    );
}

export default observer(Card);