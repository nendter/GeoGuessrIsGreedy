import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomeRoute, HomeRoutePath} from "./routes/home/HomeRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={HomeRoutePath} element={<HomeRoute/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
