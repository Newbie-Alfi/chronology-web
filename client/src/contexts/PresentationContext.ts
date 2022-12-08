import { newContext } from "../hooks/createContextHook";
import { PresentationStore } from "../store/presentation/presentation";
import { TimelineStore } from "../store/timeline";

interface IPresentationContext {
  presentationStore: PresentationStore;
}

export const [PresentationContext, usePresentation] =
  newContext<IPresentationContext>();
