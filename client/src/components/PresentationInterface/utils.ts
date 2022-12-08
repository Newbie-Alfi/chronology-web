import moment from "moment";
import { TimelineItemModel } from "react-chrono/dist/models/TimelineItemModel";
import { ITimeline } from "../../API/models";

export const toChronoTimelineModel = (
  timeline: ITimeline[]
): TimelineItemModel[] => {
  return timeline.map(({ id, name, date }) => ({
    id: String(id),
    title: name,
    date: moment(date).format("yyyy-MM-DD"),
  }));
};
