import { IChronology } from "../models";
import { IPagination } from "../types";
import { $apiV1 } from "./base";
import { _axios } from "./settings";

export class ChronologyAPI {
  static get = async () => {
    return $apiV1.get<IPagination<IChronology[]>>("chronology");
  };
}
