import { useState, useMemo, useEffect, useReducer } from "react";
import { observer } from "mobx-react-lite";
import { TimelineItemModel } from "react-chrono/dist/models/TimelineItemModel";
import { usePresentation } from "../../contexts/PresentationContext";
import ChronologyTimeline from "./ChronologyTimeline";
import { useMap } from "../../hooks/useStores";

export const PresentationInterface = observer(() => {
  const [currentDate, setCurrentDate] = useState<TimelineItemModel>();
  const { timelineStore } = usePresentation();
  const { map } = useMap();

  const onSelectDate = (data: TimelineItemModel) => {
    setCurrentDate(data);
  };

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
