import React, { useCallback, useRef, useEffect, useState } from "react";
import "./App.css";
import House from "./components/House";
import Room from "./components/Room";
import Entities from "./components/Entities";
import SmartHome from "./components/SmartHome";
import Utilities from "./components/Utilities";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate, useMatch, useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const handler = useCallback((e) => {
    if (e.key === "s") {
      navigate("/utilities");
    }
    if (e.key === "a") {
      navigate("/");
    }
    console.log(e.key);
  }, []);
  // Add event listener using our hook
  useEventListener("keypress", handler);

  return (
    <React.Fragment>
      <SmartHome>
        <Routes>
          <Route path="/" element={<House />} />
          <Route path="/utilities" element={<Utilities />} />
          <Route path="/:area_id" element={<Room />} />
          <Route path="/:area_id/:type" element={<Entities />} />
        </Routes>
      </SmartHome>
    </React.Fragment>
  );
}

// Hook
function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

export default App;
