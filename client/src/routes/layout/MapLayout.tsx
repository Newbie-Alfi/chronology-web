import { FC } from "react";
import { Map } from "../../components/Map";

interface MapLayoutProps {
  children: React.ReactNode;
}

export const MapLayout: FC<MapLayoutProps> = ({ children }) => (
  <Map style={{ width: "100%", height: "100vh", zIndex: 0 }}>{children}</Map>
);
