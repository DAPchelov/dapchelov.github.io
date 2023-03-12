import React, { useContext } from 'react';
import { Context } from '../../../index'
import { observer } from 'mobx-react-lite';

import SelectButtons from './SelectButtons';
import ClearButton from './ClearButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const HomeControl: React.FC = () => {
    const store = useContext(Context);

    return (
        <>
            <Typography color='text.secondary' ml={1} sx={{ fontSize: 14 }}>
                {`${store.getCards().filter(task => task.isCompleted === false).length}`.concat(' items left')}
            </Typography>
            <Link to='/newcard' style={{ textDecoration: 'none' }}><Button variant={'contained'} sx={{ fontSize: 10 }} size='small' >Create NEW card</Button></Link>
            <SelectButtons />
            <ClearButton />
        </>
    );
}

export default observer(HomeControl);