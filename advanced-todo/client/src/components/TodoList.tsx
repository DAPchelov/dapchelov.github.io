import Stack from '@mui/material/Stack';
import React, { useContext } from 'react';
import Todo from './Todo'
import { Context } from '../../src/index'
import { observer } from 'mobx-react-lite';




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
                // .filter((todo) => {todo.isCompleted === store.isCompletedDisplayMode})
                .map(todo => {
                    return (
                        <Todo key={todo._id} _id={todo._id} message={todo.message} isCompleted={todo.isCompleted}/>
                    );
                })}
        </Stack>
    );
}

export default observer(TodoList);