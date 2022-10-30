import React, { useContext, useEffect } from "react";
import mapboxgl, { Map as MBMap } from "mapbox-gl";
import { MapStoreContext } from "../hooks/useStores";

export const Map = () => {
  const mapRef = React.createRef<HTMLDivElement>();
  const mapStore = useContext(MapStoreContext);

  useEffect(() => {
    if (!mapRef.current || !mapStore) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const map = new MBMap({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [40, 54],
      zoom: 4,
    });

    mapStore.setMap(map);

    return () => map.remove();
  }, []);

  return <div style={{ width: "100%", height: "100vh" }} ref={mapRef}></div>;
};
