import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {BsDot, RiMapPinUserFill} from "react-icons/all";

const Marker = ({text}) => <RiMapPinUserFill size={"30px"} color={"red"}>{text}</RiMapPinUserFill>;
const PreviousMarker = ({text}) => <BsDot size={"30px"} color={"red"}>{text}</BsDot>;


function TrusteeMap(props) {

    const DEFAULT_LAT = 37.8778072;
    const DEFAULT_LNG = -122.2672373;

    let defaultProps = {
        center: {
            lat: DEFAULT_LAT,
            lng: DEFAULT_LNG,
        },
        zoom: 14
    };

    let [curLat, setCurLat] = useState(null);
    let [curLng, setCurLng] = useState(null);

    useEffect(() => {
        if (props.loc == null){
            setCurLat(null);
            setCurLng(null);
        }else{
        setCurLat(props.loc.lat);
        setCurLng(props.loc.lng);}
    }, []);

    return <div style={{height: '100vh', width: '100%'}}>

        <GoogleMapReact
            bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_API}}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            {curLng != null && curLat ?
                <Marker
                    lat={curLat}
                    lng={curLng}
                    text="My Marker"
                /> : <></>
            }



        </GoogleMapReact>
    </div>;

}

export default TrusteeMap;