import { newContext } from "../hooks/createContextHook";
import { TimelineStore } from "../store/timeline";

interface IPresentationContext {
  timelineStore: TimelineStore;
}

export const [PresentationContext, usePresentation] =
  newContext<IPresentationContext>();
