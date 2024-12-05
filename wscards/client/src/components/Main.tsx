import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Box from '@mui/material/Box';

import CardsList from './CardsList/CardsList'
import NewCardForm from './CardForms/NewCardForm';
import ControlPanel from './ControlPanel/ControlPanel';
import EditCardForm from './CardForms/EditCardForm';
import NewGroupForm from './GroupForms/NewGroupForm';
import UserControlPanel from './UserControlPanel/UserControlPanel';
import GroupsList from './GroupsList/GroupsList';
import EditGroupForm from './GroupForms/EditGroupForm';


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
          <Route path='/editgroup' element={<EditGroupForm />} />
        </Routes>
    </Box>
  );
};

export default observer(Main);

