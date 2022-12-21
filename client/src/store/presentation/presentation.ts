import { Geometry, GeoJSON, FeatureCollection } from "geojson";
import { makeAutoObservable, runInAction, reaction } from "mobx";
import { IEvent, ITimeline } from "../../API/models";
import { v1 } from "../../API/v1";

export class PresentationStore {
  chronologyId: number;
  timeline: ITimeline[];
  currentDate: Date;
  selectedEvent?: IEvent = undefined;
  regions?: FeatureCollection = undefined;

  constructor(chronologyId: number, currentDate: Date, timeline: ITimeline[]) {
    this.chronologyId = chronologyId;
    this.currentDate = currentDate;
    this.timeline = timeline;

    reaction(
      () => this.currentDate,
      () => {
        this.getCurrentRegions();
      }
    );

    makeAutoObservable(this);
  }

  getCurrentRegions = async () => {
    const regions = (
      await v1.region.getCurrentMapState(this.chronologyId, {
        params: {
          current_date: this.currentDate,
        },
      })
    ).data;

    runInAction(() => {
      this.regions = regions;
    });
  };
}
