import { Map } from "mapbox-gl";
import React, { useContext } from "react";
import { RootStore } from "../store";

const rootStore = new RootStore();
export const RootStoreContext = React.createContext<RootStore>(rootStore);

interface MapContext {
  map?: Map;
  mapIsLoaded: boolean;
  // setMap(map: Map): void;
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
