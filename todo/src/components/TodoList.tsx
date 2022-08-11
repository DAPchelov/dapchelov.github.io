import Stack from '@mui/material/Stack';
import React from 'react';
import { ITask } from './App'
import Todo from './Todo'

interface IPropsTodoList {
    taskArray: ITask[],
    completed: boolean | undefined,
    handleToggle: (taskNumber: ITask["id"]) => void;
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

const TodoList: React.FC<IPropsTodoList> = (props: IPropsTodoList) => {
    return (
        <Stack>
            {props.taskArray
                .filter(task => filterTask(task, props.completed))
                .map(task => {
                    return (
                        <Todo key={task.id} task={task} handleToggle={props.handleToggle} />
                    );
                })}
        </Stack>
    );
}

export default TodoList;