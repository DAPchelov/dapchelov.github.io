import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import React from 'react';
import { ITodo } from '../../models/ITodo';
import { observer } from 'mobx-react-lite';
import { Box, TextField } from '@mui/material';

interface ITodoProps {
    content: ITodo,
    removeTodo(id: ITodo['_id']): void,
    checkTodo(id: ITodo['_id']): void,
}

const TodoField: React.FC<ITodoProps> = (props: ITodoProps) => {
    const setNewTodoMessage = (message: string) => {
        props.content.message = message;
    }

    return (
        <Box sx={{
            boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                background: 'linear-gradient(270deg, rgba(255,85,0,0.15) 0%, rgba(0,0,0,0) 17%, rgba(0,0,0,0) 83%, rgba(21,101,192,0.15) 100%)'
            }
        }}>
            <ListItem disablePadding aria-multiline sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox
                    checked={props.content.isCompleted}
                    onClick={() => {
                        props.checkTodo(props.content._id);
                    }}
                    sx={{
                        cursor: 'pointer',
                    }} />
                <TextField
                    // id='standard-basic'
                    id={props.content._id}
                    variant='standard'
                    fullWidth
                    sx={{ marginTop: 0 }}
                    defaultValue='New Todo'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewTodoMessage(event.target.value)}
                />
                <DeleteIcon fontSize='small'
                    onClick={() => {
                        props.removeTodo(props.content._id);
                    }}
                    sx={{
                        cursor: 'pointer',
                        width: '30px',
                    }}
                />
            </ListItem>
        </Box>
    );
}

export default observer(TodoField);