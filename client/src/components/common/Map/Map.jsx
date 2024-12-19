import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

// Custom component to recenter the map
const RecenterButton = ({ position }) => {
  const map = useMap();
  const handleRecenter = () => {
    map.setView(position, 100); // Recenter with zoom (100)
  };

  return <button  className={"recenter-btn"}onClick={handleRecenter}>Recenter</button>;
};

const Map = () => {
  const markerPosition = [4.936444, 6.283222]; // St. Matthias Catholic Church, Nigeria

  return (
    <MapContainer
      center={markerPosition}
      zoom={100}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        url="http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
        attribution="Map data © Google"
      />
      <Marker position={markerPosition}>
        <Popup>St. Matthias Church</Popup>
      </Marker>
      <RecenterButton position={markerPosition} />
    </MapContainer>
  );
};

export default Map;
