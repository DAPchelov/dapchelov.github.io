import Button from '@mui/material/Button';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const NewGroupControl: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Button variant={'contained'} sx={{ fontSize: 10, width: 120 }} size='small' onClick={() => navigate('/')}>Домой</Button>
    );
}

export default observer(NewGroupControl);