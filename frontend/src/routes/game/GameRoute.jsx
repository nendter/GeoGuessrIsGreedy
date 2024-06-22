import {IconComp, IconSvg} from "../../components/icon/IconComp";
import "./GameRoute.css";
import {useNavigate} from "react-router-dom";
import {HomeRoutePath} from "../home/HomeRoute";
import {useContext, useEffect, useRef} from "react";
import {MapsContext} from "../../contexts/MapsContext";
import XMLParser from "react-xml-parser/xmlParser";

export const GameRoutePath = "/game/:id"

export function GameRoute() {

    const navigate = useNavigate();
    const onBackClick = () => {
        navigate(HomeRoutePath);
    }

    // Maps
    const streetViewMapRef = useRef();
    const streetViewMapIns = useRef();

    const miniMapRef = useRef();
    const miniMapIns = useRef();

    const mapsCtx = useContext(MapsContext);
    const loadStreetView = async () => {
        let position = undefined;
        let count = 0;
        while (position === undefined && count < 20) {
            position = await findRandomStreetViewLocation();
            count++;
        }
        if (position === undefined) {
            return;
        }

        streetViewMapIns.current = new mapsCtx.gm.current.streetview.StreetViewPanorama(streetViewMapRef.current, {
            position: position,
            zoom: 1,
            disableDefaultUI: true,
            showRoadLabels: false
        });

        miniMapIns.current = new mapsCtx.gm.current.maps.Map(miniMapRef.current, {
            center: {lat: 0, lng: 0},
            zoom: 3,
            disableDefaultUI: true
        });
        console.log(miniMapIns.current.addListener);
        miniMapIns.current.addListener("click", (e, f) => {
            console.log(e);
            console.log(f);
        });
        // miniMapIns.current.addListener('click', function (ev) {
        //     console.log(ev)
        // });
    }

    const makeGuess = (ev) => {
        console.log(ev)
    }

    // TODO: This should probably be put into the backend
    const findRandomStreetViewLocation = async () => {
        // Find random land coordinates from '3 Geo Names'
        const res = await fetch("http://localhost:8080/https://api.3geonames.org/?randomland=yes");
        const xml = await res.text();
        if (!xml) {
            return undefined;
        }
        const allNearest = new XMLParser().parseFromString(xml).getElementsByTagName("nearest");
        if (allNearest.length === 0) {
            return undefined;
        }
        const nearest = allNearest[0];
        const nearestLat = Number(nearest.getElementsByTagName("latt")[0].value);
        const nearestLng = Number(nearest.getElementsByTagName("longt")[0].value);

        let lat;
        let lng;

        const service = new mapsCtx.gm.current.streetview.StreetViewService();
        await service.getPanorama({
            location: {lat: nearestLat, lng: nearestLng},
            preference: mapsCtx.gm.current.streetview.StreetViewPreference.NEAREST,
            radius: 100000,
            sources: [mapsCtx.gm.current.streetview.StreetViewSource.GOOGLE]
        }, (data, status) => {
            if (status !== mapsCtx.gm.current.streetview.StreetViewStatus.OK) {
                return undefined;
            }
            const panoramaLocation = data.location.latLng;
            lat = panoramaLocation.lat();
            lng = panoramaLocation.lng();
        });

        if (lat === undefined || lng === undefined) {
            return undefined;
        }

        return {
            lat: lat,
            lng: lng
        }
    }

    useEffect(() => {
        if (!mapsCtx.loaded || !mapsCtx.gm.current || !streetViewMapRef.current) {
            return;
        }
        loadStreetView().then();
    }, [mapsCtx.loaded, streetViewMapRef]);

    return (
        <div className={"game"}>
            <div className="map" ref={streetViewMapRef}></div>
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
                        <div className="mini-map">
                            <div className="mini-map-target" ref={miniMapRef}></div>
                        </div>
                        <button disabled={true} className="dark scale-anim">
                            <p>Confirm</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
