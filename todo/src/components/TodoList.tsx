import { gql, useMutation } from '@apollo/client';
import Stack from '@mui/material/Stack';
import React from 'react';
import { ITask } from './App'
import Todo from './Todo'

interface IPropsTodoList {
    taskArray: ITask[],
    completed: boolean | undefined,
    UUID: String;
}

const filterTask = (task: ITask, state:IPropsTodoList['completed'] ) => {
    if (state === undefined) {
      return true;
    }
    if (task.complete === state) {
      return true;
    }
    return false;
  };

  const SWITCH_COMPLETE = gql`
    mutation($UUID: String!, $taskID: Int!) {
      switchComplete(UUID: $UUID, taskID: $taskID)
    }
  `;

const TodoList: React.FC<IPropsTodoList> = (props: IPropsTodoList) => {

    const [switchTask] = useMutation(SWITCH_COMPLETE);

    const handleToggle = (UUID: String, taskID: Number) => {
        console.log(taskID);
        switchTask({
            variables: {taskID, UUID}
        });
    }
    return (
        <Stack>
            {props.taskArray
                .filter(task => filterTask(task, props.completed))
                .map(task => {
                    return (
                        <Todo key={task.id} task={task} UUID={props.UUID} handleToggle={handleToggle}/>
                    );
                })}
        </Stack>
    );
}

export default TodoList;