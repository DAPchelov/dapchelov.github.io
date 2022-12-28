import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/loginForm/LoginForm';
import Main from './components/Main';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import Store from './store/store';


const App: FC = () => {
  // const [user, setUser] = useState<IUser>();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      Store.checkAuth()
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

  if (Store.isLoading) {
    return (<div>Загрузка...</div>)
  }

  if (!Store.isAuth) {
    return (<LoginForm />)
  }

  return (
    <Main user = {Store.user}/>
  );
}

export default observer(App);
