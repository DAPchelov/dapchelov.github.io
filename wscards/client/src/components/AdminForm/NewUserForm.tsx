import Paper from '@mui/material/Paper';
import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App'
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import UserSearchForm from '../GroupForms/UsersFields/UserSearchForm';
import UserListForm from '../GroupForms/UsersFields/UserListForm';



const NewUserForm: React.FC = () => {

  const store = useContext(Context);

  useEffect(() => {
  }, [])

  const setLogin = (login: string) => {
    store.authController.login = login;
  }
  const setPassword = (password: string) => {
    store.authController.password = password;
  }
  const registrationCallback = () => {
    store.authController.doRegistration();
  };

  return (
    <div>
      <Paper sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 1,
        boxShadow: 3,
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          columnGap: 1,
          marginBottom: 1,
        }}>
          <TextField sx={{ width: '100%' }}
            multiline
            id='filled-basic'
            label='Логин'
            variant='filled'
            color='success'
            value={store.authController.login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField sx={{ width: '100%' }}
            multiline
            id='filled-basic'
            label='Пароль'
            variant='filled'
            color='success'
            type='password'
            value={store.authController.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          columnGap: 1,
          padding: 0,
        }}>
          <Button variant='contained' sx={{ fontSize: 12, height: '40px', width: '40%' }} size='small' onClick={() => registrationCallback()}>Зарегистрировать пользователя</Button>
        </Box>
      </Paper>
    </div>
  );
};

export default observer(NewUserForm);
