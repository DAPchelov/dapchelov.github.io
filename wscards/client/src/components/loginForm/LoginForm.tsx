import './LoginForm.css';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Typography, CardActions, Button, TextField } from '@mui/material';
import authController from '../../controllers/authColntroller';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { Context } from '../App'

// type Props = {
//   setIsAuth: (e: boolean) => void
// }

const LoginForm: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const store = useContext(Context);

  useEffect(() => {
    const regEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if ((regEmail.test(email)) && (password.length > 5)) {
      setIsValid(true);
    } else if (isValid === true) {
      setIsValid(false);
    }
  }, [email, password, isValid])

  let navigate = useNavigate();

  const loginCallback = () => {
    authController.login(email, password).then(() => {
      console.log(localStorage.getItem('token'));
      // props.setIsAuth(localStorage.getItem('token') !== null);
      // navigate("/home");
      store.setToken(localStorage.getItem('token'));
      store.getAuth();
    }
      // store.Login(email, password);
    )
    
  };

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
          <Button type="submit" variant={isValid ? "contained" : "outlined"} color="success" disabled={!isValid} sx={{ width: 200 }} onClick={() => loginCallback()}>SIGN IN</Button>
        </div>
        <CardActions className="loginActions" sx={{ '& button': { m: 1 } }}>
          <div className='signUpBlock'>
            <Typography color="text.secondary" sx={{ fontSize: 28 }} gutterBottom>Create account</Typography>
            <Button type="submit" variant={isValid ? "contained" : "outlined"} color="secondary" disabled={!isValid} sx={{ width: 200 }} onClick={() => authController.registration(email, password)}>SIGN UP</Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default LoginForm;