import { observer } from 'mobx-react-lite';
import React, { createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import WSStore from '../store/WSStore';

import LoginForm from './loginForm/LoginForm';
import Main from './Main';

const store = new WSStore;
const Context = createContext(store);

const App: React.FC = () => {

    return (
        <Context.Provider value={store}>
            <Router>
                {(store.authController.isAuth) ? <Main /> : <LoginForm/>}
            </Router>
        </Context.Provider>
    );
};

export default observer(App);
export { Context }