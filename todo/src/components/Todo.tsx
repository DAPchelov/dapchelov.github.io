import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { ITask } from './App'



interface IPropsTodo {
    task: ITask,
    handleToggle: (taskNumber: ITask["id"]) => void;
}

const Todo: React.FC<IPropsTodo> = (props: IPropsTodo) => {
    return (
        <Paper elevation={1}>
            <ListItem disablePadding aria-multiline>
                <Checkbox
                    checked={props.task.complete}
                    onClick={() => props.handleToggle(props.task.id)}
                />
                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {props.task.content}
                </Typography>
            </ListItem>
        </Paper>
    );
}

export default Todo;