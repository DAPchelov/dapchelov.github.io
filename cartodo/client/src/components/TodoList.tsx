import Stack from '@mui/material/Stack';
import React, { useContext } from 'react';
import Todo from './Todo'
import { Context } from '../../src/index'
import { observer } from 'mobx-react-lite';
import ActivationTodo from './ActivationTodo';

const TodoList: React.FC = () => {
    const store = useContext(Context);

    return (
        <Stack>
            {store.getUser().isActivated ? store.getTodos()
                .map(todo => {
                    if (store.getIsCompletedDisplayMode() === undefined) {
                        return (
                            <Todo key={todo._id} _id={todo._id} message={todo.message} isCompleted={todo.isCompleted} />
                        )
                    }
                    if (todo.isCompleted === store.getIsCompletedDisplayMode()) {
                        return (
                            <Todo key={todo._id} _id={todo._id} message={todo.message} isCompleted={todo.isCompleted} />
                        )
                    }

                }) : <ActivationTodo />}
        </Stack>
    );
}

export default observer(TodoList);
