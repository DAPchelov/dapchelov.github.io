import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/loginForm/LoginForm';
import Main from './components/Main';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import Store from './store/store';
import { Context } from '../src/index'


const App: FC = () => {
  // const [user, setUser] = useState<IUser>();
  const store = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  // const getUsers = async() => {
  //   try {
  //     const response = await UserService.fetchUser();
  //     setUser(response.data);
  //   } catch (e: any) {
  //     console.log(e);
  //   }
  // }

  if (store.isLoading) {
    return (<div>Загрузка...</div>)
  }

  if (!store.isAuth) {
    return (<LoginForm />)
  }

  return (
    <Main/>
  );
}

export default observer(App);
