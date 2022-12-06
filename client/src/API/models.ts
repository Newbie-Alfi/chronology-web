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
  img: string;
  // TODO: number??? is foreign key???
  user: number;
}

export interface IRegion {
  name: string;
  geom: Geometry;
  isOptimazed: boolean;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}
