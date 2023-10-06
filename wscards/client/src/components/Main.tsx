import React, { createContext, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CardsList from './CardsList'
import InputForm from './InputForm';
import ControlPanel from './ControlPanel/ControlPanel';
// import Store from '../store/store';
import { Context } from './App'

// const store = new Store();
// const Context = createContext(store);

const Main: React.FC = () => {
  const store = useContext(Context);

  useEffect(() => {
    // store.setToken(localStorage.getItem('token'));
  }, [])


  return (
    // <Context.Provider value={store}>
    <Container sx={{
      pt: '100px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {store.getUser() && (store.getUser().email && <Typography variant='h4' color='text.secondary' gutterBottom>{store.getUser().email}</Typography>)}
      <Box sx={{ width: '100%' }}>
        <ControlPanel />
        <Routes>
          <Route path='/' element={<CardsList />} />
          <Route path='/newcard' element={<InputForm />} />
        </Routes>
      </Box>
    </Container>
    // </Context.Provider>
  );
};

export default observer(Main);
// export { Context }

