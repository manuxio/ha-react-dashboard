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
import PsychologyIcon from "@mui/icons-material/Psychology";
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
  const area_id = "system";
  const type = "utilities";
  const area = areas?.filter((a) => a.area_id === area_id)[0];
  // console.log("staticEntities", staticEntities, area?.area_id);
  const entityIds = area
    ? (staticEntities || [])
        .filter((ent) => ent.area_id === area.area_id)
        .map((ent) => ent.entity_id)
        .filter((entId) => {
          if (entId.indexOf("light") === 0) {
            return true;
          }
          if (entId.indexOf("scene") === 0) {
            return true;
          }
          console.log("Discarding", entId);
        })
    : [];
  entityIds.push(
    ...Object.keys(entities)
      .filter((entId) => entId.indexOf("script") === 0)
      .map((entId) => {
        return entId;
      })
  );
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
      <AppBar position="fixed" color="indigo" enableColorOnDark>
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
              <PsychologyIcon fontSize="inherit" style={{ fontSize: "72px" }} />
            </Typography>
          </IconButton>
          <Typography variant="h3" component="div">
            Scorciatoie e automazioni
          </Typography>
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
                .sort((a, b) => (a.entity_id > b.entity_id ? 1 : -1))
                .map((entity: { entity_id: Key | null | undefined }) => {
                  return <Entity entity={entity} key={entity.entity_id} />;
                })
            : null}
        </Grid>
      </Box>
    </Stack>
  );
}
