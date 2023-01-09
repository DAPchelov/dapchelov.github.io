import './LoginForm.css';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Typography, CardActions, Button, TextField } from '@mui/material';
import { Context } from "../../index";

const LoginForm: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const store = useContext(Context);
  const regEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  useEffect(()=> {
    if ((regEmail.test(email)) && (password.length > 5)) {
      setIsValid(true);
    } else if (isValid === true) {
      setIsValid(false);
    }
  },[email, password])

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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
          />
          <Button type="submit" variant={isValid ? "contained" : "outlined"} color="success" disabled={!isValid} sx={{ width: 200 }} onClick={() => store.login(email, password)}>SIGN IN</Button>
        </div>
        <CardActions className="loginActions" sx={{ '& button': { m: 1 } }}>
          <div className='signUpBlock'>
            <Typography color="text.secondary" sx={{ fontSize: 28 }} gutterBottom>Create account</Typography>
            <Button type="submit" variant={isValid ? "contained" : "outlined"} color="secondary" disabled={!isValid} sx={{ width: 200 }} onClick={() => store.registration(email, password)}>SIGN UP</Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default LoginForm;