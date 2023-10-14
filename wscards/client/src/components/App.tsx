import { observer } from 'mobx-react-lite';
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import WSConnection from '../store/WSConnection';

import LoginForm from './loginForm/LoginForm';
import Main from './Main';

const store = new WSConnection;
const Context = createContext(store);

const App: React.FC = () => {

    return (
        <Context.Provider value={store}>
            <Router>
                {(store.getIsAuth()) ? <Main /> : <LoginForm/>}
            </Router>
        </Context.Provider>
    );
};

export default observer(App);
export { Context }