import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { observer } from 'mobx-react-lite';

// this component is displayed in the todo list if the user is not activated
const LoadingCard: React.FC = () => {

    return (
        <Paper elevation={1}>
            <ListItem disablePadding aria-multiline>
                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>
                    {'You cards is loading!'}
                </Typography>
            </ListItem>
        </Paper>
    );
}

export default observer(LoadingCard);