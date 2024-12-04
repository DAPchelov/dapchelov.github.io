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
        columnGap: 1,
        padding: 1,
        boxShadow: 3,
      }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        columnGap: 1,
        width: '50%',
        maxWidth: '500px',
      }}>
        <Button variant='contained' sx={{ fontSize: 10, width: '100%' }} size='small' color='secondary' onClick={() => navigate('/')}>Карточки</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '100%' }} size='small' color='secondary' onClick={() => navigate('/groups')}>Группы</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '100%' }} size='small' onClick={() => navigate('/newcard')}>Новая карточка</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '100%' }} size='small' onClick={() => navigate('/newgroup')}>Новая группа</Button>
      </Box>
      <Routes>
        <Route path='/' element={<HomeControl />} />
        <Route path='/newgroup' element={<NewGroupControl />} />
        <Route path='/groups' element={<NewGroupControl />} />
      </Routes>
      <Button variant='outlined' sx={{ fontSize: 10, width: '8%' }} size='small' color='error' onClick={() => store.logout()}>Выход</Button>
    </Paper>
  );
}

export default observer(ControlPanel);