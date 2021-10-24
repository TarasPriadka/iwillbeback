import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {sessionIdAtom, socketAtom} from "../atoms";
import {BsDot, RiMapPinUserFill} from "react-icons/all";

import {useRecoilValue} from "recoil";

const Marker = ({text}) => <RiMapPinUserFill size={"40px"} color={"red"}>{text}</RiMapPinUserFill>;
const PreviousMarker = ({text}) => <BsDot size={"30px"} color={"red"}>{text}</BsDot>;

async function updateLocation(setCurLat, setCurLng) {
    navigator.geolocation.getCurrentPosition((position) => {
        setCurLat(position.coords.latitude);
        setCurLng(position.coords.longitude);
    });
}

function SimpleMap() {

    const DEFAULT_LAT = 37.8778072;
    const DEFAULT_LNG = -122.2672373;

    let defaultProps = {
        center: {
            lat: DEFAULT_LAT,
            lng: DEFAULT_LNG,
        },
        zoom: 14
    };

    let [curLat, setCurLat] = useState(defaultProps.center.lat);
    let [curLng, setCurLng] = useState(defaultProps.center.lng);

    let sessionId = useRecoilValue(sessionIdAtom);
    const socket = useRecoilValue(socketAtom)

    if (socket) {
        const interval = setInterval(async function () {
            await updateLocation(setCurLat, setCurLng)
            console.log(curLat, curLng)
            socket.emit("update location", {"newLat": curLat, "newLng": curLng})
        })
    }
    console.log(`socket: ${socket}`);

    const sessionid = useRecoilValue(sessionIdAtom)

    return <div style={{height: sessionId !== "" ? '93.5vh' : '100vh', width: '100%'}}>

        <GoogleMapReact
            bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_API}}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >

            <Marker
                lat={defaultProps.center.lat}
                lng={defaultProps.center.lng}
                text="My Marker"
            />

            {sessionId !== "" ? <>

            </> : <></>
            }

        </GoogleMapReact>
    </div>;

}

export default SimpleMap;
