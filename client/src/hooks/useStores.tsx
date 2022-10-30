import { Map } from "mapbox-gl";
import React, { useContext } from "react";
import { RootStore } from "../store";

const rootStore = new RootStore();
export const RootStoreContext = React.createContext<RootStore>(rootStore);

interface MapContext {
  map?: Map;
  setMap(map: Map): void;
}

export const MapStoreContext = React.createContext<MapContext | undefined>(
  undefined
);

export const useStores = () => {
  const map = useContext(MapStoreContext);
  const stores = useContext(RootStoreContext);

  if (!map) throw new Error("Map isn't initializated");

  return { ...stores, map };
};
