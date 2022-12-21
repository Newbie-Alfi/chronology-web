import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMap } from "../../hooks";

export const useMapViewInURL = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { map } = useMap();

  const cacheExtent = () => {
    const bbox = map
      .getBounds()
      ?.toArray()
      .map((point) => point.map((coord) => Math.round(coord * 100) / 100));

    searchParams.set("extent", JSON.stringify(bbox));

    setSearchParams(searchParams);
  };

  map.on("moveend", cacheExtent);
  map.on("zoomend", cacheExtent);

  useEffect(() => {
    const extent_json = searchParams.get("extent");

    if (extent_json) {
      const extent = JSON.parse(extent_json);
      const bounds = new mapboxgl.LngLatBounds().extend(extent);
      map.fitBounds(bounds);
    }
  }, []);
};
