import './LoginPage.css';
import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import type {
  SubmitHandler,
  DefaultValues
} from "react-hook-form";
import { useNavigate } from "react-router-dom";


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

const LoginPage: React.FC<IPropsLoginPage> = (props: IPropsLoginPage) => {

  const {
    register,
    handleSubmit,
    control,
    formState: {isValid}
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
  });

  const navigate = useNavigate();
  
  const [login, setLogin] = useState<string>('null')
  const [password, setPassword] = useState<string>('null')

  const QUERY_USER_UUID = gql`
    query UserUUID {
      user(login: "${login}", password: "${password}") {
    _id
  }
  }`;

  const queryUserID = useQuery(QUERY_USER_UUID);
  if (queryUserID.data) {
    props.setUUID(queryUserID.data.user._id);
    navigate("../", { replace: true });
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setLogin(data.Login);
    setPassword(data.Password);
  };

  return (
    <div className="loginPage">
      <Card className="loginFrame">
        <form onSubmit={handleSubmit(onSubmit)} className="loginContent">
          <Typography color="text.secondary" sx={{ fontSize: 28 }} gutterBottom>Sing in</Typography>
          <TextField {...register('Login', {
            required: true,
            minLength: 3,
          })}
            id="standard-basic"
            label="Login"
            variant="standard"
          />
          <TextField
            {...register('Password', {
              required: true,
              minLength: 6,
            })}
            id="standard-password-input"
            label="Password"
            variant="standard"
            type="password"
            autoComplete="current-password"
          />
          <Button type="submit" variant={isValid ? "contained" : "outlined"} color="success" disabled={!isValid} sx={{ width: 200 }}>SIGN IN</Button>
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

export default LoginPage;