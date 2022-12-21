import { IChronology } from "../../models";
import { IPagination } from "../../types";
import { $apiV1 } from "../base";
import { USER_DATA } from "./auth";

export class ChronologyAPI {
  getMyChorono = async () => {
    const userData = localStorage.getItem(USER_DATA);

    let userId;
    if (userData) {
      userId = JSON.parse(userData)["id"];
    }

    return $apiV1.get<IPagination<IChronology[]>>("chronology", {
      params: {
        user_id: userId,
      },
    });
  };

  getPublicChronologies = async (ChronoName: string) => {
    return $apiV1.get<IPagination<IChronology[]>>(
      "chronology/get_public_chronologies",
      {
        params: {
          search_string: ChronoName,
        },
      }
    );
  };
}
