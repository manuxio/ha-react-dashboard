import React, { useState, useEffect } from "react";
import moment from "moment";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Switch from "@mui/material/Switch";
import CardHeader from "@mui/material/CardHeader";
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
import Entity from "./Entity";
import { useNavigate, useMatch, useLocation } from "react-router-dom";
import lightUrl from "../images/light.webp";
import sensorsUrl from "../images/sensors.png";
import switchUrl from "../images/switch.png";
import CardActionArea from "@mui/material/CardActionArea";
import { useDispatch } from "react-redux";
import { smartHomeCallService } from "../redux/actionCreators/homeAssistant";
import Promise from "bluebird";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// import MenuIcon from "@mui/icons-material/Menu";
export default function Entities({ entity }) {
  let type;
  const { state, entity_id, last_changed } = entity;
  const { friendly_name } = entity.attributes;
  const [turningOn, setTurningOn] = useState<boolean | undefined>();
  const [turningOff, setTurningOff] = useState<boolean | undefined>();
  const dispatch = useDispatch();
  const entityType = entity_id.split(".")[0];
  const isDisabled = state === "unavailable" || typeof state === "undefined";
  let actionType: string = "auto";
  if (entity_id.indexOf("light") === 0) {
    actionType = "switch";
  }
  if (entity_id.indexOf("scene") === 0) {
    actionType = "run";
  }

  if (entity_id.indexOf("script") === 0) {
    actionType = "run";
  }
  let isOn = false;
  if (turningOn === undefined && turningOff === undefined) {
    isOn = state === "on";
  } else {
    if (turningOn) {
      isOn = true;
    }
    if (turningOff) {
      isOn = false;
    }
  }
  // console.log("actionType", actionType, entity);
  let myAction: React.ReactElement;
  switch (entityType) {
    case "scene":
    case "script": {
      myAction = (
        <PlayArrowIcon fontSize="inherit" style={{ fontSize: "36px" }} />
      );
      break;
    }
    case "auto": {
      break;
    }
    default: {
      myAction = <Switch checked={isOn} color="warning" />;
    }
  }
  // console.log(myAction);
  const timers: number[] = [];
  useEffect(() => {
    // returned function will be called on component unmount
    return () => {
      timers.map((t) => {
        clearTimeout(t);
      });
    };
  }, []);
  let buttonColor = "neutral";
  switch (entityType) {
    case "light": {
      buttonColor = "gray";
      break;
    }
    case "switch": {
      buttonColor = "indigo";
      break;
    }
    case "scene": {
      buttonColor = "cyan";
      break;
    }
    case "script": {
      buttonColor = "amber";
      break;
    }
  }
  return (
    <Grid item xs={6} key={entity_id}>
      <Button
        disabled={isDisabled}
        className="large"
        fullWidth
        color={buttonColor}
        size="large"
        variant="contained"
        endIcon={myAction}
        onClick={() => {
          // console.log("Card clicked!");
          switch (entityType) {
            case "switch":
            case "light": {
              if (isOn) {
                setTurningOff(true);
                setTurningOn(undefined);
                smartHomeCallService("homeassistant", "turn_off", {
                  entity_id: entity.entity_id,
                });
                timers.push(
                  setTimeout(() => {
                    setTurningOff(undefined);
                    setTurningOn(undefined);
                  }, 2000)
                );
              } else {
                setTurningOff(undefined);
                setTurningOn(true);
                smartHomeCallService("homeassistant", "turn_on", {
                  entity_id: entity.entity_id,
                });
                timers.push(
                  setTimeout(() => {
                    setTurningOff(undefined);
                    setTurningOn(undefined);
                  }, 2000)
                );
              }
              break;
            }

            case "script":
            case "scene": {
              smartHomeCallService("homeassistant", "turn_on", {
                entity_id: entity.entity_id,
              });
              break;
            }
          }
        }}
      >
        {friendly_name}
      </Button>
    </Grid>
  );
}
