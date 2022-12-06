import { IEvent, ITimeline } from "../models";
import { IPagination } from "../types";
import { $apiV1 } from "./base";
import { _axios } from "./settings";

export class EventsAPI {
  static get = async (chronologyId: number | string, options?: any) => {
    return await $apiV1.get<IPagination<IEvent[]>>(
      `events/${chronologyId}`,
      options
    );
  };

  static timeline = async (
    chronologyId: number | string,
    query = {
      current_date: "2021-12-11",
    }
  ) => {
    return await $apiV1.get<IPagination<ITimeline[]>>(
      `timeline/${chronologyId}`,
      {
        params: query,
      }
    );
  };
}
