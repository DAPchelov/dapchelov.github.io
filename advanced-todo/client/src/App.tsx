import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/loginForm/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';


const App: FC = () => {
  const { store } = useContext(Context);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
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

  if (store.isLoading) {
    return (<div>Загрузка...</div>)
  }

  if (!store.isAuth) {
    return (<LoginForm />)
  }

  return (
    <div>
      <h2>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Авторизуйтесь!'}</h2>
      <h2>{store.user.isActivated ? 'Аккаунт подтверждён' : 'Подтвердите аккаунт'}</h2>
      <button onClick={() => store.logout()}>Logout</button>
      <button onClick={() => getUsers()}>Get Users</button>
      <div>
        {user && <div>{user.todos[0].message}</div>}
      </div>
    </div>

  );
}

export default observer(App);
