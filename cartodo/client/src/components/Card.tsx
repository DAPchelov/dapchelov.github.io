import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { ICard } from '../models/ICard';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import TodoList from './TodoList/TodoList';

import React, { useContext } from 'react';
import { Context } from '../index'

const Card: React.FC<ICard> = (props: ICard) => {

    const store = useContext(Context);

    // bind the context to the method, for set it on callback
    // implement remove todo method!
    // const removeTodo = store.removeTodo.bind(store);

    return (
        <Box >
            <ListItem sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
                marginBottom: 1,
                marginTop: 1,
                boxShadow: 3,
            }}>
                <ListItem disablePadding aria-multiline sx={{
                    boxShadow: 3,
                    background: 'rgba(21,101,192,0.15)',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Checkbox
                        checked={props.isCompleted}
                        onClick={() => store.checkCard(props._id, !props.isCompleted)}
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
                            store.removeOneCard(props._id);
                            store.pullCards();
                        }}
                        sx={{
                            cursor: 'pointer',
                            width: '30px',
                        }} />
                </ListItem>
                {/*assign removeTodo method */}
                <TodoList todos={props.todos} removeTodo={() => { }} />
            </ListItem>
        </Box>
    );
}

export default observer(Card);