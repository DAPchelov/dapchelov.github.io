import Stack from '@mui/material/Stack';
import React, { useContext } from 'react';
import Todo from './Todo'
import { Context } from '../../src/index'



const TodoList: React.FC = () => {
    const store = useContext(Context);

    return (
        <Stack>
            {/* {store.todos
                .filter(todo => filterTask(todo, props.completed))
                .map(todo => {
                    return (
                        <Todo key={todo.id} todo={todo}/>
                    );
                })} */}

                {store.todos
                .map(todo => {
                    return (
                        <Todo key={todo.id} message={todo.message} isCompleted={todo.isCompleted}/>
                    );
                })}
        </Stack>
    );
}

export default TodoList;