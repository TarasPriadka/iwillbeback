import React from 'react';
import {BsDot, RiMapPinUserFill} from "react-icons/all";
import {useRecoilValue} from "recoil";
import {curLocAtom} from "../atoms";
import GoogleMapReact from "google-map-react";

const Marker = ({text}) => <RiMapPinUserFill size="30px" color={"red"}/>;
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

    let curLoc = useRecoilValue(curLocAtom);

    return <div style={{height: '100vh', width: '100%'}}>
        {curLoc != null ?
            < GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_API}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <Marker
                    lat={curLoc.lat}
                    lng={curLoc.lng}
                    text={""}
                />
            </GoogleMapReact> : < GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_API}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            />
        }
    </div>;

}

export default TrusteeMap;