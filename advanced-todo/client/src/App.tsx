import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react';
import LoginForm from './components/loginForm/LoginForm';
import Main from './components/Main';
import { Context } from '../src/index'


const App: FC = () => {
  // const [user, setUser] = useState<IUser>();
  const store = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
      store.receiveTodos();
    }
  }, [] )

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
