import React, { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import { useIpAddress } from "../../hooks/useIpAddress";
import "./map.css";

function ChangeView({ center }) {
  const map = useMap();

  useEffect(
    function () {
      map.setView(center, map.getZoom());
    },
    [center, map],
  );

  return null;
}

const initialPosition = [27.3314, 88.6138];
const iconUrl = "https://img.icons8.com/?size=100&id=oLwbPmqGqUeT&format=png&color=000000";
const emojiIcon = new Icon({
  iconUrl,
  iconSize: [42, 42],
});

function Map() {
  const [mapPosition, setMapPosition] = useState(initialPosition);
  const [markerPosition, setMarkerPosition] = useState(initialPosition);

  const {
    data: { lat, lng, location },
  } = useIpAddress();

  useEffect(
    function () {
      if (!lat || !lng) return;

      setMapPosition([lat, lng]);
      setMarkerPosition([lat, lng]);
    },
    [lat, lng],
  );

  return (
    <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} id="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={markerPosition} />
      <Marker position={markerPosition} icon={emojiIcon}>
        <Popup>{location || "-"}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
