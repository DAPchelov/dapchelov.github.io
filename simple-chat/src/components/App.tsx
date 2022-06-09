import '../styles/App.css';
import React from 'react';
import { Header } from './Header';
import { BodyFrame } from './BodyFrame';
import {Link} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <Header />
      <BodyFrame />
      <Link to={"/LoginPage/"}>Login!</Link>
    </div>
  );
}

export default App;
