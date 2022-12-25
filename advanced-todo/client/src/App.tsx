import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/loginForm/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import Store from './store/store';


const App: FC = () => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      Store.checkAuth()
    }
  }, [])

  const getUsers = async() => {
    try {
      const response = await UserService.fetchUser();
      setUser(response.data);
    } catch (e: any) {
      console.log(e);
    }
  }

  if (Store.isLoading) {
    return (<div>Загрузка...</div>)
  }

  if (!Store.isAuth) {
    return (<LoginForm />)
  }

  return (
    <div>
      <h2>{Store.isAuth ? `Пользователь авторизован ${Store.user.email}` : 'Авторизуйтесь!'}</h2>
      <h2>{Store.user.isActivated ? 'Аккаунт подтверждён' : 'Подтвердите аккаунт'}</h2>
      <button onClick={() => Store.logout()}>Logout</button>
      <button onClick={() => getUsers()}>Get Users</button>
      <div>
        {user && <div>{user.todos[0].message}</div>}
      </div>
    </div>

  );
}

export default observer(App);
