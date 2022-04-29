import React from 'react';
import './styles/App.css';
import { Likes } from './likes';
import { Title } from './Title';

function App() {
    return (
        <div className='App'>
            <div className='wrap'>
                <div className='card'>
                    <div className='card-image'>
                        <img className='posterImage' src='./Barsik.jpg' alt='Barsik' />
                        <Title />
                        <Likes />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
