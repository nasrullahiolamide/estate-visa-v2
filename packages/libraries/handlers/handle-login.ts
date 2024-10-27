import { getCookies, setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

import { encode } from "../encryption";
import { APP, TOKEN, USER_TYPE } from "../enum";
import { UserType } from "@/builders/types/login";

interface HandleLogin {
  access_token: string;
  uid: string;
  user_type: UserType;
  full_name: string;
  email: string;
  username: string;
}

const options = {
  secure: true,
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "strict",
} satisfies OptionsType;

const account: Record<PropertyKey, string> = {
  [USER_TYPE.ADMIN]: "Estate Owner",
  [USER_TYPE.SUPER_ADMIN]: "Super Admin",
  [USER_TYPE.OCCUPANT]: "Occupant",
  [USER_TYPE.SUB_OCCUPANT]: "Sub Occupant",
  [USER_TYPE.PROPERTY_OWNER]: "Property Owner",
  [USER_TYPE.GATEMAN]: "Gateman",
};

export function handleLogin({ access_token, ...user }: HandleLogin) {
  const { uid, full_name, user_type, username } = { ...user };

  const [header, payload, signature] = access_token.split(".") as [
    header: string,
    payload: string,
    signature: string
  ];

  setCookie(TOKEN.HEADER, header, options);
  setCookie(TOKEN.PAYLOAD, payload, options);
  setCookie(TOKEN.SIGNATURE, signature, options);

  setCookie(APP.EXPANDED_NAVBAR, "true", options);

  if (user_type) {
    setCookie(APP.USER_TYPE, account[user_type], {
      ...options,
      sameSite: "lax",
      encode,
    });
  }

  if (uid) {
    setCookie(APP.USER_ID, uid, {
      ...options,
      sameSite: "lax",
    });
  }

  if (username) {
    setCookie(APP.USER_NAME, uid, {
      ...options,
      sameSite: "lax",
      encode,
    });
  }

  if (full_name) {
    setCookie(APP.FULL_NAME, full_name, {
      ...options,
      sameSite: "lax",
      encode,
    });
  }

  // if (email) {
  //   setCookie(APP.EMAIL, email, {
  //     ...options,
  //     sameSite: "lax",
  //     encode,
  //   });
  // }
}
