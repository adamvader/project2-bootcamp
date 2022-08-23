import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const LocPage = () => {
  const [locName, setLocName] = useState("");
  const [locAddress, setLocAddress] = useState("");
  const [locPlaceID, setLocPlaceID] = useState("");
  const [locPic, setLocPic] = useState("");

  const updateInfo = (e) => {
    console.log(e);
    console.log(e.place_id);
    setLocPlaceID(e.place_id);
  };

  const handleLoadSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${locPlaceID}&fields=name%2Cformatted_address%2Cformatted_phone_number%2Cphotos&key=${GOOGLE_MAPS_API_KEY}`
      );
      const placeInfo = response.data;
      console.log(placeInfo);
      setLocName(placeInfo.result.name);
      setLocAddress(placeInfo.result.formatted_address);
      const photoReference = placeInfo.result.photos[0].photo_reference;
      setLocPic(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="locationPage">
      <div>
        <div>
          <SearchBar onUpdate={updateInfo} />
          <form>
            <input type="button" onClick={handleLoadSubmit} value="search" />
          </form>
          <div>
            <p>Name: {locName}</p>
            <p>Address: {locAddress}</p>
            {locPic && <img src={locPic} />}
          </div>
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
