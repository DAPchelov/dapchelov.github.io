import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import React, { useContext } from 'react';
import { Context } from '../../../index'
import { observer } from 'mobx-react-lite';

const NewCardControl: React.FC = () => {
    const store = useContext(Context);

    return (
            <ButtonGroup variant='text' aria-label='text button group'>

            </ButtonGroup>
    );
}

export default observer(NewCardControl);