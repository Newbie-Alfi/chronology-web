import { makeAutoObservable } from "mobx";
import { Map } from "mapbox-gl";

export class MapStore {
  map: Map;
  constructor(map: Map) {
    this.map = map;

    makeAutoObservable(this);
  }
}
