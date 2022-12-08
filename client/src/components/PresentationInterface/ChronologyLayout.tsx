import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useMap } from "../../hooks/useStores";
import { useParams } from "react-router-dom";
import { PresentationContext } from "../../contexts/PresentationContext";
import { TimelineStore } from "../../store/timeline";
import { PresentationStore } from "../../store/presentation/presentation";
import { TopInterface } from "./TopInterface";
import { Loader } from "../common/Loader/Loader";

export const PresentationInterface = observer(() => {
  // Эта страница доступна только если есть chronologyId в url
  const { chronologyId } = useParams() as { chronologyId: string };
  const { map } = useMap();
  const { timeline } = useMemo(
    () => new TimelineStore(chronologyId),
    [chronologyId]
  );

  const isLoading: boolean = timeline?.state === "pending" || map.loaded();

  return (
    <>
      {isLoading && <Loader />}
      {timeline?.state === "fulfilled" && (
        <PresentationContext.Provider
          value={{
            presentationStore: new PresentationStore(
              Number(chronologyId),
              timeline.value.data.results[0].date,
              timeline.value.data.results
            ),
          }}
        >
          <TopInterface></TopInterface>
        </PresentationContext.Provider>
      )}
    </>
  );
});
