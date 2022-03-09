import { Action, ActionType } from "../actionTypes/index";

const initialState = {
  connected: false,
  connecting: false,
  config: null,
  areas: [],
  entities: [],
  staticentities: []
};

const smartHomeReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case ActionType.SMARTHOME_CONNECT:
      console.log("Here");
      return {
        ...state,
        connecting: true,
        connected: false,
      };
    case ActionType.SMARTHOME_CONNECTED:
      return {
        ...state,
        connecting: false,
        connected: true,
      };
    case ActionType.SMARTHOME_SET_AREAS:
      return {
        ...state,
        areas: action.data,
      };
      break;
    case ActionType.SMARTHOME_SET_ENTITIES:
      return {
        ...state,
        entities: action.data,
      };
      break;
    case ActionType.SMARTHOME_SET_STATIC_ENTITIES:
      return {
        ...state,
        staticentities: action.data,
      };
      break;
    case ActionType.SMARTHOME_DISCONNECT:
      console.log("Disconnect Here");
      return {
        ...state,
        connecting: false,
        connected: false,
      };
    case ActionType.SMARTHOME_SET_CONFIG:
      return {
        ...state,
        config: action.data,
      };
    default:
      return state;
  }
};

export default smartHomeReducer;
