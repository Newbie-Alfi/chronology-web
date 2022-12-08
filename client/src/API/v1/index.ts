import { Auth } from "./services/auth";
import { ChronologyAPI } from "./services/chronology";
import { EventAPI } from "./services/event";
import { RegionAPI } from "./services/regions";

class APIV1 {
  auth = new Auth();
  chronology = new ChronologyAPI();
  event = new EventAPI();
  region = new RegionAPI();
}

export const v1 = new APIV1();
