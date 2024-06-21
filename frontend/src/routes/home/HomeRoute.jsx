import "./HomeRoute.css";
import {useNavigate} from "react-router-dom";
import {GameRoutePath} from "../game/GameRoute";

export const HomeRoutePath = "/";

export function HomeRoute() {

    const navigate = useNavigate();
    const onClickPlay = () => {
        // TODO: Request a new game, to get a id
        const id = "test";
        navigate(GameRoutePath.replace(":id", id))
    }

    return (
        <div className={"home"}>
            <div className="ui">
                <div className="play">
                    <button className="primary scale-anim" onClick={onClickPlay}>
                        <p>Play</p>
                    </button>
                </div>
            </div>
        </div>
    )
}