import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { ITask } from './App'
import { gql, useMutation } from "@apollo/client";

interface IPropsTodo {
    task: ITask,
    UUID: String,
}

const SWITCH_COMPLETE = gql`
    mutation($UUID: String!, $taskID: Int!) {
      switchComplete(UUID: $UUID, taskID: $taskID)
    }
  `;


const Todo: React.FC<IPropsTodo> = (props: IPropsTodo) => {

    const [switchTask] = useMutation(SWITCH_COMPLETE);

    const handleToggle = (UUID: String, taskID: Number) => {
        console.log(taskID);
        switchTask({
            variables: {taskID, UUID}
        });
    }

    return (
        <Paper elevation={1} sx={{
            cursor: 'pointer',
            '&:hover': {
                background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 83%, rgba(21,101,192,0.15) 100%);'
            }
        }}
            onClick={() => handleToggle(props.UUID, props.task.id)}>
            <ListItem disablePadding aria-multiline>
                <Checkbox
                    checked={props.task.complete}
                />
                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {props.task.content}
                </Typography>
            </ListItem>
        </Paper>
    );
}

export default Todo;