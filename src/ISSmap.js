import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useRef } from 'react';
import ReactMapGL, { Layer, Source, Marker } from 'react-map-gl';
import ISS from './styles/imgs/iss.gif'



const IssMap = () => {

    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 2,
        bearing: 0,
        pitch: 1,
    });
    const mapRef = useRef();

    const handleViewportChange = viewport => {
        setViewport(viewport)
    }

    let screenHeight = '60vh';
    let screenWidth = '60%';

    let geojson = {
        type: 'FeatureCollection',
        features: [],
    };
    let featureCollection = [];

    geojson.features = featureCollection;

    let Lat = 0
    let Lon = 0

    // mapStyle='mapbox://styles/mapbox/streets-v11'

    return (
        <div className='mapbox-react'>
            <ReactMapGL
                container='map'
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                ref={mapRef}
                {...viewport}
                width={screenWidth}
                onViewportChange={handleViewportChange}
                height={screenHeight}
                mapStyle="mapbox://styles/meloegel/ckfzuryk61c5z19o8pzd6o5fe"
                onLoad={() => {
                    if (!mapRef) return;
                    const map = mapRef.current.getMap();
                    map.resize();
                    var url = 'http://api.open-notify.org/iss-now.json';
                    var request = new XMLHttpRequest();
                    window.setInterval(function () {
                        request.open('GET', url, true);
                        request.onload = function () {
                            if (this.status >= 200 && this.status < 400) {
                                var json = JSON.parse(this.response);
                                map.getSource('drone').setData(json);
                                featureCollection = []
                                Lat = json.iss_position.latitude
                                Lon = json.iss_position.longitude
                                featureCollection.push({
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [json.iss_position.longitude, json.iss_position.latitude]
                                    }
                                })
                                map.flyTo({
                                    center: [json.iss_position.longitude, json.iss_position.latitude],
                                    speed: .7,
                                    zoom: 3,
                                });
                            }
                        };
                        request.send();
                    }, 2000);
                }}
            >
                <Source id="drone" type="geojson" data={geojson}>
                    <Marker longitude={Lon} latitude={Lat}><img src={ISS} alt='issMarker' /></Marker>
                    <Layer id="data" type="symbol" layout={{ 'icon-image': 'myPin', 'icon-size': 0.75 }} />
                </Source>
            </ReactMapGL>;
        </div>
    )
}

export default IssMap;