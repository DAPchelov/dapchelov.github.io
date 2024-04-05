import React, { useContext } from 'react';
import { Context } from '../App'
import { observer } from 'mobx-react-lite';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import UserBadge from './UserBadge';
import GroupSelect from './GroupSelect';

const UserControlPanel: React.FC = () => {
  const navigate = useNavigate();

  const store = useContext(Context);

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        // padding: 1,
        boxShadow: 3,
        minWidth: '350px'
      }}>
      <UserBadge />
      <GroupSelect />
    </Paper>
  );
}

export default observer(UserControlPanel);