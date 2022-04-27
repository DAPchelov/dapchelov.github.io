import ReactDOM from 'react-dom';
import { App } from './components/App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PostPage } from "./components/PostPage";
import { NewPostPage } from "./components/NewPostPage";
import { Provider } from 'react-redux';
import { store } from './store';

const container = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <Routes>
            <Route path={"/*"} element={<App />} />
            <Route path={"/post/:postId"} element={<PostPage />} />
            <Route path={"/newPostPage"} element={<NewPostPage />} />
        </Routes>
    </BrowserRouter>
    </Provider>
    
    , container);

// yarn
// yarn starty