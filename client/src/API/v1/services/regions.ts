import { AxiosRequestConfig } from "axios";
import { FeatureCollection } from "geojson";
import { IRegion } from "../../models";
import { $apiV1 } from "../base";

export class RegionAPI {
  getCurrentMapState = (chronologyId: number, options?: AxiosRequestConfig) => {
    return $apiV1.get<FeatureCollection>(
      `events/${chronologyId}/get_regions/`,
      options
    );
  };

  getCommonRegions = async (options?: AxiosRequestConfig) => {
    return $apiV1.get<IRegion[]>("region", options);
  };
}

// area_sqkm
