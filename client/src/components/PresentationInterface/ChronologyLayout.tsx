import { useState, useMemo, useEffect, useReducer } from "react";
import { observer } from "mobx-react-lite";
import { TimelineItemModel } from "react-chrono/dist/models/TimelineItemModel";
import { usePresentation } from "../../contexts/PresentationContext";
import ChronologyTimeline from "./ChronologyTimeline";
import { useMap } from "../../hooks/useStores";
import { useParams } from "react-router-dom";
import { PresentationContext } from "../../contexts/PresentationContext";
import { TimelineStore } from "../../store/timeline";
import { EventStore } from "../../store/events";
import { PresentationStore } from "../../store/presentation/presentation";
import { TopInterface } from "./TopInterface";

export const PresentationInterface = observer(() => {
  const { chronologyId } = useParams() as { chronologyId: string };
  // Эта страница доступна только если есть chronologyId в url
  const { timeline } = useMemo(
    () => new TimelineStore(chronologyId),
    [chronologyId]
  );
  const { events } = useMemo(
    () => new EventStore(chronologyId),
    [chronologyId]
  );

  const [currentDate, setCurrentDate] = useState<TimelineItemModel>();
  // const { timelineStore } = usePresentation();
  const { map, mapIsLoaded } = useMap();

  const onSelectDate = (data: TimelineItemModel) => {
    setCurrentDate(data);
  };

  const isLoading: boolean =
    timeline?.state === "pending" || mapIsLoaded || events?.state === "pending";

  return (
    <>
      {isLoading && "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}
      {timeline?.state === "fulfilled" && events?.state === "fulfilled" && (
        <PresentationContext.Provider
          value={{
            presentationStore: new PresentationStore(
              Number(chronologyId),
              timeline.value.data.results[0].date,
              timeline.value.data.results,
              events.value.data.results
            ),
          }}
        >
          <TopInterface></TopInterface>
        </PresentationContext.Provider>
      )}
    </>
  );
});
