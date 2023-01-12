import { newContext } from "../hooks/createContextHook";
import { PresentationStore } from "../store/presentation/presentation";

interface IPresentationContext {
  presentationStore: PresentationStore;
}

export const [PresentationContext, usePresentation] =
  newContext<IPresentationContext>();
