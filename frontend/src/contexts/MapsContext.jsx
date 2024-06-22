import {createContext, useEffect, useRef, useState} from "react";
import {Loader} from "@googlemaps/js-api-loader";
import {EnvironmentVariable} from "../misc/EnvironmentVariables";

export const MapsContext = createContext(undefined);

export function MapsContextProvider({children}) {
    const [loaded, setLoaded] = useState(false);
    // Using a state directly doesn't work here, since React calls a function, if set as the value
    const gm = useRef(undefined);
    useEffect(() => {
        if (gm.current) {
            return;
        }
        loadMapObj().then();
    }, []);

    const loadMapObj = async () => {
        const loader = new Loader({
            apiKey: process.env[EnvironmentVariable.MAPS_API_KEY],
            version: "weekly",
        });
        gm.current = {}
        gm.current.maps = await loader.importLibrary("maps");
        gm.current.streetview = await loader.importLibrary("streetView");
        setLoaded(true);
    }

    return (
        <MapsContext.Provider value={{
            gm: gm,
            loaded: loaded
        }}>
            {children}
        </MapsContext.Provider>
    )
}