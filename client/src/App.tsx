import { Map as MBMap } from "mapbox-gl";
import { useState } from "react";
import { Map } from "./components/Map";
import { RootStoreContext, MapStoreContext } from "./hooks/useStores";
import { RootStore } from "./store";

export const App = () => {
  const [map, setMap] = useState<MBMap>();
  const rootStore = new RootStore();

  return (
    <MapStoreContext.Provider value={{ map, setMap }}>
      <RootStoreContext.Provider value={rootStore}>
        <Map />
      </RootStoreContext.Provider>
    </MapStoreContext.Provider>
  );
};
