import { useParams } from "react-router-dom";
import { PresentationInterface } from "../../components/PresentationInterface/ChronologyLayout";
import { PresentationContext } from "../../contexts/PresentationContext";
import { TimelineStore } from "../../store/timeline";
import { MapLayout } from "../layout/MapLayout";

export default () => {
  const { chronologyId } = useParams();
  // Эта страница доступна только если есть chronologyId в url
  const timeline = new TimelineStore(chronologyId as string);

  return (
    <MapLayout>
      <PresentationContext.Provider value={{ timelineStore: timeline }}>
        <PresentationInterface />
      </PresentationContext.Provider>
    </MapLayout>
  );
};
