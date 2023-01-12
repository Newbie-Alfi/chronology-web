import { makeAutoObservable } from "mobx";
import { User } from "../API/models";
import { USER_DATA } from "../API/v1/services/auth";

const getUserData = () => {
  const data = localStorage.getItem(USER_DATA);

  return data ? (JSON.parse(data) as User) : undefined;
};

class AuthStore {
  private userData: User | undefined = getUserData();

  constructor() {
    makeAutoObservable(this);
  }
}

export const auth = new AuthStore();
