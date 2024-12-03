import React from 'react';
import { observer } from 'mobx-react-lite';
import Paper from '@mui/material/Paper';
import UserBadge from './UserBadge';

const UserControlPanel: React.FC = () => {

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: 3,
        minWidth: '350px',
      }}>
      <UserBadge />
    </Paper>
  );
}

export default observer(UserControlPanel);