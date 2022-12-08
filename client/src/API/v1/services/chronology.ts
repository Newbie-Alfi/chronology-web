import { IChronology } from "../../models";
import { IPagination } from "../../types";
import { $apiV1 } from "../base";

export class ChronologyAPI {
  get = async () => {
    return $apiV1.get<IPagination<IChronology[]>>("chronology");
  };
}
