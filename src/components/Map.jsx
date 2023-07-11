import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import React, { useState, useMemo, useRef } from "react";

const libraries = ["places"];

const Map = ({ onMapClick }) => {
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyClytQp1USp5keyCvaSk_V4h7vcThzE3UU",
    libraries: libraries,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 41.8719,
    lng: 12.4774,
  });
  const center = useMemo(() => ({ lat: 41.8719, lng: 12.4774 }), []);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    onMapClick(lat, lng);
    setMarkerPosition({ lat, lng });
  };

  const handlePlaceSelect = () => {
    const selectedPlace = autocompleteRef.current.getPlace();
    if (selectedPlace && selectedPlace.geometry) {
      const { lat, lng } = selectedPlace.geometry.location;
      const address = selectedPlace.formatted_address;
      setSelectedLocation({ lat: lat(), lng: lng(), address });
      handleMapClick({ latLng: { lat: lat, lng: lng } });
      console.log("Selected Place:", address, lat(), lng());
      mapRef.current.panTo({ lat: lat(), lng: lng() });
      setMarkerPosition({ lat: lat(), lng: lng() });
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <GoogleMap
      zoom={10}
      mapContainerStyle={{ width: "100%", height: "40vh" }}
      center={center}
      onClick={handleMapClick}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      <Marker position={markerPosition} />
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceSelect}
      >
        <input
          type="text"
          placeholder="Search for a place"
          className="map__search"
        />
      </Autocomplete>
    </GoogleMap>
  );
};
export default Map;
