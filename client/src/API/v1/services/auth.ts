import { Tokens, User } from "../../models";
import { $apiV1 } from "../base";

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "token";
export const USER_DATA = "user";

interface ILogin extends Tokens {
  user: User;
}

export class Auth {
  signIn = async (user: FormData) => {
    const response = await $apiV1.post<ILogin>("login/", user);
    const userData = JSON.stringify(response.data.user);

    localStorage.setItem(USER_DATA, userData);
    localStorage.setItem(ACCESS_TOKEN, response.data.access);
    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
  };

  signUp = async (user: FormData) => {
    return $apiV1.post("register/", user);
  };

  logout = () => {
    // TODO: delete user-data
    localStorage.removeItem(USER_DATA);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  };
}
