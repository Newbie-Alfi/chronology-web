import { RootStoreContext } from "./hooks/useStores";
import { Router } from "./routes";
import { RootStore } from "./store";
import CssBaseline from "@mui/material/CssBaseline";

export const App = () => {
  const rootStore = new RootStore();

  return (
    <RootStoreContext.Provider value={rootStore}>
      <CssBaseline />
      <Router />
    </RootStoreContext.Provider>
  );
};
