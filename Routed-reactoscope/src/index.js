import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {RatingPage} from './components/ratingPage'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DetailsPage} from "./components/detailsPage";
import {GenresPage} from "./components/genresPage";
import {FindPage} from "./components/findPage"

ReactDOM.render(
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<RatingPage/>}/>
                <Route path="/genres/:genreId/:pageNum" element={<GenresPage/>}/>
                <Route path="/find/:query/:pageNum" element={<FindPage/>}/>
                <Route path="/film/:filmId" element={<DetailsPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>,

    document.getElementById('root'));
