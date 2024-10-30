import { setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

import { encode } from "../encryption";
import { APP, TOKEN } from "../enum";
import { string } from "mathjs";
import { ProfileData } from "@/builders/types/profile";

interface HandleLogin extends ProfileData {
  access_token: string;
  user_type: string;
}

export const cookieOptions = {
  secure: true,
  maxAge: 60 * 60 * 4,
  sameSite: "strict",
} satisfies OptionsType;

export function handleLogin({ access_token, ...user }: HandleLogin) {
  const { user_type, firstname, lastname, id } = { ...user };
  const full_name = `${firstname} ${lastname ? `${lastname}` : ""}`;
  const uid = id;

  const [header, payload, signature] = access_token.split(".") as [
    header: string,
    payload: string,
    signature: string
  ];

  setCookie(TOKEN.HEADER, header, cookieOptions);
  setCookie(TOKEN.PAYLOAD, payload, cookieOptions);
  setCookie(TOKEN.SIGNATURE, signature, cookieOptions);

  setCookie(APP.EXPANDED_NAVBAR, "true", cookieOptions);

  if (user_type) {
    setCookie(APP.USER_TYPE, user_type, {
      ...cookieOptions,
      sameSite: "lax",
      encode,
    });
  }

  if (uid) {
    setCookie(APP.USER_ID, string(uid), {
      ...cookieOptions,
      sameSite: "lax",
    });
  }

  if (full_name) {
    setCookie(APP.FULL_NAME, full_name, {
      ...cookieOptions,
      sameSite: "lax",
      encode,
    });
  }

  // if (email) {
  //   setCookie(APP.EMAIL, email, {
  //     ...cookieOptions,
  //     sameSite: "lax",
  //     encode,
  //   });
  // }
}
