import { Map as MBMap } from "mapbox-gl";
import { useState } from "react";
import { RootStoreContext, MapStoreContext } from "./hooks/useStores";
import { Router } from "./pages";
import { RootStore } from "./store";
import CssBaseline from "@mui/material/CssBaseline";

export const App = () => {
  // TODO: сделать красивей, точно ли должен существовать setMap?
  const [map, setMap] = useState<MBMap>();
  const rootStore = new RootStore();

  return (
    // TODO: Вроде лучше объект карты поместить во внутрь корневого контекста
    <MapStoreContext.Provider value={{ map, setMap }}>
      <RootStoreContext.Provider value={rootStore}>
        <CssBaseline />
        <Router />
      </RootStoreContext.Provider>
    </MapStoreContext.Provider>
  );
};
