import { TimelineItemModel } from "react-chrono/dist/models/TimelineItemModel";
import { ITimeline } from "../../API/models";

export const toChronoTimelineModel = (
  timeline: ITimeline[]
): TimelineItemModel[] => {
  return timeline.map(({ id, name }) => ({
    id: String(id),
    title: name,
  }));
};

// active?: boolean;
// cardDetailedText?: string | string[];
// cardSubtitle?: string;
// cardTitle?: string;
// id?: string;
// media?: Media;
// position?: string;
// title?: string;
// url?: string;
// visible?: boolean;
