import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Entity from "./Entity";
import { useNavigate, useMatch } from "react-router-dom";
import { Key } from "react";

// import MenuIcon from "@mui/icons-material/Menu";
export default function Entities() {
  const areas = useSelector((state) => state.smarthome?.areas);
  const config = useSelector((state) => state.smarthome?.config);
  const entities = useSelector((state) => state.smarthome?.entities);
  const staticEntities = useSelector(
    (state) => state.smarthome?.staticentities
  );
  const navigate = useNavigate();
  const match = useMatch("/:area_id/:type");
  const area_id = match?.params?.area_id;
  const type = match?.params?.type;
  let typeName;
  switch (type) {
    case "light": {
      typeName = "Luci";
      break;
    }
    case "scene": {
      typeName = "Scenari";
      break;
    }

    case "switch": {
      typeName = "Interruttori";
      break;
    }
  }
  const area = areas?.filter((a) => a.area_id === area_id)[0];
  // console.log("staticEntities", staticEntities, area);
  const entityIds = area
    ? (staticEntities || [])
        .filter((ent) => {
          const sameArea = ent.area_id === area.area_id;
          if (sameArea) return true;
          const devices = area?.device;
          if (devices) {
            if (devices.indexOf(ent.device_id) > -1) {
              return true;
            }
          }
          return false;
        })
        .map((ent) => ent.entity_id)
        .filter((entId) => {
          const entityType = entId.split(".")[0];
          return entityType === type;
        })
    : [];
  // const myEntities = entities.filter((ent) => entityIds.indexOf(ent.id) > -1);
  // console.log("Area", area_id, area, areas);
  const roomEntities = entityIds
    ?.map((eId: string | number) => entities[eId])
    .filter((ent: any) => !!ent);

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
            <Link
              underline="hover"
              color="text.primary"
              onClick={() => {
                navigate(`/${area.area_id}`);
              }}
            >
              <Typography variant="h3" component="div">
                {area?.name}
              </Typography>
            </Link>
            <Link underline="none" color="text.primary" aria-current="page">
              <Typography variant="h3" component="div">
                {typeName}
              </Typography>
            </Link>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ height: "98px" }} />
      <Box sx={{ flexGrow: 1, m: 3, mt: 4 }}>
        <Grid container spacing={3}>
          {roomEntities && roomEntities.length > 0
            ? roomEntities
                .filter(
                  (entity: { state: string }) => entity.state !== "unavailable"
                )
                .map((entity: { entity_id: Key | null | undefined }) => {
                  return <Entity entity={entity} key={entity.entity_id} />;
                })
            : null}
        </Grid>
      </Box>
    </Stack>
  );
}
