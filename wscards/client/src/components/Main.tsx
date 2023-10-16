import React, { createContext, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CardsList from './CardsList'
import InputForm from './InputForm';
import ControlPanel from './ControlPanel/ControlPanel';
import { Context } from './App'
import EditCardForm from './EditCardForm';


const Main: React.FC = () => {
  const store = useContext(Context);

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {store.getUser() && (<Typography variant='h4' color='text.secondary' gutterBottom>{store.getUser().email}</Typography>)}
      <Box sx={{ width: '100%' }}>
        <ControlPanel />
        <Routes>
          <Route path='/' element={<CardsList />} />
          <Route path='/newcard' element={<InputForm />} />
          <Route path='/editcard' element={<EditCardForm />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default observer(Main);

