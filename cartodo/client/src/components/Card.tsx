import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { Context } from '../index'
import { ICard } from '../models/ICard';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import TodoList from './TodoList/TodoList';

const Card: React.FC<ICard> = (props: ICard) => {

    const store = useContext(Context);

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
                    }}>
                        <Checkbox
                            checked={props.isCompleted}
                            onClick={() => store.checkCard(props._id, !props.isCompleted)}
                            sx={{
                                cursor: 'pointer',
                            }} />
                        <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '88%' }}>
                            {props.message}
                        </Typography>
                        <DeleteIcon fontSize='small'
                            onClick={() => {
                                store.removeOneCard(props._id);
                                store.pullCards();
                            }}
                            sx={{
                                cursor: 'pointer',
                                position: 'absolute',
                                right: '5px',
                            }} />
                    </ListItem>
                <TodoList todos={props.todos} />
            </ListItem>
        </Box>
    );
}

export default observer(Card);