import { makeAutoObservable, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { EventsAPI } from "../API/v1/events";

export class TimelineStore {
  timeline?: IPromiseBasedObservable<
    Awaited<ReturnType<typeof EventsAPI.timeline>>
  > = undefined;

  constructor(private chronologyId: string) {
    this.get();

    makeAutoObservable(this);
  }

  get = async () => {
    runInAction(() => {
      this.timeline = fromPromise(EventsAPI.timeline(this.chronologyId));
    });
  };
}
