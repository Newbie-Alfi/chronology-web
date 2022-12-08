import { Geometry } from "geojson";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { usePresentation } from "../../contexts/PresentationContext";
import { useMap } from "../../hooks/useStores";
import ChronologyTimeline from "./ChronologyTimeline";
import "./style.scss";

interface TopInterfaceProps {}

export const TopInterface: FC<TopInterfaceProps> = observer(() => {
  const { presentationStore } = usePresentation();
  const [region, setRegion] = useState<Geometry>();
  const { map } = useMap();

  const onItemSelected = (value: any) => {
    presentationStore.currentDate = value.date;
  };

  const lol = async () => {
    const region = await presentationStore.regionsOnMap();

    setRegion(region);
  };

  useEffect(() => {
    lol();
  }, [presentationStore.currentDate]);

  if (map?.loaded) {
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
      console.log(region);

      map.addSource("urban-areas", {
        type: "geojson",
        data: region,
      });
    } else {
      src.setData(region);
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
  }

  return (
    <div className="top-contol-panel">
      <ChronologyTimeline
        timeline={presentationStore.timeline}
        onItemSelected={onItemSelected}
      ></ChronologyTimeline>
    </div>
  );
});
