import Stack from '@mui/material/Stack';
import React, { useContext } from 'react';
import TodoField from './TodoField'
import { observer } from 'mobx-react-lite';
import { ITodo } from '../../models/ITodo';
import { Button } from '@mui/material';
import { Context } from '../App'


type ITodoListProps = {
    todos: ITodo[],
    removeTodo (id: string | undefined): void,
    checkTodo (id: string | undefined): void,
}

const TodoFields: React.FC<ITodoListProps> = (props: ITodoListProps) => {
    const store = useContext(Context);
    
    return (
        <Stack sx ={{
            width: '100%'
        }}>
            {props.todos.map(todo => {
                return (
                    <TodoField key={todo._id} content={todo} removeTodo={props.removeTodo} checkTodo={props.checkTodo} />
                )
            })}
            <Button variant={'contained'} sx={{ fontSize: 12, width: '100%' }} size='small' color="secondary" onClick={() => store.newCard.addTodo('New todo', false)}>Add NEW Todo</Button>
        </Stack>
    );
}

export default observer(TodoFields);
