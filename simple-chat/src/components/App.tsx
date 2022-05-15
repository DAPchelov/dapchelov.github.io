import '../styles/App.css';
import React from 'react';
import { Header } from './Header';
import { BodyFrame } from './BodyFrame';

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <Header />
      <BodyFrame />
    </div>
  );
}

export default App;
