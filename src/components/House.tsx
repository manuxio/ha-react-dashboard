import * as React from "react";
import { useCallback, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import RoomCard from "./RoomCard";
import { useSelector } from "react-redux";

// import MenuIcon from "@mui/icons-material/Menu";
export default function House() {
  const areas = useSelector((state) => state.smarthome?.areas);
  const config = useSelector((state) => state.smarthome?.config);
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      spacing={0}
    >
      <AppBar position="fixed" color="amber" enableColorOnDark>
        <Toolbar variant="dense">
          <IconButton
            disableRipple
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              // navigate("/");
            }}
          >
            <Typography variant="h4" component="div">
              <HomeIcon fontSize="inherit" style={{ fontSize: "72px" }} />
            </Typography>
          </IconButton>
          <Typography variant="h3" component="div">
            {config?.location_name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ height: "98px" }} />
      <Box sx={{ flexGrow: 1, m: 3, mt: 4 }}>
        <Grid container spacing={3}>
          {areas && areas.length > 0
            ? areas
                .filter((a) => a.area_id !== "system")
                .map((area) => {
                  return <RoomCard key={area.area_id} area={area} />;
                })
            : null}
        </Grid>
      </Box>
    </Stack>
  );
}
