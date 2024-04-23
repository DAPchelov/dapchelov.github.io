import React from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@mui/material/Paper';
import UserBadge from './UserBadge';
import GroupSelect from './GroupSelect';

const UserControlPanel: React.FC = () => {

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: 3,
        minWidth: '350px'
      }}>
      <UserBadge />
      <GroupSelect />
    </Paper>
  );
}

export default observer(UserControlPanel);