// ES6
import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoibWVsb2VnZWwiLCJhIjoiY2tmeTlnajk4MjE1bzJybXRteWViNG50dyJ9.7b-SixhDRqwlTeo0srmJ4A'
});
function IssMap() {
    return (
        <div>
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: '80vh',
                    width: '80vw',
                    margin: '4rem auto',
                    zoom: 0
                }}
                onLoad={() => {
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
                                Map.getSource('drone').setData(json);
                                // fly the map to the drone's current location
                                Map.flyTo({
                                    center: json.iss_position,
                                    speed: 0.5
                                });
                            }
                        };
                        request.send();
                    }, 2000);
                    Map.addSource('drone', { type: 'geojson', data: url });
                    Map.addLayer({
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
            </Map>;
        </div>
    )
}

export default IssMap;