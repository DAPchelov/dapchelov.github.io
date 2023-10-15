import Button from '@mui/material/Button';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const NewCardControl: React.FC = () => {

    return (
            <>
                <Link to='/' style={{ textDecoration: 'none' }}><Button variant={'contained'} sx={{ fontSize: 10, width: 150 }} size='small' >Home</Button></Link>
            </>
    );
}

export default observer(NewCardControl);