import { makeAutoObservable, runInAction, reaction } from "mobx";
import { IEvent, ITimeline } from "../../API/models";
import { v1 } from "../../API/v1";

export class PresentationStore {
  chronologyId: number;
  timeline: ITimeline[];
  currentDate: Date;
  events: IEvent[];
  selectedEvent?: IEvent = undefined;
  regions?: number[] = undefined;

  constructor(
    chronologyId: number,
    currentDate: Date,
    timeline: ITimeline[],
    events: IEvent[]
  ) {
    this.chronologyId = chronologyId;
    this.currentDate = currentDate;
    this.timeline = timeline;
    this.events = events;

    reaction(
      () => this.currentDate,
      () => {
        this.getEventsByCurrentDate();
      }
    );

    reaction(
      () => this.events,
      () => {
        this.getRegionsByRegionsId();
      }
    );

    makeAutoObservable(this);
  }

  // TODO:
  regionsOnMap = async () => {
    return (
      await v1.region.getCurrentMapState(this.chronologyId, {
        params: {
          current_date: this.currentDate,
        },
      })
    ).data;
  };

  private getEventsByCurrentDate = async () => {
    const response = await v1.event.get(this.chronologyId, {
      params: {
        current_date: this.currentDate,
      },
    });

    runInAction(() => {
      this.events = response.data.results;
    });
  };

  private getRegionsByRegionsId = () => {
    this.regions = this.events
      .map((event) => event.region_id)
      .filter((id) => !!id || id === 0);
  };
}
