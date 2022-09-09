import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';


const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
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
        {users.map(user => <div key={user.email}>{user.email}</div>)}
      </div>
    </div>

  );
}

export default observer(App);
