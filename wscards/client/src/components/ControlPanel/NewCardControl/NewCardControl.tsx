import Button from '@mui/material/Button';

import React, { useContext } from 'react';
import { Context } from '../../App'
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const NewCardControl: React.FC = () => {
    const navigate = useNavigate();
    const store = useContext(Context);

    return (
        <>
            <Button variant='contained' sx={{ fontSize: 10, width: 120 }} size='small' color="secondary" onClick={() => store.newCard.addTodo('', false)}>Add NEW Todo</Button>
            <Button variant='contained' sx={{ fontSize: 10, width: 120 }} size='small' onClick={() => store.newCard.postCard()}>Add NEW card</Button>
        </>
    );
}

export default observer(NewCardControl);