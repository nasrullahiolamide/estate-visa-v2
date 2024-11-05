"use server";

import { APP, encode, makePath, PAGES, TOKEN, USER_TYPE } from "../libraries";
import { getCookie, getCookies } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function getAuthorizedUser(request?: NextRequest) {
  const allCookies = Object.keys(getCookies({ cookies }));

  const requiredCookies = [
    TOKEN.HEADER,
    TOKEN.PAYLOAD,
    TOKEN.SIGNATURE,
    APP.USER_TYPE,
    APP.USER_ID,
  ];

  const isAuthorized = requiredCookies.every((cookie) =>
    allCookies.includes(cookie)
  );

  const encodedUserType = getCookie(APP.USER_TYPE, { cookies });
  const userType = encodedUserType ? encode(encodedUserType) : USER_TYPE.GUEST;

  const nextRoute = isAuthorized
    ? PAGES.DASHBOARD
    : makePath(
        PAGES.LOGIN,
        // `?session=expired&redirect=${request?.url ?? PAGES.DASHBOARD}`
        `?session=expired`
      );

  return { isAuthorized, userType, nextRoute };
}