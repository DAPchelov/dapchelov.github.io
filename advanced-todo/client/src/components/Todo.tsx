import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';

const Todo: React.FC = () => {

    return (
        <Paper elevation={1} sx={{
            cursor: 'pointer',
            '&:hover': {
                background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 83%, rgba(21,101,192,0.15) 100%);'
            }
        }}>
            <ListItem disablePadding aria-multiline>
                <Checkbox
                    // checked={props.task.complete}
                />
                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {/* {props.task.content} */}
                </Typography>
            </ListItem>
        </Paper>
    );
}

export default Todo;