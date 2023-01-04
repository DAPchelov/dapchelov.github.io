import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { Context } from '../../src/index'
import { ITodo } from "../models/ITodo";

const Todo: React.FC<ITodo> = (props: ITodo) => {
    const store = useContext(Context);

    return (
        <Paper elevation={1} sx={{
            cursor: 'pointer',
            '&:hover': {
                background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 83%, rgba(21,101,192,0.15) 100%);'
            }
        }}
        onClick={()=> store.checkTodo(props._id, !props.isCompleted)}>
            <ListItem disablePadding aria-multiline>
                <Checkbox
                    checked={props.isCompleted}
                />
                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {props.message}
                </Typography>
            </ListItem>
        </Paper>
    );
}

export default Todo;