import './SignUpPage.css';
import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, TextField } from '@mui/material';
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
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

const SignUpPage: React.FC<IPropsLoginPage> = (props: IPropsLoginPage) => {

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { isValid }
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
  });

  const navigate = useNavigate();

  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();

  const MUTATION_NEW_USER = gql`
    mutation UserUUID {
      newUserUUID(userLogin: "${login}", userPassword: "${password}")
  }`;

  const [mutationNewUser, {error, data}] = useMutation<
    { newUserUUID: string }
  >(MUTATION_NEW_USER, {
    variables: { newUserUUID: String }
  });
  if (data) {
    props.setUUID(data.newUserUUID);
    navigate("../tasks", { replace: true });
  };

  useEffect (()=> {
    if (login && password) {
      mutationNewUser();
    }
  },[login, password])

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setLogin(data.Login);
    setPassword(data.Password);
  };

  return (
    <div className="signUpPage">
      <Card className="signUpFrame">
        <form onSubmit={handleSubmit(onSubmit)} className="signUpContent">
          <Typography color="text.secondary" sx={{ fontSize: 28 }} gutterBottom>Sign UP</Typography>
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

export default SignUpPage;