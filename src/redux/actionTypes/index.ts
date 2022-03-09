import { Comment } from "../reducers/index";

export enum ActionType {
  GET_POST_COMMENTS_PENDING = "GET_POST_COMMENTS_PENDING",
  GET_POST_COMMENTS_SUCCESS = "GET_POST_COMMENTS_SUCCESS",
  GET_POST_COMMENTS_FAIL = "GET_POST_COMMENTS_FAIL",
  SMARTHOME_CONNECTING = "SMARTHOME_CONNECTING",
  SMARTHOME_CONNECT = "SMARTHOME_CONNECT",
  SMARTHOME_CONNECTED = "SMARTHOME_CONNECTED",
  SMARTHOME_DISCONNECT = "SMARTHOME_DISCONNECT",
  SMARTHOME_SET_AREAS = "SMARTHOME_SET_AREAS",
  SMARTHOME_SET_CONFIG = "SMARTHOME_SET_CONFIG",
  SMARTHOME_SET_ENTITIES = "SMARTHOME_SET_ENTITIES",
  SMARTHOME_SET_STATIC_ENTITIES = "SMARTHOME_SET_STATIC_ENTITIES",
}

interface actionPending {
  type: ActionType.GET_POST_COMMENTS_PENDING;
}

interface actionSuccess {
  type: ActionType.GET_POST_COMMENTS_SUCCESS;
  payload: Comment[];
}

interface actionFail {
  type: ActionType.GET_POST_COMMENTS_FAIL;
  payload: string;
}

interface smartHomeConnect {
  type: ActionType.SMARTHOME_CONNECT;
}

interface smartHomeDisconnect {
  type: ActionType.SMARTHOME_DISCONNECT;
}

interface smartHomeConnecting {
  type: ActionType.SMARTHOME_CONNECTING;
}

interface smartHomeSetAreas {
  type: ActionType.SMARTHOME_SET_AREAS;
  data: any[];
}

interface smartHomeSetConfig {
  type: ActionType.SMARTHOME_SET_CONFIG;
  data: any;
}

interface smartHomeSetEntities {
  type: ActionType.SMARTHOME_SET_ENTITIES;
  data: any;
}

interface smartHomeSetStaticEntities {
  type: ActionType.SMARTHOME_SET_STATIC_ENTITIES;
  data: any;
}

interface smartHomeConnected {
  type: ActionType.SMARTHOME_CONNECTED;
}

export type Action =
  | actionPending
  | actionSuccess
  | actionFail
  | smartHomeConnect
  | smartHomeDisconnect
  | smartHomeSetAreas
  | smartHomeSetConfig
  | smartHomeSetEntities
  | smartHomeSetStaticEntities
  | smartHomeConnected;
