import "./HomeRoute.css";

export const HomeRoutePath = "";

export function HomeRoute() {
    return (
        <div className={"home"}>
            <div className="ui">
                <div className="play">
                    <button className="primary scale-anim">
                        <p>Play</p>
                    </button>
                </div>
            </div>
        </div>
    )
}