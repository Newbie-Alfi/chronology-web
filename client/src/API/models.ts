import { Geometry } from "geojson";

export interface ITimeline {
  id: number;
  name: string;
  description: string;
  date: Date;
  end_date: Date;
}

export interface IEvent extends ITimeline {
  region_id: number;
  chronology_id: number;
}

export interface IChronology {
  id: number;
  name: string;
  creation_date: Date;
  img: string | null;
  user: number;
}

export interface IRegion {
  id: number;
  name: string;
  geom: Geometry;
  // isOptimazed: boolean;
}

export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}
