import { Tokens } from "../models";
import { $apiV1 } from "./base";

export class Auth {
  static signIn = async (user: FormData) => {
    const response = await $apiV1.post<Tokens>("token/", user);

    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("token", response.data.refresh);
  };

  static signUp = async (user: FormData) => {
    return $apiV1.post("token/", user);
  };
}
