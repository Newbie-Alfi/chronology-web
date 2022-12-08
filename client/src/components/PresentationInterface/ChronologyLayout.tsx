import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { PresentationContext } from "../../contexts/PresentationContext";
import { TimelineStore } from "../../store/timeline";
import { PresentationStore } from "../../store/presentation/presentation";
import { TopInterface } from "./TopInterface";
import { Loader } from "../common/Loader/Loader";

export const PresentationInterface = observer(() => {
  // Эта страница доступна только если есть chronologyId в url
  const { chronologyId } = useParams() as { chronologyId: string };
  const { timeline } = useMemo(
    () => new TimelineStore(chronologyId),
    [chronologyId]
  );

  return (
    <>
      {timeline?.case({
        fulfilled: (v) => (
          <PresentationContext.Provider
            value={{
              presentationStore: new PresentationStore(
                Number(chronologyId),
                v.data.results[0].date,
                v.data.results
              ),
            }}
          >
            <TopInterface></TopInterface>
          </PresentationContext.Provider>
        ),
        pending: () => <Loader />,
      })}
    </>
  );
});
