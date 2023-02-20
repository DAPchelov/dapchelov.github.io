import Stack from '@mui/material/Stack';
import React, { useContext } from 'react';
import Todo from './Todo'
import { observer } from 'mobx-react-lite';
import { ITodo } from '../../models/ITodo';

interface ITodos {
    todos: [ITodo]
}

const TodoList: React.FC<ITodos> = (props: ITodos) => {

    return (
        <Stack sx={{marginLeft: 2}}>
            {props.todos.map(todo => {
                return (
                    <Todo key={todo._id} _id={todo._id} message={todo.message} isCompleted={todo.isCompleted} />
                )
            })}
        </Stack>
    );
}

export default observer(TodoList);
