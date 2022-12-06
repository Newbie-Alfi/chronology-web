import { IRegion } from "../models";
import { $apiV1 } from "./base";

export class RegionAPI {
  static get = async (options?: any) => {
    return $apiV1.get<IRegion[]>("geo", options);
  };
}
