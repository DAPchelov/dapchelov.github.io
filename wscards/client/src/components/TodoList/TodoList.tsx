import Stack from '@mui/material/Stack';
import React from 'react';
import Todo from './Todo'
import { observer } from 'mobx-react-lite';
import { ITodo } from '../../models/ITodo';
import { Box } from '@mui/material';

type ITodoListProps = {
    todos: ITodo[],
    checkTodo (id: string | undefined): void,
}

const TodoList: React.FC<ITodoListProps> = (props: ITodoListProps) => {

    return (
        <Box sx ={{
            width: '75%',
        }}>
            {props.todos.map(todo => {
                return (
                    <Todo key={todo._id} content={todo} checkTodo={props.checkTodo} />
                )
            })}
        </Box>
    );
}

export default observer(TodoList);
