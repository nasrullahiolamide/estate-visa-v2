"use server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { APP, encode, makePath, PAGES, TOKEN, USER_TYPE } from "../libraries";

export async function getAuthorizedUser(request?: NextRequest) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const requiredCookies = [
    TOKEN.HEADER,
    TOKEN.PAYLOAD,
    TOKEN.SIGNATURE,
    APP.USER_TYPE,
    APP.USER_ID,
  ];

  const cookieNames = allCookies.map((cookie) => cookie.name);
  const isAuthorized = requiredCookies.every((cookie) =>
    cookieNames.includes(cookie)
  );

  const userTypeCookie = allCookies.find(
    (cookie) => cookie.name === APP.USER_TYPE
  );
  const encodedUserType = userTypeCookie?.value;
  const userType = encodedUserType ? encode(encodedUserType) : USER_TYPE.GUEST;

  const callbackUrl = isAuthorized
    ? PAGES.DASHBOARD
    : makePath(PAGES.LOGIN, `?session=expired`);

  return { isAuthorized, userType, callbackUrl };
}
