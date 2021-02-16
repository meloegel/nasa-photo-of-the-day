// ES6
import React, { useState, useRef } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


// const Map = ReactMapGL({
//     accessToken:
//         ''
// });
const IssMap = () => {

    const [viewport, setViewport] = useState({
        latitude: 42.515714,
        longitude: -83.107077,
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

    return (
        <div>
            <ReactMapGL
                // style="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken='pk.eyJ1IjoibWVsb2VnZWwiLCJhIjoiY2tmeTlnajk4MjE1bzJybXRteWViNG50dyJ9.7b-SixhDRqwlTeo0srmJ4A'
                ref={mapRef}
                {...viewport}
                containerStyle={{
                    height: '80vh',
                    width: '80vw',
                    margin: '4rem auto',
                    zoom: 0
                }}
                onLoad={() => {
                    if (!mapRef) return;
                    const map = mapRef.current.getMap();
                    var url = 'http://api.open-notify.org/iss-now.json';
                    var request = new XMLHttpRequest();
                    window.setInterval(function () {
                        // make a GET request to parse the GeoJSON at the url
                        request.open('GET', url, true);
                        request.onload = function () {
                            if (this.status >= 200 && this.status < 400) {
                                // retrieve the JSON from the response
                                var json = JSON.parse(this.response);

                                // update the drone symbol's location on the map
                                map.getSource('drone').setData(json);
                                console.log([json.iss_position.longitude, json.iss_position.latitude])
                                // fly the map to the drone's current location
                                map.flyTo({
                                    center: [json.iss_position.longitude, json.iss_position.latitude],
                                    speed: 0.5
                                });
                            }
                        };
                        request.send();
                    }, 2000);
                    map.addSource('drone', { type: 'geojson', data: { geojson } });
                    map.addLayer({
                        'id': 'drone',
                        'type': 'symbol',
                        'source': 'drone',
                        'layout': {
                            'icon-image': 'rocket-15'
                        }
                    });
                }}

            >
                {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                    <Feature coordinates={[42.515714, -83.107077]} />
                </Layer> */}
            </ReactMapGL>;
        </div>
    )
}

export default IssMap;