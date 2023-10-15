import React from 'react';
import { observer } from 'mobx-react-lite';

import SelectButtons from './SelectButtons';
import ClearButton from './ClearButton';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const HomeControl: React.FC = () => {

    return (
        <>
            <Link to='/newcard' style={{ textDecoration: 'none' }}><Button variant={'contained'} sx={{ fontSize: 10, width: 150 }} size='small' >Create NEW card</Button></Link>
            <SelectButtons />
            <ClearButton />
        </>
    );
}

export default observer(HomeControl);