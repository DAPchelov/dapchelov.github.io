import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, } from "react-router-dom";
import './App.css';
import Autorization from './Autorization/Autorization';
import CardArea from './CardArea/CardArea';
import UserPanel from './UserPanel/UserPanel';

function App() {
  const [userLogin, setUserLogin] = useState<string>();
  const [autorized, setAutorized] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <div className='Logo' />
          <UserPanel userLogin={userLogin} setAutorized={setAutorized} setUserLogin={setUserLogin} />
        </header>
        <div className='Content'>
          <Routes>
            <Route path="/" element={<Autorization setUserLogin={setUserLogin} setAutorized={setAutorized} />} />
            <Route path="/posts" element={<CardArea userLogin={userLogin} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
