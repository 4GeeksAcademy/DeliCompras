import React, { useContext, useEffect } from "react";
import GoogleMaps from "simple-react-google-maps";
import { Context } from "../store/appContext";

export const Map = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    console.log("Mapa actualizado:", store.lat, store.lng);
  }, [store.lat, store.lng]);

  return (
    <GoogleMaps
      apiKey={"AIzaSyCj5o1FRwG7gBoDGpjpRddscMfNZ6Z0_cI"}
      style={{ height: "400px", width: "400px" }}
      zoom={10}
      center={{
        lat: store.lat,
        lng: store.lng
      }}
      markers={{
        lat: store.lat,
        lng: store.lng
      }}
    />
  );
};