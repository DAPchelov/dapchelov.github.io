import Button from '@mui/material/Button';

import React, { useContext } from 'react';
import { Context } from '../../App'
import { observer } from 'mobx-react-lite';

const NewCardControl: React.FC = () => {
    const store = useContext(Context);

    return (
        <div>
            <Button variant='contained' sx={{ fontSize: 10, width: 120 }} size='small' onClick={() => store.newCard.postCard(store.getCurrentGroupId())}>Add NEW card</Button>
        </div>
    );
}

export default observer(NewCardControl);