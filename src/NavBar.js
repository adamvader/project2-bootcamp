import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500, position: "sticky", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          label="News Feed"
          value="newsfeed"
          icon={<NewspaperIcon />}
        />
        <BottomNavigationAction label="Search" icon={<LocationOnIcon />} />
        <BottomNavigationAction
          component={Link}
          to="/upload"
          label="Uploads"
          value="upload"
          icon={<FileUploadIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default NavBar;
