import { getCookies, setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

import { encode } from "../encryption";
import { APP, TOKEN, USER_TYPE } from "../enum";

interface HandleLogin {
  access_token: string;
  organization_id?: number;
  full_name?: string;
  user_type?: USER_TYPE;
  username?: string;
}

const options = {
  secure: true,
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "strict",
} satisfies OptionsType;

export function handleLogin({
  full_name,
  access_token,
  user_type = USER_TYPE.STAFF,
  username,
}: HandleLogin) {
  const [header, payload, signature] = access_token.split(".") as [
    header: string,
    payload: string,
    signature: string
  ];

  setCookie(TOKEN.HEADER, header, options);
  setCookie(TOKEN.PAYLOAD, payload, options);
  setCookie(TOKEN.SIGNATURE, signature, options);

  setCookie(APP.EXPANDED_NAVBAR, "true", options);

  console.log(getCookies({ encode }));

  if (username) {
    setCookie(APP.USER_NAME, username, {
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

  if (user_type) {
    setCookie(APP.USER_TYPE, user_type, {
      ...options,
      sameSite: "lax",
      encode,
    });
  }
}
