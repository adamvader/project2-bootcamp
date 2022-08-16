import React, { useState } from "react";
import axios from "axios";
import App from "./App";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const LocPage = () => {
  const [locName, setLocName] = useState("");
  const [locAddress, setLocAddress] = useState("");
  const [locPlaceID, setlocPlaceID] = useState("ChIJ19jnhG092jERM2RkbG9U5aw");
  const [locPic, setLocPic] = useState("");

  const handleLoadSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${locPlaceID}&fields=name%2Cformatted_address%2Cformatted_phone_number%2Cphotos&key=${GOOGLE_MAPS_API_KEY}`
      )
      .then((response) => {
        //(response) => response.data[0]
        const { data: placeInfo } = response;
        console.log(placeInfo);
        console.log(placeInfo.data);
        console.log(placeInfo.result.photos[0]);
        setLocName(placeInfo.result.name);
        setLocAddress(placeInfo.result.formatted_address);
        const photoReference = placeInfo.result.photos[0].photo_reference;
        setLocPic(
          `https://maps.googleapis.com/maps/api/place/photo
  ?maxwidth=400
  &photo_reference=${photoReference}
  &key=${GOOGLE_MAPS_API_KEY}`
        );
      });
  };

  return (
    <div className="locationPage">
      <div>
        <div>
          <form>
            <input type="button" onClick={handleLoadSubmit} value="search" />
          </form>
          <p>{locName}</p>
          <p>{locAddress}</p>
          <p>{locPic}</p>
        </div>
      </div>
    </div>
  );
};

//to link API based on place_id
//API pull of photos
//check if location ID are the same on the data base and the search
//complying of ratings for each location based on location name
// if location id is not available in the database, rating potion = no ratings yet
export default LocPage;
