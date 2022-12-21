import { useMap } from "../../hooks";

export const AboutMap = () => {
  const { map } = useMap();

  map.on("load", () => {
    const layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style.
    let firstSymbolId;
    for (const layer of layers) {
      if (layer.type === "symbol") {
        firstSymbolId = layer.id;
        break;
      }
    }

    map.addSource("urban-areas", {
      type: "geojson",
      data: "https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson",
    });
    map.addLayer(
      {
        id: "urban-areas-fill",
        type: "fill",
        source: "urban-areas",
        layout: {},
        paint: {
          "fill-color": "#f08",
          "fill-opacity": 0.4,
        },
      },
      firstSymbolId
    );
  });

  return <></>;
};
