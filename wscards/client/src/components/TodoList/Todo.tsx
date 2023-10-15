import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import React from 'react';
import { ITodo } from '../../models/ITodo';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';

interface ITodoProps {
    content: ITodo,
    removeTodo(id: ITodo['_id']): void,
    checkTodo(id: ITodo['_id']): void,
}

const Todo: React.FC<ITodoProps> = (props: ITodoProps) => {

    return (
        <Box sx={{
            boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                background: 'linear-gradient(270deg, rgba(255,85,0,0.15) 0%, rgba(0,0,0,0) 17%, rgba(0,0,0,0) 83%, rgba(21,101,192,0.15) 100%)'
            }
        }}>
            <ListItem disablePadding aria-multiline sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox
                    id={'checkBoxId' + props.content._id}
                    checked={props.content.isCompleted}
                    onClick={() => { props.checkTodo(props.content._id) }}
                    sx={{ cursor: 'pointer' }} />
                <Typography sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    wordWrap: 'break-word',
                    width: '100%',
                }}>
                    {props.content.message}
                </Typography>
            </ListItem>
        </Box>
    );
}

export default observer(Todo);