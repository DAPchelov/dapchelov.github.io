import './LoginPage.css';
import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import type {
  SubmitHandler,
  DefaultValues
} from "react-hook-form";


interface IPropsLoginPage {
  setUUID: (UUID: string) => void;
}

interface IFormInputs {
  Password: string,
  Login: string,
}

type FormValues = {
  Password: string;
  Login: string;
};

const defaultValues: DefaultValues<FormValues> = {
  Password: '',
  Login: '',
};

function LoginPageCopy(props: IPropsLoginPage) {

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues
  });

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

  const [loginButton, setLoginButton] = useState(<Button variant="outlined" disabled sx={{ width: 200 }}>SIGN IN</Button>)

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <div className="loginPage">
      <Card className="loginFrame">
        <form onSubmit={handleSubmit(onSubmit)} className="loginContent">
          <Typography color="text.secondary" sx={{ fontSize: 28 }} gutterBottom>Sing in</Typography>
          <TextField {...register('Login')}
            id="standard-basic"
            label="Login"
            variant="standard"
            name="Login"
          />
          <TextField
            {...register('Password')}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />
          <Button type="submit" variant="outlined" sx={{ width: 200 }}>SIGN IN</Button>
        </form>
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

export default LoginPageCopy;