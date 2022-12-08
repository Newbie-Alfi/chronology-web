import { AxiosRequestConfig } from "axios";
import { Geometry } from "geojson";
import { IRegion } from "../../models";
import { $apiV1 } from "../base";

export class RegionAPI {
  getCurrentMapState = (chronologyId: number, options?: AxiosRequestConfig) => {
    return $apiV1.get<Geometry>(`events/${chronologyId}/get_regions/`, options);
  };

  getCommonRegions = async (options?: AxiosRequestConfig) => {
    return $apiV1.get<IRegion[]>("region", options);
  };
}
