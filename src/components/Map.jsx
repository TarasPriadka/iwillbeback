import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {socketAtom, prevLocationsAtom, sessionIdAtom} from "../atoms";
import {BsDot, RiMapPinUserFill} from "react-icons/all";

import {useRecoilValue} from "recoil";

const Marker = ({text}) => <RiMapPinUserFill size={"30px"} color={"red"}>{text}</RiMapPinUserFill>;
const PreviousMarker = ({text}) => <BsDot size={"30px"} color={"red"}>{text}</BsDot>;

function updateLocation(curLat, curLng) {
    navigator.geolocation.getCurrentPosition((position) => {
        curLat = position.coords.latitude;
        curLng = position.coords.longitude;
    });
}

function SimpleMap(props) {

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

    let prevLocations = useRecoilValue(prevLocationsAtom);
    let sessionId = useRecoilValue(sessionIdAtom);

    const socket = useRecoilValue(socketAtom)

    console.log(`socket: ${socket}`)

    if (socket) {
        const interval = setInterval(function() {
            console.log(curLat)
            console.log(curLng)
            updateLocation(curLat, curLng)
            socket.emit("update location", {"newLat" : curLat, "newLng" : curLng})
        }, 5000);
    }

    return <div style={{height: '93.5vh', width: '100%'}}>

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

            {prevLocations.map((locObj) => {
                return <PreviousMarker lat={locObj.lat} lng={locObj.lng} text="My Marker"/>
            })}

            {sessionId !== "" ? <>

            </> : <></>
            }

        </GoogleMapReact>
    </div>;

}

export default SimpleMap;