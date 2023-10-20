import React, { createContext, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Container } from '@mui/system';
import Box from '@mui/material/Box';

import CardsList from './CardsList'
import InputForm from './InputForm';
import ControlPanel from './ControlPanel/ControlPanel';
import { Context } from './App'
import EditCardForm from './EditCardForm';
import Avatar from '@mui/material/Avatar';
import { lightBlue } from '@mui/material/colors';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';


const Main: React.FC = () => {
  const store = useContext(Context);

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: lightBlue[600] }}>ПД</Avatar>
        </ListItemAvatar>
        <ListItemText primary='Дмитрий Пчелов' secondary='Команда Ракета' />
      </ListItem>
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

