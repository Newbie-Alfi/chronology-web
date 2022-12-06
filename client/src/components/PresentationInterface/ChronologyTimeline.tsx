import { FC, memo, useMemo } from "react";
import { ITimeline } from "../../API/models";
import { ITimelineProps, Timeline } from "../common/Timeline/Timeline";
import { toChronoTimelineModel } from "./utils";
import "./style.scss";
interface IChronologyTimelineProps extends Omit<ITimelineProps, "items"> {
  timeline: ITimeline[];
}

const ChronologyTimeline: FC<IChronologyTimelineProps> = ({
  timeline,
  onItemSelected,
  ...props
}) => {
  const items = useMemo(() => {
    return toChronoTimelineModel(timeline);
  }, []);

  return (
    <div className="top-contol-panel">
      <Timeline {...props} onItemSelected={onItemSelected} items={items} />
    </div>
  );
};

export default memo(ChronologyTimeline);
