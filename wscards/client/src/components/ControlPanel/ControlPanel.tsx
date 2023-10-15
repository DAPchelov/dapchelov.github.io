import React, { useContext } from 'react';
import { Context } from '../App'
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import HomeControl from './HomeControl/HomeControl';
import NewCardControl from './NewCardControl/NewCardControl';


const ControlPanel: React.FC = () => {
  const store = useContext(Context);

  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 1,
        paddingRight: 1,
        boxShadow: 3,
        height: 30
      }}>
      <Routes>
        <Route path='/' element={<HomeControl />} />
        <Route path='/newcard' element={<NewCardControl />} />
        <Route path='/editcard' element={<NewCardControl />} />
      </Routes>
      <Button variant='text' sx={{ fontSize: 10 }} size='small' color='error' onClick={() => store.logout()}>Logout</Button>
    </Paper>
  );
}

export default observer(ControlPanel);