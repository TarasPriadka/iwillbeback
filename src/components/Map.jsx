import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {RiMapPinUserFill} from "react-icons/all";
import {Button} from "react-bootstrap";
import {useRecoilValue} from "recoil";
import { socketAtom } from "../atoms";

function updateLocation(curLat, curLng) {
    navigator.geolocation.getCurrentPosition((position) => {
        curLat = position.coords.latitude;
        curLng = position.coords.longitude;
    });
}

function SimpleMap(props) {

    let defaultProps = {
        center: {
            lat: 37.8778072,
            lng: -122.2672373
        },
        zoom: 14
    };

    // setCurLat(curLat + 0.001);
    // setCurLng(curLng + 0.001);
    let [curLat, setCurLat] = useState(defaultProps.center.lat);
    let [curLng, setCurLng] = useState(defaultProps.center.lng);
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

    return <div style={{height: '100vh', width: '100%'}}>

        <GoogleMapReact
            bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_API}}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >

            {/*<RiMapPinUserFill*/}
            {/*    lat={curLat}*/}
            {/*    lng={curLng}*/}
            {/*    size={"30px"}*/}
            {/*/>*/}

        </GoogleMapReact>
    </div>;

}

export default SimpleMap;
