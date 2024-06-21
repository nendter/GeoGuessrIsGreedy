import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomeRoute, HomeRoutePath} from "./routes/home/HomeRoute";
import {GameRoute, GameRoutePath} from "./routes/game/GameRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={HomeRoutePath} element={<HomeRoute/>}></Route>
                <Route path={GameRoutePath} element={<GameRoute/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
