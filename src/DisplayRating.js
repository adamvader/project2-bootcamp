import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const DisplayRating = (props) => {
  return (
    <Box display="flex" justifyContent="flex-start" sx={{ mt: -0.5, mb: 0.7 }}>
      {/* <Typography component="legend" color="text.secondary">
        Rating:
      </Typography> */}
      <Rating name="read-only" value={props.data} size="small" readOnly />
    </Box>
  );
};

export default DisplayRating;
