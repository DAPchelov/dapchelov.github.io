import React from 'react';
import { observer } from 'mobx-react-lite';

import SelectButtons from './SelectButtons';
import ClearButton from './ClearButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const HomeControl: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            
            <SelectButtons />
            <ClearButton />
        </>
    );
}

export default observer(HomeControl);