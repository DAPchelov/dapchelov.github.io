import ReactDOM from 'react-dom';
import {App} from './components/App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PostPage} from "./components/PostPage";
import {NewPostPage} from "./components/NewPostPage";

const container = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path={"/*"} element={<App/>}/>
            <Route path={"/post/:postId"} element={<PostPage/>}/>
            <Route path={"/newPostPage"} element={<NewPostPage/>}/>
        </Routes>
    </BrowserRouter>
    , container);

// yarn
// yarn starty