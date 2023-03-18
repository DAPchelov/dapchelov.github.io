import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { ITodo } from '../../models/ITodo';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index'
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

const Todo: React.FC<ITodo> = (props: ITodo) => {

    const store = useContext(Context);

    return (
        <Box sx={{
            boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                background: 'linear-gradient(270deg, rgba(255,85,0,0.15) 0%, rgba(0,0,0,0) 17%, rgba(0,0,0,0) 83%, rgba(21,101,192,0.15) 100%)'
            }
        }}>
            <ListItem disablePadding aria-multiline sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox
                    checked={props.isCompleted}
                    // onClick={()=> store.checkTodo(props._id, !props.isCompleted)}
                    sx={{
                        cursor: 'pointer',
                    }} />
                <Typography sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    wordWrap: 'break-word',
                    width: '100%',
                }}>
                    {props.message}
                </Typography>
                <DeleteIcon fontSize='small'
                    onClick={() => {
                        store.newCard.removeTodo(props._id)
                        // store.removeOneTodo(props._id);
                        // store.pullTodos();
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

export default observer(Todo);