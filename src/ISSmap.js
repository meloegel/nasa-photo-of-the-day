import React, { useState, useRef } from 'react';
import ReactMapGL, { Layer, Source, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import boringPin from './styles/imgs/pin.png'
import ISS from './styles/imgs/iss.gif'

let maxBounds = {
    minLatitude: -70,
    minLongitude: -180,
    maxLatitude: 75,
    maxLongitude: 91,
};

const IssMap = () => {

    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 2,
        bearing: 0,
        pitch: 0,
    });
    const mapRef = useRef();

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

    return (
        <div>
            <ReactMapGL
                // style="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken='pk.eyJ1IjoibWVsb2VnZWwiLCJhIjoiY2tmeTlnajk4MjE1bzJybXRteWViNG50dyJ9.7b-SixhDRqwlTeo0srmJ4A'
                ref={mapRef}
                {...viewport}
                width={screenWidth}
                // onViewportChange={handleViewportChange}
                style={{ margin: '0 auto' }}
                height={screenHeight}
                mapStyle="mapbox://styles/meloegel/ckfzuryk61c5z19o8pzd6o5fe"
                onLoad={() => {
                    if (!mapRef) return;
                    const map = mapRef.current.getMap();
                    map.loadImage(boringPin, (error, image) => {
                        if (error) console.log(error);
                        map.addImage('myPin', image);

                        var url = 'http://api.open-notify.org/iss-now.json';
                        var request = new XMLHttpRequest();
                        window.setInterval(function () {
                            // make a GET request to parse the GeoJSON at the url
                            request.open('GET', url, true);
                            request.onload = function () {
                                if (this.status >= 200 && this.status < 400) {
                                    // retrieve the JSON from the response
                                    var json = JSON.parse(this.response);

                                    // // update the drone symbol's location on the map
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
                                    // console.log('geo', geojson)
                                    console.log([json.iss_position.longitude, json.iss_position.latitude])
                                    console.log('FeatureC', featureCollection)
                                    // fly the map to the drone's current location
                                    map.flyTo({
                                        center: [json.iss_position.longitude, json.iss_position.latitude],
                                        speed: .7,
                                        zoom: 3.5,
                                    });
                                }
                            };
                            request.send();
                        }, 2000);
                    });
                }}
            >
                <Marker longitude={Lon} latitude={Lat} ><img src={ISS} alt='issMarker' /></Marker>
                <Source id="drone" type="geojson" data={geojson}>
                    <Layer
                        id="data"
                        type="symbol"
                        layout={{ 'icon-image': 'myPin', 'icon-size': 0.75 }}
                    >

                    </Layer>
                </Source>
            </ReactMapGL>;
        </div>
    )
}

export default IssMap;