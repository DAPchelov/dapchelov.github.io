import React, { useContext } from 'react';
import { Context } from '../App'
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
        width: '70%',
        maxWidth: '800px',
      }}>
        <Button variant='contained' sx={{ fontSize: 10, width: '100%' }} size='small' onClick={() => navigate('/')}>Карточки</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '100%' }} size='small' onClick={() => navigate('/newcard')}>Новая карточка</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '100%' }} size='small' color='secondary' onClick={() => navigate('/groups')}>Группы</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '100%' }} size='small' color='secondary' onClick={() => navigate('/newgroup')}>Новая группа</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '100%' }} size='small' color='inherit' onClick={() => navigate('/docs')}>Документы</Button>
        <Button variant='contained' sx={{ fontSize: 10, width: '100%' }} size='small' color='inherit' onClick={() => navigate('/newdoc')}>Новый документ</Button>
      </Box>
    </Paper>
  );
}

export default observer(ControlPanel);