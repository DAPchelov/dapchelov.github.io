import React, { useContext } from 'react';
import { Context } from '../App'

import { observer } from 'mobx-react-lite';
import Paper from '@mui/material/Paper';
import UserBadge from './UserBadge';
import Button from '@mui/material/Button';

const UserControlPanel: React.FC = () => {

  const store = useContext(Context);

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 3,
        minWidth: '350px',
        padding: 1,
      }}>
      <UserBadge />
      <Button variant='outlined' sx={{ fontSize: 10, width: '120px', height: '60px' }} size='small' color='error' onClick={() => store.authController.doLogout()}>Выход</Button>
    </Paper>
  );
}

export default observer(UserControlPanel);