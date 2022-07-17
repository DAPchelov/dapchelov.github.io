import './LoginPage.css';
import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';
import { gql, useQuery, useSubscription } from "@apollo/client";

interface IPropsLoginPage {
  setUUID: (UUID: string) => void;
}

function LoginPage(props: IPropsLoginPage) {

  let [login, setLogin] = useState('null');
  let [password, setPassword] = useState('null');

  const QUERY_USER_UUID = gql`
    query UserUUID {
      user(login: "qweqwe", password: "qweqwe") {
    _id
    login
    password
  }
  }`;

  const queryUserID = useQuery(QUERY_USER_UUID);
  console.log(queryUserID);

  const getUUID = (login: string, password: string) => {
    
  }

  const [loginButton, setLoginButton] = useState(<Button variant="outlined" disabled sx={{ width: 200 }}>SIGN IN</Button>)

  const turnOnSinginButton = () => {
    if ((login.length > 0) && (password.length > 4)) {
      setLoginButton(<Button variant="contained" color="success" sx={{ width: 200 }} onClick={() => getUUID(login, password)}>SIGN IN</Button>)
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
            onChange={(event) => { login = event.target.value; turnOnSinginButton() }}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={(event) => { password = event.target.value; turnOnSinginButton() }}
          />
          {
            loginButton
          }
        </CardContent>
        <CardActions className="loginActions" sx={{ '& button': { m: 1 } }}>

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