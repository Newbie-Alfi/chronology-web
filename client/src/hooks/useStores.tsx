import { Map } from "mapbox-gl";
import React, { useContext } from "react";

interface MapContext {
  map: Map;
}

export const MapStoreContext = React.createContext<MapContext | undefined>(
  undefined
);

export const useMap = () => {
  const map = useContext(MapStoreContext);

  if (!map) {
    throw new Error("Map isn't initializated! Define the MapContext");
  }

  return map;
};
