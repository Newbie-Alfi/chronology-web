import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { usePresentation } from "../../contexts/PresentationContext";
import { useMap } from "../../hooks/useStores";
import ChronologyTimeline from "./ChronologyTimeline";
import "./style.scss";

interface TopInterfaceProps {}

export const TopInterface: FC<TopInterfaceProps> = observer(() => {
  const { presentationStore } = usePresentation();
  const { map } = useMap();

  const onItemSelected = (value: any) => {
    presentationStore.currentDate = value.date;
  };

  useEffect(() => {
    const layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style.
    let firstSymbolId;
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
