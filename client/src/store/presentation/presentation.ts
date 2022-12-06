import { makeAutoObservable } from "mobx";
import { IEvent } from "../../API/models";

export class PresentationStore {
  selectedEvent?: IEvent = undefined;

  constructor(public currentDate: Date) {
    makeAutoObservable(this);
  }

  get regionsOnMap() {
    return;
  }
}
