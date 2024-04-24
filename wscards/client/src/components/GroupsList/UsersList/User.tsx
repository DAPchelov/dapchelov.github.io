import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

import React from 'react';
import { ITodo } from '../../../models/ITodo';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';

interface IUserProps {
    userId: string,
    isLoggedIn: boolean,
    _id: string,
    // checkTodo(id: ITodo['_id']): void,
}

const User: React.FC<IUserProps> = (props: IUserProps) => {

    return (
        <Box sx={{
            boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                background: 'linear-gradient(270deg, rgba(21,101,192,0.15) 0%, rgba(0,0,0,0) 17%, rgba(0,0,0,0) 83%, rgba(21,101,192,0.15) 100%)'
            }
        }}>
            <ListItem disablePadding aria-multiline sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox
                    id={'checkBoxId' + props.userId}
                    checked={props.isLoggedIn}
                    // onClick={() => { props.checkTodo(props.content._id) }}
                    sx={{ cursor: 'pointer' }} />
                <Typography sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    wordWrap: 'break-word',
                    width: '100%',
                }}>
                    {props.userId}
                </Typography>
            </ListItem>
        </Box>
    );
}

export default observer(User);