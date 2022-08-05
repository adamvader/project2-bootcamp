import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const UserRating = () => {
  const [value, setValue] = useState(1);
  const [locatRate, setLocatRate] =
    useState[
      {
        place: "",
        rate: [{ value }],
      }
    ];

  const handleChange = (event) => {
    setValue(event.target.value);
    setLocatRate({ [event.target.name]: event.target.value });
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">Rating</Typography>
      <Rating
        //name="simple-controlled"
        value={value}
        /*         name={} */
        onChange={handleChange}
        /* onChange={(event, newValue) => {
          setValue(newValue);  
        }}*/
      />
    </Box>
  );
};

export default UserRating;
