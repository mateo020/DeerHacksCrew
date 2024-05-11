import { MapContainer, TileLayer, Popup, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import overpassResult from "@/test/overpassResult.json";

const elements = overpassResult.elements;

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;
L.polyline([
    [43.6494412, -79.4157697],
    [43.6494438, -79.4154777],
    [43.6492594, -79.4153273],
    [43.6491403, -79.4151521],
    [43.6490737, -79.4148707],
    [43.6489713, -79.4142708],
    [43.6489099, -79.414016],
    [43.6488125, -79.4138302],
    [43.6486653, -79.4137098],
    [43.6484015, -79.4136939],
    [43.6482722, -79.4136886]
], { color: 'red' })

interface MapProps {
    locations: string;  // Properly define the structure of objects within the locations array
}

const Map: React.FC<MapProps> = ({ locations }) => {
    let elements: any[] = [];
    let ways: (L.LatLngExpression[] | undefined)[] = []; // map through this to plot Polyline components
    // let latlon_el: [number, number][];
    // Parse the locations JSON string and assign elements if possible
    const overpassResponse = JSON.parse(locations);
    // const overpassResponse = overpassResult; // from the json test file

    if (overpassResponse && overpassResponse.elements) {

        elements = overpassResponse.elements;
        ways = elements.map((element) => {
            if (element.type === "way") {
                let nodes = element.nodes;
                let latlon_el: [number, number][] = nodes.map((nodeId: number) => {
                    let polyPoint = elements.find(node => node.id === nodeId);
                    return [polyPoint.lat, polyPoint.lon]
                })
                return latlon_el

            }

        }).filter((latlon: any) => latlon !== null);

    }

    const position: L.LatLngExpression = [51.505, -0.09];  // Default map center position

    return (
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {ways.map((way, index) => {
                if (way) {
                    return <Polyline positions={way} key={index} color='red'/>
                }
            })}

            {elements.map((element: any) => (
                element.lat && element.lon && element.tags ? (
                    <Marker position={[element.lat, element.lon]} key={element.id}>
                        <Popup>
                            {element.tags.name || 'Unknown'}<br />
                            {element.tags.leisure}<br />
                            {element.tags.brand}<br />
                            {element.tags.addrs}<br />
                            {element.tags.website}<br />
                            {element.tags['addr:housenumber']}<br />
                            {element.tags['addr:street']}<br />
                        </Popup>
                    </Marker>
                ) : null
            ))}
        </MapContainer>
    );
}



// export default Map;




// import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
// import L from 'leaflet';

// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// let DefaultIcon = L.icon({
//     iconUrl: icon.src,
//     shadowUrl: iconShadow.src
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// const position: L.LatLngExpression | undefined = [51.505, -0.09]


export default Map;
