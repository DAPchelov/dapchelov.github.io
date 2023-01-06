import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../src/index'



const ClearButton: React.FC = () => {
    const store = useContext(Context);

    const removeCallback = () => {
        store.removeCompletedTodos();
        store.receiveTodos();
    }

    return (
        <Button variant="text" sx={{ fontSize: 10 }} onClick = {() => removeCallback()}>clear completed</Button>
    );
}

export default observer(ClearButton);