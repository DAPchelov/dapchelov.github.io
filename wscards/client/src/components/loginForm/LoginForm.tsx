import './LoginForm.css';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Typography, CardActions, Button, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { Context } from '../App'

const LoginForm: React.FC = () => {

  const [isValid, setIsValid] = useState<boolean>(true);

  const store = useContext(Context);


  const setLogin = (login: string) => {
    store.authController.login = login;
  }
  const setPassword = (password: string) => {
    store.authController.password = password;
  }

  const loginCallback = () => {
    store.authController.doLogin();
  };

  const registrationCallback = () => {
    store.authController.doRegistration();

  };

  const handlePasswordFieldKeyPress = (keyCode: string) => {
    if (((keyCode === "Enter") || (keyCode === "NumpadEnter")) && isValid) {
      loginCallback();
    }
  }

  return (

    <div className="loginPage">
      <Card className="loginFrame">
        <div className="loginContent">
          <Typography color="text.secondary" sx={{ fontSize: 28 }} gutterBottom>Sign in</Typography>
          <TextField
            id="standard-basic"
            label="Login"
            variant="standard"
            required
            onChange={(e) => setLogin(e.target.value)}
            value={store.authController.login}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            variant="standard"
            type="password"
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={store.authController.password}
            onKeyDown={(e) => handlePasswordFieldKeyPress(e.code)}
          />
          <Button type="submit" variant={isValid ? "contained" : "outlined"} color="success" disabled={!isValid} sx={{ width: 200 }} onClick={() => loginCallback()}>SIGN IN</Button>
        </div>
        <CardActions className="loginActions" sx={{ '& button': { m: 1 } }}>
          <div className='signUpBlock'>
            <Typography color="text.secondary" sx={{ fontSize: 28 }} gutterBottom>Create account</Typography>
            
            <Button type="submit" variant={isValid ? "contained" : "outlined"} color="secondary" disabled={!isValid} sx={{ width: 200 }} onClick={() => registrationCallback()}>SIGN UP</Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default observer (LoginForm);