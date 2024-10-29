import { ProfileData } from "@/builders/types/profile";
("use server");

import { APP, encode } from "../libraries";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { toBinary } from "@/middlewares";

export async function getUserData() {
  const encodedUserData = getCookie(APP.USER_DATA, { cookies });

  if (encodedUserData) {
    return toBinary(encode(encodedUserData)) as ProfileData;
  }

  return null;
}
