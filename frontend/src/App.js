import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomeRoute, HomeRoutePath} from "./routes/home/HomeRoute";
import {GameRoute, GameRoutePath} from "./routes/game/GameRoute";
import {MapsContextProvider} from "./contexts/MapsContext";

function App() {
    return (
        <MapsContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={HomeRoutePath} element={<HomeRoute/>}></Route>
                    <Route path={GameRoutePath} element={<GameRoute/>}></Route>
                </Routes>
            </BrowserRouter>
        </MapsContextProvider>
    );
}

export default App;
