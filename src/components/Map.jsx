import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {RiMapPinUserFill} from "react-icons/all";
import {Button} from "react-bootstrap";

function SimpleMap() {

    let defaultProps = {
        center: {
            lat: 37.8778072,
            lng: -122.2672373
        },
        zoom: 14
    };

    // setCurLat(curLat + 0.001);
    // setCurLng(curLng + 0.001);
    //
    let [curLat, setCurLat] = useState(defaultProps.center.lat);
    let [curLng, setCurLng] = useState(defaultProps.center.lng);


    return <div style={{height: '100vh', width: '100%'}}>

        <GoogleMapReact
            bootstrapURLKeys={{key: "AIzaSyAf8lOae3cOw78dgDZs5el_1sxSyDN1Mfc"}}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            <RiMapPinUserFill
                lat={curLat}
                lng={curLng}
                size={"30px"}
            />

        </GoogleMapReact>
    </div>;

}

export default SimpleMap;