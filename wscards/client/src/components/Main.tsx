import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Box from '@mui/material/Box';

import CardsList from './CardsList/CardsList'
import NewCardForm from './NewCardForm';
import ControlPanel from './ControlPanel/ControlPanel';
import EditCardForm from './EditCardForm';
import NewGroupForm from './NewGroupForm/NewGroupForm';
import UserControlPanel from './UserControlPanel/UserControlPanel';
import GroupsList from './GroupsList/GroupsList';


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
          <Route path='/groups' element={<GroupsList />} />
          <Route path='/newcard' element={<NewCardForm />} />
          <Route path='/editcard' element={<EditCardForm />} />
          <Route path='/newgroup' element={<NewGroupForm />} />
          <Route path='/editgroup' element={<NewGroupForm />} />
        </Routes>
    </Box>
  );
};

export default observer(Main);

