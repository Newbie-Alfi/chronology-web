import { AxiosRequestConfig } from "axios";
import { IEvent, ITimeline } from "../../models";
import { IPagination } from "../../types";
import { $apiV1 } from "../base";

export class EventAPI {
  get = async (chronologyId: number | string, options?: AxiosRequestConfig) => {
    return await $apiV1.get<IPagination<IEvent[]>>(
      `events/${chronologyId}`,
      options
    );
  };

  timeline = async (chronologyId: number | string) => {
    // TODO: пагинация для timeline не нужна
    return await $apiV1.get<IPagination<ITimeline[]>>(
      `timeline/${chronologyId}`
    );
  };
}
