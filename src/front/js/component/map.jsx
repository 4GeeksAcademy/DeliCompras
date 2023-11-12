import React from "react";
import GoogleMaps from "simple-react-google-maps";

export const Map = () => {
    
    return(
        <GoogleMaps
            apiKey={"AIzaSyD5impZrms-FXvjdkg7eug6yH4W-1deZC0"} 
            style={{heigth:"400px",width:"400px"}}
            zoom={10}
            center={{lat: -34.397, lng: 150.644}}
            markers={{lat: -34.397, lng: 150.644}}
        />
    )
}