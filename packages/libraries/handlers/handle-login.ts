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

const options = {
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

  setCookie(TOKEN.HEADER, header, options);
  setCookie(TOKEN.PAYLOAD, payload, options);
  setCookie(TOKEN.SIGNATURE, signature, options);

  setCookie(APP.EXPANDED_NAVBAR, "true", options);

  if (user_type) {
    setCookie(APP.USER_TYPE, user_type, {
      ...options,
      sameSite: "lax",
      encode,
    });
  }

  if (uid) {
    setCookie(APP.USER_ID, string(uid), {
      ...options,
      sameSite: "lax",
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
