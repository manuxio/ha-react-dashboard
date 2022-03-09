import * as React from "react";
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
import MyCard from "./MyCard";
import { useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate, useMatch, useLocation } from "react-router-dom";
import lightUrl from "../images/light.jpg";
import sensorsUrl from "../images/sensors.png";
import switchUrl from "../images/switch.png";
import sceneUrl from "../images/scene.jpg";

// import MenuIcon from "@mui/icons-material/Menu";
export default function House() {
  const areas = useSelector((state) => state.smarthome?.areas);
  const config = useSelector((state) => state.smarthome?.config);
  const navigate = useNavigate();
  const match = useMatch("/:area_id");
  // console.log("MATCH", match);
  const area_id = match?.params?.area_id;
  const area = areas.filter((a) => a.area_id === area_id)[0];
  console.log("Area", area_id, area, areas);

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
              navigate("/");
            }}
          >
            <Typography variant="h4" component="div">
              <HomeIcon fontSize="inherit" style={{ fontSize: "72px" }} />
            </Typography>
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              onClick={() => {
                navigate("/");
              }}
            >
              <Typography variant="h3" component="div">
                {config?.location_name}
              </Typography>
            </Link>
            <Link underline="hover" color="text.primary" aria-current="page">
              <Typography variant="h3" component="div">
                {area?.name}
              </Typography>
            </Link>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ height: "98px" }} />
      <Box sx={{ flexGrow: 1, m: 3, mt: 4 }}>
        <Grid container spacing={3}>
          <MyCard
            title="Luci"
            url={`/${area?.area_id}/light`}
            image={lightUrl}
          />
          <MyCard
            title="Scenari"
            url={`/${area?.area_id}/scene`}
            image={sceneUrl}
          />
          <MyCard
            title="Interruttori"
            url={`/${area?.area_id}/switch`}
            image={switchUrl}
          />
          <MyCard
            title="Sensori"
            url={`/${area?.area_id}/sensor`}
            image={sensorsUrl}
          />
        </Grid>
      </Box>
    </Stack>
  );
}
