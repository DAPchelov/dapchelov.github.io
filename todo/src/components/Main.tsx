import { App } from "./App";
import LoginPage from "./loginPage/LoginPage";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useState } from "react";


const Main: React.FC = () => {
    const [UUID, setUUID] = useState('');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export { Main };
