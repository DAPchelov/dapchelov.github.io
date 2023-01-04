import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';

// interface State {
//   store: Store
// }

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

const store = new Store();
export const Context = createContext(store);

// export const Context = createContext < State > ({
//   store,
// })

root.render(
  <React.StrictMode>
    <Context.Provider value={ store }>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
