import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react';
import LoginForm from './components/loginForm/LoginForm';
import Main from './components/Main';
import { Context } from '../src/index'


const App: FC = () => {
  const store = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
      store.receiveTodos();
    }
  }, [])

  if (store.getIsLoading()) {
    return (<div>Загрузка...</div>)
  }

  if (!store.getIsAuth()) {
    return (<LoginForm />)
  }

  if (store.getIsTodosLoading()) {
    return (<div>Задачи загружаются...</div>);
  }

  return (
    <Main />
  );
}

export default observer(App);
