import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Container } from '@mui/system';
import Box from '@mui/material/Box';

import CardsList from './CardsList'
import NewCardForm from './NewCardForm';
import ControlPanel from './ControlPanel/ControlPanel';
import EditCardForm from './EditCardForm';
import NewGroupForm from './NewGroupForm/NewGroupForm';
import UserBadge from './UserControlPanel/UserBadge';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import UserControlPanel from './UserControlPanel/UserControlPanel';


const Main: React.FC = () => {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: 1,
      height: '98vh',
      minWidth: '560px'
    }}>
      <UserControlPanel />
      <ControlPanel />
        <Routes>
          <Route path='/' element={<CardsList />} />
          <Route path='/newcard' element={<NewCardForm />} />
          <Route path='/editcard' element={<EditCardForm />} />
          <Route path='/newgroup' element={<NewGroupForm />} />
        </Routes>
    </Box>
  );
};

export default observer(Main);

