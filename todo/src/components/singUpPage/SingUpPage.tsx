import './SingUpPage.css';
import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';
import { gql, useQuery } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import type {
  SubmitHandler,
  DefaultValues
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getByTitle } from '@testing-library/react';


interface IPropsLoginPage {
  setUUID: (UUID: string) => void;
}

interface IFormInputs {
  Password: string,
  CPassword: string,
  Login: string,
}

type FormValues = {
  Password: string;
  Login: string;
  CPassword: string;
};

const defaultValues: DefaultValues<FormValues> = {
  Password: '',
  Login: '',
};

const SingUpPage: React.FC<IPropsLoginPage> = (props: IPropsLoginPage) => {

  const {
    register,
    handleSubmit,
    control,
    getValues,
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
          <Typography color="text.secondary" sx={{ fontSize: 28 }} gutterBottom>Sing UP</Typography>
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
          <TextField
            {...register('CPassword', {
              required: true,
              minLength: 6,
              validate: (value) => value === getValues("Password"),
            })}
            id="standard-password-input"
            label="Repeat password"
            variant="standard"
            type="password"
            autoComplete="current-password"
          />
          <Button type="submit" variant={isValid ? "contained" : "outlined"} color="secondary" disabled={!isValid} sx={{ width: 200 }}>SIGN UP</Button>
        </form>
      </Card>
    </div>
  );
}

export default SingUpPage;