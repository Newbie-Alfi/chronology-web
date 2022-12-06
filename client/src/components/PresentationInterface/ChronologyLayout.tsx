import { useState, useMemo, useEffect, useReducer } from "react";
import { observer } from "mobx-react-lite";
import { TimelineItemModel } from "react-chrono/dist/models/TimelineItemModel";
import { usePresentation } from "../../contexts/PresentationContext";
import ChronologyTimeline from "./ChronologyTimeline";
import { useMap } from "../../hooks/useStores";

export const PresentationInterface = observer(() => {
  const [currentDate, setCurrentDate] = useState<TimelineItemModel>();
  const { timelineStore } = usePresentation();
  const [l, setL] = useReducer((x) => x + 1, 0);
  const { map } = useMap();

  const onSelectDate = (data: TimelineItemModel) => {
    setCurrentDate(data);
  };

  // console.log(map?.loaded());

  if (l === 0) {
    if (!map?.loaded) return;
    // map?.on("load", () => {
    const layers = map?.getStyle().layers || [];
    // Find the index of the first symbol layer in the map style.
    let firstSymbolId;
    for (const layer of layers) {
      if (layer.type === "symbol") {
        firstSymbolId = layer.id;
        break;
      }
    }

    map?.addSource("urban-areas", {
      type: "geojson",
      data: "https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson",
    });
    map?.addLayer(
      {
        id: "urban-areas-fill",
        type: "fill",
        source: "urban-areas",
        layout: {},
        paint: {
          "fill-color": "#f08",
          "fill-opacity": 0.4,
        },
        // This is the important part of this example: the addLayer
        // method takes 2 arguments: the layer as an object, and a string
        // representing another layer's name. If the other layer
        // exists in the style already, the new layer will be positioned
        // right before that layer in the stack, making it possible to put
        // 'overlays' anywhere in the layer stack.
        // Insert the layer beneath the first symbol layer.
      },
      firstSymbolId
    );
    setL();
    // });
  }

  return (
    <>
      {timelineStore.timeline?.case({
        fulfilled: (v) => (
          <ChronologyTimeline
            timeline={v.data.results}
            onItemSelected={onSelectDate}
          />
        ),
      })}
    </>
  );
});
