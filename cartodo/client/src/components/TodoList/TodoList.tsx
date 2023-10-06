import Stack from '@mui/material/Stack';
import React from 'react';
import Todo from './Todo'
import { observer } from 'mobx-react-lite';
import { ITodo } from '../../models/ITodo';

interface ITodoListProps {
    todos: ITodo[],
    removeTodo (id: string | undefined): void,
    checkTodo (id: string | undefined): void,
}

const TodoList: React.FC<ITodoListProps> = (props: ITodoListProps) => {

    return (
        <Stack sx ={{
            width: '100%'
        }}>
            {props.todos.map(todo => {
                return (
                    <Todo key={todo._id} content={todo} removeTodo={props.removeTodo} checkTodo={props.checkTodo} />
                )
            })}
        </Stack>
    );
}

export default observer(TodoList);
