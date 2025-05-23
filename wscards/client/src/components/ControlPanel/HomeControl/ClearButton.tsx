import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../App'



const ClearButton: React.FC = () => {
    const store = useContext(Context);

    const removeCallback = () => {
        store.cardController.removeCompletedCards(store.groupController._id).then(() => {
            store.groupController.receiveGroupCards(store.groupController._id);
        });
    }

    return (
        <Button variant='outlined' color="error" sx={{ fontSize: 10, width: '120px' }} size='small' onClick={() => removeCallback()}>удалить готовые</Button>
    );
}

export default observer(ClearButton);