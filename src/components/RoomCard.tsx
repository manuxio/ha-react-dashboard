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
import { useSelector } from "react-redux";
import ButtonBase from "@mui/material/ButtonBase";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate, useMatch, useLocation } from "react-router-dom";

// import MenuIcon from "@mui/icons-material/Menu";
export default function RoomCard({ area }) {
  // console.log("Area", area);
  const navigate = useNavigate();
  return (
    <Grid
      item
      xs={3}
      key={area.id}
      onClick={() => {
        navigate(`/${area.area_id}`);
      }}
    >
      <Card>
        <CardMedia
          component="img"
          image={`http://automation.local:8123${area.picture}`}
          alt={area.name}
        />
        <CardContent>
          <Typography noWrap variant="h4" component="div">
            {area.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
