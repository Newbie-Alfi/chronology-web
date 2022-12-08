import React, { CSSProperties, FC, useState, useEffect, useId } from "react";
import { Map as MBMap, MapboxOptions } from "mapbox-gl";
import { MapStoreContext } from "../hooks/useStores";

interface IMapComponent extends Omit<MapboxOptions, "container" | "style"> {
  style: CSSProperties;
  children?: React.ReactNode;
}

export const Map: FC<IMapComponent> = ({ style, children, ...props }) => {
  const mapRef = React.createRef<HTMLDivElement>();
  const [map, setMap] = useState<MBMap>();
  const [mapIsLoaded, setMapLoading] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    setMap(
      new MBMap({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        ...props,
      })
    );

    return () => map?.remove();
  }, []);

  map?.on("load", () => setMapLoading(map?.loaded()));

  // {
  //   map?.on("load", () => {
  //     if (map?.loaded()) {
  //       return (
  //         <div style={{ ...style, zIndex: 0 }} ref={mapRef}>
  //           {children}
  //         </div>
  //       );
  //     }
  //   });
  // }

  return (
    <div style={{ ...style, zIndex: 0 }} ref={mapRef}>
      <MapStoreContext.Provider value={{ map, mapIsLoaded }}>
        {mapIsLoaded && children}
      </MapStoreContext.Provider>
    </div>
  );
};
