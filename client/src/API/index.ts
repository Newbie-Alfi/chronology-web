import { Auth } from "./v1/auth";

class Services {
  auth = new Auth();
}

export const services = new Services();
