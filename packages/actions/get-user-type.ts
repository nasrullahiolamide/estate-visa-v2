"use server";

import { APP, USER_TYPE } from "../libraries";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export function getUserType() {
  const encodedUserType = getCookie(APP.USER_TYPE, { cookies });

  // if (encodedUserType) {
  //   return encode(encodedUserType);
  // }

  return USER_TYPE.SUPER_ADMIN;
}
