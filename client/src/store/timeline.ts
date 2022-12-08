import { makeAutoObservable, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { v1 } from "../API/v1";

export class TimelineStore {
  timeline?: IPromiseBasedObservable<
    Awaited<ReturnType<typeof v1.event.timeline>>
  > = undefined;

  constructor(private chronologyId: string) {
    this.get();

    makeAutoObservable(this);
  }

  get = async () => {
    runInAction(() => {
      this.timeline = fromPromise(v1.event.timeline(this.chronologyId));
    });
  };
}
