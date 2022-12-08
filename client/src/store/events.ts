import { makeAutoObservable, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { v1 } from "../API/v1";
export class EventStore {
  events?: IPromiseBasedObservable<Awaited<ReturnType<typeof v1.event.get>>> =
    undefined;

  constructor(private chronologyId: string) {
    this.get();

    makeAutoObservable(this);
  }

  get = async () => {
    runInAction(() => {
      this.events = fromPromise(v1.event.get(this.chronologyId));
    });
  };
}
