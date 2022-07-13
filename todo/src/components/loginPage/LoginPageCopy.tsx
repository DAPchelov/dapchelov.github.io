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
  TextField: string
}

export type FormValues = {
  TextField: string;
};

export const defaultValues: DefaultValues<FormValues> = {
  TextField: "",
};

function LoginPageCopy(props: IPropsLoginPage) {

  const { handleSubmit, control } = useForm<FormValues>({
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
        <CardContent className='loginContent'>
          <Typography color="text.secondary" sx={{ fontSize: 28 }} gutterBottom>Sing in</Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
          <Controller
              render={({ field }) => <TextField {...field}
                id="standard-basic"
                label="Login"
                variant="standard"
              />}
              name="TextField"
              control={control}
            />
          </form>

          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
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

export default LoginPageCopy;