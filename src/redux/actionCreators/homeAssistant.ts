import Promise, { Thenable } from "bluebird";
import { Dispatch } from "redux";
import { ActionType, Action } from "../actionTypes";
import {
  getAuth,
  createConnection,
  createLongLivedTokenAuth,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED,
  entitiesColl,
  subscribeConfig,
  callService,
  getCollection,
  configColl,
} from "home-assistant-js-websocket";
import Bluebird from "bluebird";

async function connect() {
  const auth = createLongLivedTokenAuth(
    "http://automation.local:8123",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5NTE2YTIzYWM1MWY0YzcxYWRlMzlmNWFjODFjNjllMiIsImlhdCI6MTY0NjY1NzE1MiwiZXhwIjoxOTYyMDE3MTUyfQ.oc86cjNSOjM0qgMHdMPPW_NNW2brRBkwS5PY8pB4FDg"
  );

  console.log('Auth', auth);

  const connection = createConnection({ auth });
  return connection;
  // subscribeEntities(connection, (ent) => console.log(ent));
}

let smartHomeConnection: any;
let reconnect: any;

const reloadEverything =
  (dispatch, reconnection = false) =>
  (connection) => {
    connection
      .sendMessagePromise({
        type: "config/entity_registry/list",
      })
      .then((result: any) => {
        console.log("Static entities loaded");
        dispatch({
          type: ActionType.SMARTHOME_SET_STATIC_ENTITIES,
          data: result,
        });
      })
      .then(() => {
        if (!reconnection) {
          subscribeConfig(connection, async (config) => {
            console.log("Configuration changed");
            dispatch({
              type: ActionType.SMARTHOME_SET_CONFIG,
              data: config,
            });
            const fetchAreas = (connection: any) =>
              connection.sendMessagePromise({
                type: "config/area_registry/list",
              });
            const areasColl = getCollection(connection, "areas", fetchAreas);
            await areasColl.refresh();
            console.log("Areas loaded");
            const fullAreas = await Promise.map(
              areasColl.state,
              async (area) => {
                const result = await connection.sendMessagePromise({
                  type: "search/related",
                  item_type: "area",
                  item_id: area.area_id,
                });
                return {
                  ...area,
                  scene: [],
                  device: [],
                  entity: [],
                  config_entry: [],
                  automation: [],
                  ...result,
                };
              }
            );
            dispatch({
              type: ActionType.SMARTHOME_SET_AREAS,
              data: fullAreas,
            });
          });
        }
      })
      .then(() => {
        if (!reconnection) {
          subscribeEntities(connection, (entities) => {
            // console.log('Config loaded');
            dispatch({
              type: ActionType.SMARTHOME_SET_ENTITIES,
              data: entities,
            });
          });
        }
      })
      .then(async () => {
        dispatch({
          type: ActionType.SMARTHOME_CONNECTED,
        });
      });
  };

export const smartHomeConnect = (postId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SMARTHOME_CONNECT,
    });
    // smartHomeConnection = connect();
    connect().then((result) => {
      smartHomeConnection = result;
      console.log("Connection created", smartHomeConnection);
      reloadEverything(dispatch)(smartHomeConnection);

      smartHomeConnection.addEventListener("ready", () => {
        console.log("Reconnected?");
        reloadEverything(dispatch, true)(smartHomeConnection);
      });
    });

    // const coll = entitiesColl(smartHomeConnection);
    // console.log('Coll', coll);
    // coll.subscribe((data) => console.log("New data!", data));
    // coll.refresh();

    // subscribeEntities(smartHomeConnection, (entities) => console.log("New entities!", entities));
    /*
    subscribeConfig(smartHomeConnection, (config) => {
      dispatch({
        type: ActionType.SMARTHOME_SET_CONFIG,
        data: config,
      });
    });
    */
    // callService(smartHomeConnection, "light", "toggle", {
    //     entity_id: "light.luce_demo",
    // });
    // {"type":"config/area_registry/list","id":63}
    // const fetchAreas = (smartHomeConnection) => smartHomeConnection.sendMessagePromise({ type: "config/area_registry/list" });
    // const areasColl = getCollection(smartHomeConnection, "areas", fetchAreas);
    // await areasColl.refresh();
    // console.log('Areas', areasColl.state);
    // Promise.map(areasColl.state, async (area) => {
    //     const result = await smartHomeConnection.sendMessagePromise({ type: "search/related", item_type: "area", item_id: area.area_id })
    //     console.log(area.name, result);
    // })
    // areasColl.subscribe((areas) => console.log("New areas!", areas));

    /*
    subscribeEntities(smartHomeConnection, (entities) => {
      dispatch({
        type: ActionType.SMARTHOME_SET_ENTITIES,
        data: entities,
      });
    });

    smartHomeConnection.sendMessagePromise({
      type: "config/entity_registry/list",
    }).then((result) => {
      console.log('Entities', result);
    });

    const fetchAreas = (smartHomeConnection: any) =>
      smartHomeConnection.sendMessagePromise({
        type: "config/area_registry/list",
      });
    const areasColl = getCollection(smartHomeConnection, "areas", fetchAreas);
    await areasColl.refresh();
    const fullAreas = await Promise.map(areasColl.state, async (area) => {
      const result = await smartHomeConnection.sendMessagePromise({
        type: "search/related",
        item_type: "area",
        item_id: area.area_id,
      });
      return {
        ...area,
        device: [],
        entity: [],
        config_entry: [],
        automation: [],
        ...result,
      };
    });
    dispatch({
      type: ActionType.SMARTHOME_SET_AREAS,
      data: fullAreas,
    });
    */
  };
};

export const smartHomeCallService = (domain, action, data) => {
  callService(smartHomeConnection, domain, action, data);
};

export const smartHomeDisconnect = (postId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SMARTHOME_DISCONNECT,
    });
    if (smartHomeConnection) {
      smartHomeConnection.suspendReconnectUntil(
        new Promise((resolve) => {
          // When you want to try to reconnect again, resolve the promise.
          reconnect = resolve;
        })
      );
      smartHomeConnection.suspend();
    }
  };
};
