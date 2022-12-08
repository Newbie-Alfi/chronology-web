import { FC, memo, useMemo } from "react";
import { ITimeline } from "../../API/models";
import { ITimelineProps, Timeline } from "../common/Timeline/Timeline";
import { toChronoTimelineModel } from "./utils";

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
  }, [timeline]);

  return <Timeline {...props} onItemSelected={onItemSelected} items={items} />;
};

export default memo(ChronologyTimeline);
