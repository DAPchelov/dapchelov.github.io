import '../../styles/loginPage/LoginPage.css';
import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';
import { width } from '@mui/system';


function LoginPage() {
  let contained: boolean = false;
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginButton, setLoginButton] = useState(<Button variant="outlined" disabled sx={{ width: 200 }}>SIGN IN</Button>)

  const turnOnSinginButton = () => {
    if ((login.length > 0) && (password.length > 4)) {
      setLoginButton(<Button variant="contained" color="success" sx={{ width: 200 }}>SIGN IN</Button>)
    } else {
      setLoginButton(<Button variant="outlined" disabled sx={{ width: 200 }}>SIGN IN</Button>);
    }
  }

  return (
    <div className="loginPage">
      <Card className="loginFrame">
        <CardContent className='loginContent'>
          <Typography color="text.secondary" sx={{ fontSize: 28 }} gutterBottom>Sing in</Typography>
          <TextField
            id="standard-basic"
            label="Login"
            variant="standard"
            onChange={(event) => { setLogin(event.target.value); turnOnSinginButton() }}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={(event) => { setPassword(event.target.value); turnOnSinginButton() }}
          />
        </CardContent>
        <CardActions className="loginActions" sx={{ '& button': { m: 1 } }}>
          {
            loginButton
          }
          <div className='sinbgUpBlock'>
            <Typography color="text.secondary" sx={{ fontSize: 28 }} gutterBottom>Create account</Typography>
            <Button variant="contained" color="secondary" sx={{ width: 200 }}>SING UP</Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default LoginPage;