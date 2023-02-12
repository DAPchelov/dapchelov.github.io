import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { Context } from '../index'
import { ICard } from "../models/ICard";
import { observer } from 'mobx-react-lite';

const Card: React.FC<ICard> = (props: ICard) => {
    const store = useContext(Context);

    return (
        <Paper elevation={1} sx={{
            '&:hover': {
                background: 'linear-gradient(270deg, rgba(255,85,0,0.15) 0%, rgba(0,0,0,0) 17%, rgba(0,0,0,0) 83%, rgba(21,101,192,0.15) 100%)'
            }
        }}>
            <ListItem disablePadding aria-multiline>
                <Checkbox
                    checked={props.isCompleted}
                    onClick={()=> store.checkTodo(props._id, !props.isCompleted)}
                    sx={{
                        cursor: 'pointer',
                    }}/>
                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '88%'}}>
                    {props.message}
                </Typography>
                <DeleteIcon fontSize="small"
                onClick={()=> {
                    store.removeOneTodo(props._id);
                    store.pullTodos();
                }}
                sx={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '5px',
                }}/>
            </ListItem>
        </Paper>
    );
}

export default observer(Card);