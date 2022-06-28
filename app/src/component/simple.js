import React,{Component} from "react";
import { useState, useEffect } from "react";
import { defaultMarker } from "./marker";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import axios from "axios";
import { map } from "leaflet";

const mapDataUrl = "http://localhost:3001/map"

const MapPin =({pin_location})=>{
  console.log("MapPin effect", pin_location)
  pin_location.map((val) => {console.log("MapPin effect", val)})
  return(
    <>
    {pin_location.map((val) => 

        <Marker position={val} key={val.lat.toString()} icon={defaultMarker} >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
    )}       
    </>
  )
}


export default function SimpleExample() {
      const [location, setLocation] = useState({lat:51.505,lng:-0.09});
      const [pin_location, setPin_location] = useState([
        { lat: 51.506, lng:-0.06 }
      ]);
      // ↑にダミーデータを入れないと、最初の読み込みでエラーになる。
      useEffect(()=>{
        const fetchData = async()=>{
          const res = await axios.get(mapDataUrl);
          console.log("res data is", res.data.location[0]);
          setPin_location(res.data.location);

        };
        fetchData();
      },[])

      // const position = [51.505, -0.09];
      
      return (
        <MapContainer center={location} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location} icon={defaultMarker} >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <MapPin pin_location={pin_location}></MapPin>
        </MapContainer>
      )
    
  }