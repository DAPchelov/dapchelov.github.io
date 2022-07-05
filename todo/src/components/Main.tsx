import { App } from "./App";
import LoginPage from "./loginPage/LoginPage";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";


const Main: React.FC = () => {
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
