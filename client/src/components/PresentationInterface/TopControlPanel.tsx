import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { usePresentation } from "../../contexts/PresentationContext";
import { useMap } from "../../hooks/useStores";
import ChronologyTimeline from "./EventsSequence";
// import mapboxgl from "mapbox-gl";
import "./style.scss";

interface TopControlPanelProps {}

export const TopControlPanel: FC<TopControlPanelProps> = observer(() => {
  const { presentationStore } = usePresentation();
  const { map } = useMap();

  const onItemSelected = (value: any) => {
    presentationStore.currentDate = value.date;
  };

  useEffect(() => {
    // presentationStore.regions?.features.forEach((region) => {
    console.log(map.getStyle().layers);
    // TODO: переопределить типы geojson с бэкенда никогда не прилитит фича без id
    // @ts-ignore
    // map.clea;
    //   const src = map.getSource(region.id);
    //   if (src === undefined)
    //     map.addLayer({
    //       // @ts-ignore
    //       id: region.id,
    //       type: "fill",
    //       source: {
    //         type: "geojson",
    //         data: region.geometry,
    //       },
    //       paint: {
    //         "fill-color": "#f08",
    //         "fill-opacity": 0.4,
    //       },
    //     });
    // });
    const layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style.
    let firstSymbolId = "s";
    for (const layer of layers) {
      if (layer.type === "symbol") {
        firstSymbolId = layer.id;
        break;
      }
    }

    const src = map.getSource("urban-areas");
    if (src === undefined) {
      map.addSource("urban-areas", {
        type: "geojson",
        data: presentationStore.regions,
      });
    } else {
      src.setData(presentationStore.regions);
    }
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
  }, [presentationStore.regions]);

  return (
    <div className="top-contol-panel">
      <ChronologyTimeline
        timeline={presentationStore.timeline}
        onItemSelected={onItemSelected}
      ></ChronologyTimeline>
    </div>
  );
});
