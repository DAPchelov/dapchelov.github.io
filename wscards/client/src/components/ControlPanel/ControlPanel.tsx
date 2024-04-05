import React, { useContext } from 'react';
import { Context } from '../App'
import { observer } from 'mobx-react-lite';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import HomeControl from './HomeControl/HomeControl';
import NewCardControl from './NewCardControl/NewCardControl';
import NewGroupControl from './NewGroupControl/NewGroupControl';
import Box from '@mui/material/Box';

const ControlPanel: React.FC = () => {
  const navigate = useNavigate();

  const store = useContext(Context);

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 1,
        boxShadow: 3,
        minWidth: '350px'
      }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width:'35%',
        minWidth: '190px',
    }}>
        <Button variant='contained' sx={{ fontSize: 10, width: '30%' }} size='small' onClick={() => navigate('/')}>Home</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '30%' }} size='small' onClick={() => navigate('/newcard')}>New Card</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '30%' }} size='small' onClick={() => navigate('/newgroup')}>New Group</Button>
      </Box>
      <Routes>
        <Route path='/' element={<HomeControl />} />
        <Route path='/newcard' element={<NewCardControl />} />
        <Route path='/editcard' element={<NewCardControl />} />
        <Route path='/newgroup' element={<NewGroupControl />} />
      </Routes>
      <Button variant='outlined' sx={{ fontSize: 10, width: '8%' }} size='small' color='error' onClick={() => store.logout()}>Logout</Button>
    </Paper>
  );
}

export default observer(ControlPanel);