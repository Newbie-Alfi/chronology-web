import React, { CSSProperties, FC, useState, useEffect, useId } from "react";
import { Map as MBMap, MapboxOptions } from "mapbox-gl";
import { MapStoreContext } from "../../hooks/useStores";
import { Loader } from "./Loader/Loader";

interface IMapComponent extends Omit<MapboxOptions, "container"> {
  CSSStyle?: CSSProperties;
  children?: React.ReactNode;
}

export const Map: FC<IMapComponent> = ({
  CSSStyle,
  children,
  style = "mapbox://styles/mapbox/streets-v11",
  ...props
}) => {
  const mapRef = React.createRef<HTMLDivElement>();
  const [map, setMap] = useState<MBMap>();

  useEffect(() => {
    if (!mapRef.current) return;

    const initialMap = new MBMap({
      container: mapRef.current,
      dragRotate: false,
      style,
      ...props,
    });

    setMap(initialMap);

    return () => map?.remove();
  }, []);

  return (
    <div style={{ ...CSSStyle, zIndex: 0 }} ref={mapRef}>
      {!!map ? (
        <MapStoreContext.Provider value={{ map }}>
          {children}
        </MapStoreContext.Provider>
      ) : (
        <Loader />
      )}
    </div>
  );
};
