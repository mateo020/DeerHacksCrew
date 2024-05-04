import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import overpassResult from "@/test/overpassResult.json";

const elements = overpassResult.elements;

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

const position: L.LatLngExpression | undefined = [51.505, -0.09];

function Map() {
    return (
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "500px", marginRight: "2rem" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {elements.map((element) => {
                if (element.lat && element.lon && element.tags) {
                    return (
                        <Marker position={[element.lat, element.lon]} key={element.id}>
                            <Popup>
                                {element.tags?.name} <br /> {element.tags?.leisure}.
                            </Popup>
                        </Marker>
                    );
                }
            })}
        </MapContainer>
    );
}

export default Map;
