import {IconComp, IconSvg} from "../../components/icon/IconComp";
import "./GameRoute.css";
import {useNavigate} from "react-router-dom";
import {HomeRoutePath} from "../home/HomeRoute";

export const GameRoutePath = "/game/:id"

export function GameRoute() {

    const navigate = useNavigate();
    const onBackClick = () => {
        navigate(HomeRoutePath);
    }

    return (
        <div className={"game"}>
            <div className="map"></div>
            <div className="ui">
                <div className={"top"}>
                    <button className="dark squared scale-anim" onClick={onBackClick}>
                        <IconComp iconSvg={IconSvg.BACK}></IconComp>
                    </button>

                    <div className="info">
                        {/* Score */}
                        <button className="dark">

                            <p>3656p</p>
                        </button>
                    </div>
                </div>

                <div className="bottom">
                    <div className="options"></div>
                    <div className="guess">
                        <div className="mini-map"></div>
                        <button disabled={true} className="dark scale-anim">
                            <p>Confirm</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}