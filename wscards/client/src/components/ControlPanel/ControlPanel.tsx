import React, { useContext } from 'react';
import { Context } from '../App'
import { observer } from 'mobx-react-lite';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import HomeControl from './HomeControl/HomeControl';
import NewGroupControl from './NewGroupControl/NewGroupControl';
import Box from '@mui/material/Box';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

const ControlPanel: React.FC = () => {
  const navigate = useNavigate();

  const store = useContext(Context);

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        columnGap: '5px',
        padding: 1,
        boxShadow: 3,
      }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '45%',
        minWidth: '250px',
        maxWidth: '400px',
      }}>
        <Button variant='contained' sx={{ fontSize: 10, width: '22%' }} size='small' color='secondary' startIcon={<AssignmentTurnedInOutlinedIcon />} onClick={() => navigate('/')}>Cards</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '22%' }} size='small' color='secondary' startIcon={<AssignmentTurnedInOutlinedIcon />} onClick={() => navigate('/groups')}>Groups</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '22%' }} size='small' onClick={() => navigate('/newcard')}>New Card</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '22%' }} size='small' onClick={() => navigate('/newgroup')}>New Group</Button>
      </Box>
      <Routes>
        <Route path='/' element={<HomeControl />} />
        <Route path='/newgroup' element={<NewGroupControl />} />
        <Route path='/groups' element={<NewGroupControl />} />
      </Routes>
      <Button variant='outlined' sx={{ fontSize: 10, width: '8%' }} size='small' color='error' onClick={() => store.logout()}>Logout</Button>
    </Paper>
  );
}

export default observer(ControlPanel);