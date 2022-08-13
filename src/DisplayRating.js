import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const DisplayRating = (props) => {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">Rating</Typography>
      <Rating name="simple-controlled" value={props.data} />
    </Box>
  );
};

export default DisplayRating;
