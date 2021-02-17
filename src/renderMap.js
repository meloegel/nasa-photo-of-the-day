import 'mapbox-gl/dist/mapbox-gl.css';
import { MenuOutlined } from '@ant-design/icons';
import useKeypress from '../utils/KeyPress';
import parkPin from '../pin.png';
import React, { useState, useRef, useContext } from 'react';
import ReactMapGL, { FullscreenControl, NavigationControl, Source, Layer } from 'react-map-gl';
import NPContext from '../state/npContext';
import ParkCard from './ParkCard';


let maxBounds = {
    minLatitude: -70,
    minLongitude: -180,
    maxLatitude: 75,
    maxLongitude: 91,
};

const RenderMap = () => {
    const { parkData, detailsData, setDetailsData } = useContext(NPContext);
    console.log(parkData)
    const [fullscreen, setFullscreen] = useState(false);

    const [viewport, setViewport] = useState({
        latitude: -1.9444,
        longitude: 30.0616,
        zoom: 3.1,
        bearing: 0,
        pitch: 0,
    });
    const mapRef = useRef();


    let geojson = {
        type: 'FeatureCollection',
        features: [],
    };
    let featureCollection = [];

    geojson.features = featureCollection;

    const handleViewportChange = viewport => {
        if (viewport.longitude < maxBounds.minLongitude) {
            viewport.longitude = maxBounds.minLongitude;
        } else if (viewport.longitude > maxBounds.maxLongitude) {
            viewport.longitude = maxBounds.maxLongitude;
        } else if (viewport.latitude < maxBounds.minLatitude) {
            viewport.latitude = maxBounds.minLatitude;
        } else if (viewport.latitude > maxBounds.maxLatitude) {
            viewport.latitude = maxBounds.maxLatitude;
        }
        setViewport(viewport);
    };


    let screenHeight = '90vh';
    let screenWidth = '90%';
    let disappear = '';
    if (window.innerWidth < 600) {
        screenHeight = '70vh';
        screenWidth = '100%';
        disappear = 'hidden';
    }



    return (
        <div className="mapbox-react">
            <ReactMapGL
                id="map"
                className="map"
                ref={mapRef}
                {...viewport}
                width={screenWidth}
                height={screenHeight}
                mapStyle="mapbox://styles/meloegel/ckfzuryk61c5z19o8pzd6o5fe"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                interactiveLayerIds={['data']}
                maxZoom={40}
                minZoom={1}
                onLoad={() => {
                    if (!mapRef) return;
                    const map = mapRef.current.getMap();
                    map.loadImage(parkPin, (error, image) => {
                        if (error) return;
                        map.addImage('myPin', image);
                    });
                }}
            >
                <Source id="my-data" type="geojson" data={geojson}>
                    <Layer
                        id="data"
                        type="symbol"
                        layout={{ 'icon-image': 'myPin', 'icon-size': 0.75 }}
                    />
                </Source>

            </ReactMapGL>
        </div>
    );
};

export default RenderMap;
