import './LoginForm.css';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Typography, CardActions, Button, TextField } from '@mui/material';
import authController from '../../controllers/authColntroller';
import { Context } from '../App'

const LoginForm: React.FC = () => {

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const store = useContext(Context);

  useEffect(() => {
    // RegExp for login`s login
    // const regLogin = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    
    // RegExp for any string login with length >= 3
    // const regLogin = /^[A-Za-zА-Яа-я0-9_]{3,}$/;

    if ((login.length > 2) && (password.length > 5)) {
      setIsValid(true);
    } else if (isValid === true) {
      setIsValid(false);
    }
  }, [login, password, isValid])

  const loginCallback = () => {
    authController.login(login, password).then(() => {
      store.setToken(localStorage.getItem('token'));
      store.getAuth();
    })
  };

  const registrationCallback = () => {
    authController.registration(login, password).then(() => {
      loginCallback();
    })
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
            value={login}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            variant="standard"
            type="password"
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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

export default LoginForm;