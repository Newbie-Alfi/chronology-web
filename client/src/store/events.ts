import { makeAutoObservable, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { EventsAPI } from "../API/v1/events";

export class EventStore {
  events?: IPromiseBasedObservable<Awaited<ReturnType<typeof EventsAPI.get>>> =
    undefined;

  constructor(private chronologyId: string) {
    this.get();

    makeAutoObservable(this);
  }

  get = async () => {
    runInAction(() => {
      this.events = fromPromise(EventsAPI.get(this.chronologyId));
    });
  };
}
