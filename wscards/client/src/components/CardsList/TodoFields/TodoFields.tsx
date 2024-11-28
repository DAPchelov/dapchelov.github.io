import React from 'react';
import TodoField from './TodoField'
import { observer } from 'mobx-react-lite';
import { ITodo } from '../../../models/ITodo';
import { Box } from '@mui/material';


type ITodoFieldsProps = {
    todos: ITodo[],
    removeTodo (id: string | undefined): void,
    checkTodo (id: string | undefined): void,
    setTodoMessage (message: string, id: string | undefined): void
}

const TodoFields: React.FC<ITodoFieldsProps> = (props: ITodoFieldsProps) => {
    
    return (
        <Box>
            {props.todos.map(todo => {
                return (
                    <TodoField key={todo._id} content={todo} removeTodo={props.removeTodo} checkTodo={props.checkTodo} setTodoMessage={props.setTodoMessage}/>
                )
            })}
        </Box>
    );
}

export default observer(TodoFields);
