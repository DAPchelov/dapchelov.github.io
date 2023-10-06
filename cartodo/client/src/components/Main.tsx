import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CardsList from './CardsList'
import InputForm from './InputForm';
import ControlPanel from './ControlPanel/ControlPanel';

import { observer } from 'mobx-react-lite';
import { Context } from '../index'
import { useContext, useEffect } from 'react';

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';


const Main: React.FC = () => {

  const store = useContext(Context);

  useEffect(() => {
    store.receiveUser();
  }, [store])

  return (
    <Router>
      <Container sx={{
        pt: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
          {store.getUser().email && <Typography variant='h4' color='text.secondary' gutterBottom>{store.getUser().email}</Typography>}
        <Box sx={{ width: '100%' }}>
          <ControlPanel />
          <Routes>
            <Route path='/newcard' element={<InputForm />} />
            <Route path='/' element={<CardsList />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default observer(Main);
