import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../App'



const ClearButton: React.FC = () => {
    const store = useContext(Context);

    const removeCallback = () => {
        store.removeCompletedCards(store.getCurrentGroupId()).then(() => {
            store.receiveCards(store.getCurrentGroupId());
        });
    }

    return (
        <Button variant='text' sx={{ fontSize: 10, width: 120 }} size='small' onClick={() => removeCallback()}>clear completed</Button>
    );
}

export default observer(ClearButton);