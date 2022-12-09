import { FC } from "react";
import { Map } from "../../components/common/Map";
import { useMapViewInURL } from "../utils/useMapViewInURL";

interface MapLayoutProps {
  children: React.ReactNode;
}

const MapLayoutWrapper: FC<MapLayoutProps> = ({ children }) => {
  useMapViewInURL();

  return <>{children}</>;
};

export const MapLayout: FC<MapLayoutProps> = ({ children }) => {
  return (
    <Map style={{ width: "100%", height: "100vh", zIndex: 0 }}>
      <MapLayoutWrapper>{children}</MapLayoutWrapper>
    </Map>
  );
};
