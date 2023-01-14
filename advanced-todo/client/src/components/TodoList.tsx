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
            {store.user.isActivated ? store.todos
                .map(todo => {
                    if (store.isCompletedDisplayMode === undefined) {
                        return (
                            <Todo key={todo._id} _id={todo._id} message={todo.message} isCompleted={todo.isCompleted} />
                        )
                    }
                    if (todo.isCompleted === store.isCompletedDisplayMode) {
                        return (
                            <Todo key={todo._id} _id={todo._id} message={todo.message} isCompleted={todo.isCompleted} />
                        )
                    }

                }) : <ActivationTodo />}
        </Stack>
    );
}

export default observer(TodoList);

function useEffect(arg0: () => void) {
    throw new Error('Function not implemented.');
}
